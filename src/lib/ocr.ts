import Tesseract from 'tesseract.js'

export interface OCRResult {
  text: string
  confidence: number
}

export async function extractTextFromImage(
  imageBuffer: Buffer
): Promise<OCRResult> {
  try {
    console.log('Iniciando OCR...')
    
    // Usar recognize direto sem workers (modo simplificado para Next.js)
    const result = await Tesseract.recognize(
      imageBuffer,
      'por',
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
        // Desabilitar workers para evitar problemas com Next.js
        workerPath: undefined,
        corePath: undefined,
      }
    )

    console.log('OCR concluído!')

    return {
      text: result.data.text,
      confidence: result.data.confidence,
    }
  } catch (error) {
    console.error('OCR Error:', error)
    // Se falhar, retornar dados vazios ao invés de quebrar
    return {
      text: '',
      confidence: 0,
    }
  }
}

export interface ExtractedData {
  driverName?: string
  driverCpf?: string
  vehiclePlate?: string
  vehicleRenavam?: string
  infractionNumber?: string
  infractionDate?: string
  infractionType?: string
  infractionCode?: string
  agency?: string
}

export function parseInfractionData(text: string): ExtractedData {
  const data: ExtractedData = {}

  // Extrai CPF (formato: 000.000.000-00)
  const cpfMatch = text.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
  if (cpfMatch) data.driverCpf = cpfMatch[0]

  // Extrai placa (formato: ABC-1234 ou ABC1D34)
  const plateMatch = text.match(/[A-Z]{3}[-]?\d[A-Z0-9]\d{2}/i)
  if (plateMatch) data.vehiclePlate = plateMatch[0].toUpperCase()

  // Extrai RENAVAM (11 dígitos)
  const renavamMatch = text.match(/RENAVAM[:\s]*(\d{11})/i)
  if (renavamMatch) data.vehicleRenavam = renavamMatch[1]

  // Extrai número do auto
  const autoMatch = text.match(/AUTO[:\s]*(\w+)/i) || text.match(/N[ºÚ][\s]*(\w+)/i)
  if (autoMatch) data.infractionNumber = autoMatch[1]

  // Extrai data (formato: DD/MM/YYYY)
  const dateMatch = text.match(/\d{2}\/\d{2}\/\d{4}/)
  if (dateMatch) data.infractionDate = dateMatch[0]

  // Extrai código da infração (formato: XXX-XX ou números)
  const codeMatch = text.match(/C[ÓO]DIGO[:\s]*(\d{3}[-]?\d{1,2})/i)
  if (codeMatch) data.infractionCode = codeMatch[1]

  // Tenta identificar o órgão emissor
  if (text.toLowerCase().includes('detran')) {
    data.agency = 'DETRAN'
  } else if (text.toLowerCase().includes('prefeitura')) {
    data.agency = 'Prefeitura'
  } else if (text.toLowerCase().includes('prf') || text.toLowerCase().includes('polícia rodoviária federal')) {
    data.agency = 'PRF'
  }

  return data
}

export async function processDocument(
  fileBuffer: Buffer,
  documentType: 'cnh' | 'crlv' | 'infraction'
): Promise<ExtractedData> {
  const ocrResult = await extractTextFromImage(fileBuffer)
  
  console.log(`OCR Confidence: ${ocrResult.confidence}%`)
  console.log('Extracted text:', ocrResult.text.substring(0, 200))

  const extractedData = parseInfractionData(ocrResult.text)

  return extractedData
}
