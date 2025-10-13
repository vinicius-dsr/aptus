import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { processDocument } from '@/lib/ocr'
import { generateAppealText, improveExtractedData } from '@/lib/openai'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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

    // Criar diretório de uploads se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Salvar arquivos
    const timestamp = Date.now()
    const cnhPath = join(uploadDir, `${timestamp}-cnh-${cnhFile.name}`)
    const crlvPath = join(uploadDir, `${timestamp}-crlv-${crlvFile.name}`)
    const infractionPath = join(uploadDir, `${timestamp}-infraction-${infractionFile.name}`)

    const cnhBuffer = Buffer.from(await cnhFile.arrayBuffer())
    const crlvBuffer = Buffer.from(await crlvFile.arrayBuffer())
    const infractionBuffer = Buffer.from(await infractionFile.arrayBuffer())

    await writeFile(cnhPath, cnhBuffer)
    await writeFile(crlvPath, crlvBuffer)
    await writeFile(infractionPath, infractionBuffer)

    // Processar documentos com OCR (com fallback)
    let combinedData: any = {}
    
    try {
      console.log('Processando CNH...')
      const cnhData = await processDocument(cnhBuffer, 'cnh')
      
      console.log('Processando CRLV...')
      const crlvData = await processDocument(crlvBuffer, 'crlv')
      
      console.log('Processando Auto de Infração...')
      const infractionData = await processDocument(infractionBuffer, 'infraction')

      // Combinar dados extraídos
      combinedData = {
        ...cnhData,
        ...crlvData,
        ...infractionData,
      }
      
      console.log('OCR concluído com sucesso')
    } catch (ocrError) {
      console.warn('OCR falhou, usando dados vazios:', ocrError)
      // Se OCR falhar, continuar com dados vazios
      // O usuário pode preencher manualmente depois
      combinedData = {}
    }

    // Melhorar dados com IA (opcional, mas ajuda)
    let improvedData = combinedData
    try {
      const fullOcrText = JSON.stringify(combinedData)
      improvedData = await improveExtractedData(fullOcrText, combinedData)
    } catch (aiError) {
      console.warn('IA de melhoria falhou, usando dados originais')
    }

    // Criar registro no banco
    const appeal = await prisma.appeal.create({
      data: {
        userId: session.user.id,
        driverName: improvedData.driverName,
        driverCpf: improvedData.driverCpf,
        vehiclePlate: improvedData.vehiclePlate,
        vehicleRenavam: improvedData.vehicleRenavam,
        infractionNumber: improvedData.infractionNumber,
        infractionDate: improvedData.infractionDate ? new Date(improvedData.infractionDate.split('/').reverse().join('-')) : null,
        infractionCode: improvedData.infractionCode,
        agency: improvedData.agency,
        cnhDocument: `/uploads/${timestamp}-cnh-${cnhFile.name}`,
        crlvDocument: `/uploads/${timestamp}-crlv-${crlvFile.name}`,
        infractionDocument: `/uploads/${timestamp}-infraction-${infractionFile.name}`,
        status: 'PROCESSING',
      },
    })

    // Gerar texto do recurso com GPT-4
    console.log('Gerando recurso com IA...')
    const appealText = await generateAppealText(improvedData)

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
      extractedData: improvedData,
    })
  } catch (error: any) {
    console.error('Appeal Creation Error:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar documentos' },
      { status: 500 }
    )
  }
}
