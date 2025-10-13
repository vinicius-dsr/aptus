import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '')

export interface AppealData {
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

export async function generateAppealText(data: AppealData): Promise<string> {
  const prompt = `
Você é um especialista em direito de trânsito brasileiro. Gere um recurso de multa de trânsito profissional e juridicamente fundamentado com base nos seguintes dados:

DADOS DO CONDUTOR:
- Nome: ${data.driverName || 'Não informado'}
- CPF: ${data.driverCpf || 'Não informado'}

DADOS DO VEÍCULO:
- Placa: ${data.vehiclePlate || 'Não informado'}
- RENAVAM: ${data.vehicleRenavam || 'Não informado'}

DADOS DA INFRAÇÃO:
- Número do Auto: ${data.infractionNumber || 'Não informado'}
- Data: ${data.infractionDate || 'Não informado'}
- Código: ${data.infractionCode || 'Não informado'}
- Tipo: ${data.infractionType || 'Não especificado'}
- Órgão Emissor: ${data.agency || 'Não informado'}

IMPORTANTE:
- Use linguagem formal e técnica
- Cite artigos do Código de Trânsito Brasileiro (CTB) quando aplicável
- Inclua fundamentos jurídicos sólidos
- Mantenha tom respeitoso e profissional
- Organize em: cabeçalho, qualificação, exposição dos fatos, fundamentação jurídica, pedido e fecho
- Não invente dados que não foram fornecidos

Gere o recurso completo agora:
`.trim()

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text || 'Erro ao gerar recurso'
  } catch (error) {
    console.error('Google AI Error:', error)
    throw new Error('Falha ao gerar recurso com IA')
  }
}

export async function improveExtractedData(
  ocrText: string,
  currentData: AppealData
): Promise<AppealData> {
  const prompt = `
Analise o seguinte texto extraído de documentos de trânsito via OCR e extraia/melhore os dados:

TEXTO OCR:
${ocrText.substring(0, 1000)}

DADOS ATUAIS:
${JSON.stringify(currentData, null, 2)}

Retorne APENAS um JSON válido com os dados melhorados/corrigidos. Inclua apenas os campos que você conseguir identificar com certeza.
Formato esperado:
{
  "driverName": "string",
  "driverCpf": "string",
  "vehiclePlate": "string",
  "vehicleRenavam": "string",
  "infractionNumber": "string",
  "infractionDate": "string",
  "infractionCode": "string",
  "agency": "string"
}

Retorne SOMENTE o JSON, sem explicações adicionais.
`.trim()

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extrair JSON do texto (caso venha com markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const jsonText = jsonMatch ? jsonMatch[0] : text
    
    const improvedData = JSON.parse(jsonText)
    
    return { ...currentData, ...improvedData }
  } catch (error) {
    console.error('Google AI Data Improvement Error:', error)
    return currentData
  }
}

// ✨ NOVA FUNÇÃO: Analisar imagem com Gemini Vision
export async function analyzeDocumentImage(
  imageBuffer: Buffer,
  documentType: 'cnh' | 'crlv' | 'infraction'
): Promise<AppealData> {
  const documentDescriptions = {
    cnh: 'CNH (Carteira Nacional de Habilitação) brasileira',
    crlv: 'CRLV (Certificado de Registro e Licenciamento de Veículo) brasileiro',
    infraction: 'Auto de Infração de Trânsito (multa) brasileiro'
  }

  const prompt = `
Analise esta imagem de ${documentDescriptions[documentType]} e extraia TODOS os dados possíveis.

IMPORTANTE:
- Extraia dados com precisão máxima
- Se não conseguir ler algum campo, não invente
- Retorne APENAS um JSON válido, sem explicações

Formato de resposta (JSON):
{
  "driverName": "nome completo do condutor",
  "driverCpf": "CPF formato 000.000.000-00",
  "vehiclePlate": "placa formato ABC-1234 ou ABC1D34",
  "vehicleRenavam": "número RENAVAM (11 dígitos)",
  "infractionNumber": "número do auto de infração",
  "infractionDate": "data formato DD/MM/AAAA",
  "infractionCode": "código da infração",
  "agency": "órgão autuador (DETRAN, PRF, etc)"
}

Retorne SOMENTE o JSON com os dados que você conseguir extrair da imagem.
`.trim()

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    // Converter buffer para base64
    const base64Image = imageBuffer.toString('base64')
    
    // Detectar tipo MIME (simplificado - assumir JPEG por padrão)
    const mimeType = 'image/jpeg'
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ])
    
    const response = await result.response
    const text = response.text()
    
    console.log(`Gemini Vision response for ${documentType}:`, text.substring(0, 200))
    
    // Extrair JSON do texto
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn('No JSON found in Gemini response')
      return {}
    }
    
    const jsonText = jsonMatch[0]
    const extractedData = JSON.parse(jsonText)
    
    return extractedData
  } catch (error) {
    console.error(`Gemini Vision Error (${documentType}):`, error)
    return {}
  }
}

// ✨ Processar múltiplos documentos com Gemini Vision
export async function analyzeAllDocuments(
  cnhBuffer: Buffer,
  crlvBuffer: Buffer,
  infractionBuffer: Buffer
): Promise<AppealData> {
  console.log('Analisando documentos com Gemini Vision...')
  
  try {
    // Analisar cada documento em paralelo
    const [cnhData, crlvData, infractionData] = await Promise.all([
      analyzeDocumentImage(cnhBuffer, 'cnh'),
      analyzeDocumentImage(crlvBuffer, 'crlv'),
      analyzeDocumentImage(infractionBuffer, 'infraction'),
    ])
    
    // Combinar dados (prioridade: infraction > crlv > cnh)
    const combinedData: AppealData = {
      ...cnhData,
      ...crlvData,
      ...infractionData,
    }
    
    console.log('Dados extraídos com sucesso:', JSON.stringify(combinedData, null, 2))
    
    return combinedData
  } catch (error) {
    console.error('Error analyzing documents:', error)
    throw error
  }
}
