import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { analyzeAllDocuments, generateAppealText } from '@/lib/openai'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const formData = await req.formData()
    const cnhFile = formData.get('cnh') as File
    const crlvFile = formData.get('crlv') as File
    const infractionFile = formData.get('infraction') as File

    if (!cnhFile || !crlvFile || !infractionFile) {
      return NextResponse.json(
        { error: 'Todos os documentos são obrigatórios' },
        { status: 400 }
      )
    }

    // Converter arquivos para Buffer (processar em memória - Vercel serverless)
    const cnhBuffer = Buffer.from(await cnhFile.arrayBuffer())
    const crlvBuffer = Buffer.from(await crlvFile.arrayBuffer())
    const infractionBuffer = Buffer.from(await infractionFile.arrayBuffer())

    // Buscar dados do usuário logado
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        cpf: true,
        phone: true,
        address: true,
        email: true,
      },
    })

    // ✨ Analisar documentos com Gemini Vision (substitui OCR)
    console.log('Analisando documentos com Gemini Vision...')
    let extractedData: any = {}
    
    try {
      extractedData = await analyzeAllDocuments(cnhBuffer, crlvBuffer, infractionBuffer)
      console.log('Gemini Vision concluído com sucesso!')
    } catch (visionError) {
      console.warn('Gemini Vision falhou, usando dados vazios:', visionError)
      extractedData = {}
    }

    // Combinar dados do usuário com dados extraídos
    // PRIORIDADE: Dados do usuário são sempre usados
    const completeData = {
      // Dados extraídos dos documentos primeiro
      ...extractedData,
      // Dados do usuário sobrescrevem (mais confiáveis)
      driverName: user?.name || extractedData.driverName,
      driverCpf: user?.cpf || extractedData.driverCpf,
      driverPhone: user?.phone,
      driverAddress: user?.address,
      driverEmail: user?.email,
    }

    console.log('📊 Dados combinados para o recurso:', {
      driverName: completeData.driverName,
      driverCpf: completeData.driverCpf,
      driverPhone: completeData.driverPhone,
      driverAddress: completeData.driverAddress,
      vehiclePlate: completeData.vehiclePlate,
      infractionNumber: completeData.infractionNumber,
    })

    // Criar registro no banco (sem salvar arquivos - Vercel serverless)
    const appeal = await prisma.appeal.create({
      data: {
        userId: session.user.id,
        driverName: completeData.driverName,
        driverCpf: completeData.driverCpf,
        vehiclePlate: completeData.vehiclePlate,
        vehicleRenavam: completeData.vehicleRenavam,
        infractionNumber: completeData.infractionNumber,
        infractionDate: completeData.infractionDate ? new Date(completeData.infractionDate.split('/').reverse().join('-')) : null,
        infractionCode: completeData.infractionCode,
        agency: completeData.agency,
        // Documentos não são salvos permanentemente em serverless
        // Para produção, use Vercel Blob Storage ou Supabase Storage
        cnhDocument: null,
        crlvDocument: null,
        infractionDocument: null,
        status: 'PROCESSING',
      },
    })

    // Gerar texto do recurso com Gemini (com dados completos do usuário)
    console.log('🤖 Gerando recurso com Gemini usando dados:', completeData)
    const appealText = await generateAppealText(completeData)

    // Atualizar com o texto gerado
    await prisma.appeal.update({
      where: { id: appeal.id },
      data: {
        appealText,
        status: 'COMPLETED',
      },
    })

    return NextResponse.json({
      appealId: appeal.id,
      extractedData: extractedData,
    })
  } catch (error: any) {
    console.error('Appeal Creation Error:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar documentos' },
      { status: 500 }
    )
  }
}
