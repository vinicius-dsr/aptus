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

    // Criar registro no banco (sem salvar arquivos - Vercel serverless)
    const appeal = await prisma.appeal.create({
      data: {
        userId: session.user.id,
        driverName: extractedData.driverName,
        driverCpf: extractedData.driverCpf,
        vehiclePlate: extractedData.vehiclePlate,
        vehicleRenavam: extractedData.vehicleRenavam,
        infractionNumber: extractedData.infractionNumber,
        infractionDate: extractedData.infractionDate ? new Date(extractedData.infractionDate.split('/').reverse().join('-')) : null,
        infractionCode: extractedData.infractionCode,
        agency: extractedData.agency,
        // Documentos não são salvos permanentemente em serverless
        // Para produção, use Vercel Blob Storage ou Supabase Storage
        cnhDocument: null,
        crlvDocument: null,
        infractionDocument: null,
        status: 'PROCESSING',
      },
    })

    // Gerar texto do recurso com Gemini
    console.log('Gerando recurso com Gemini...')
    const appealText = await generateAppealText(extractedData)

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
