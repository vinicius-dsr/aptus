import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY || '')

export interface AppealData {
  driverName?: string
  driverCpf?: string
  driverPhone?: string
  driverAddress?: string
  driverEmail?: string
  vehiclePlate?: string
  vehicleRenavam?: string
  infractionNumber?: string
  infractionDate?: string
  infractionType?: string
  infractionCode?: string
  agency?: string
}

export async function generateAppealText(data: AppealData): Promise<string> {
  // Construir prompt com dados reais (sem placeholders)
  const prompt = `
Você é um especialista em direito de trânsito brasileiro. Gere um recurso de multa de trânsito profissional e juridicamente fundamentado.

DADOS FORNECIDOS (USE EXATAMENTE COMO ESTÃO):

CONDUTOR:
${data.driverName ? `- Nome Completo: ${data.driverName}` : ''}
${data.driverCpf ? `- CPF: ${data.driverCpf}` : ''}
${data.driverAddress ? `- Endereço: ${data.driverAddress}` : ''}
${data.driverPhone ? `- Telefone: ${data.driverPhone}` : ''}
${data.driverEmail ? `- E-mail: ${data.driverEmail}` : ''}

VEÍCULO:
${data.vehiclePlate ? `- Placa: ${data.vehiclePlate}` : ''}
${data.vehicleRenavam ? `- RENAVAM: ${data.vehicleRenavam}` : ''}

INFRAÇÃO:
${data.infractionNumber ? `- Número do Auto de Infração: ${data.infractionNumber}` : ''}
${data.infractionDate ? `- Data da Infração: ${data.infractionDate}` : ''}
${data.infractionCode ? `- Código da Infração: ${data.infractionCode}` : ''}
${data.agency ? `- Órgão Autuador: ${data.agency}` : ''}

INSTRUÇÕES CRÍTICAS:
1. USE OS DADOS FORNECIDOS ACIMA EXATAMENTE COMO APARECEM - não adicione "[Não informado]" nem outros textos
2. Se um dado não foi fornecido acima, deixe o campo vazio no documento ou omita-o
3. NÃO USE FORMATAÇÃO MARKDOWN (sem ###, **, *, >, etc.) - apenas texto puro formatado
4. Estrutura do documento:

   RECURSO ADMINISTRATIVO DE INFRAÇÃO DE TRÂNSITO
   
   ILUSTRÍSSIMO(A) SENHOR(A) PRESIDENTE DA JUNTA ADMINISTRATIVA DE RECURSOS DE INFRAÇÕES (JARI)
   
   RECORRENTE:
   [Use os dados do CONDUTOR fornecidos acima]
   
   VEÍCULO:
   [Use os dados do VEÍCULO fornecidos acima]
   
   I. EXPOSIÇÃO DOS FATOS
   [Descrever sobre o Auto de Infração usando o número fornecido]
   
   II. FUNDAMENTAÇÃO JURÍDICA
   [Citar artigos do CTB e princípios constitucionais]
   - Art. 280 do CTB (requisitos do AIT)
   - Art. 281 do CTB (prazos e vícios)
   - Princípios constitucionais (ampla defesa, contraditório, due process)
   
   III. DOS PEDIDOS
   Diante do exposto, requer-se:
   a) Arquivamento do auto de infração
   b) Declaração de insubsistência do registro
   c) Concessão de efeito suspensivo
   
   [Local e data atual]
   
   _____________________________
   Assinatura do Recorrente

5. Tom FORMAL, TÉCNICO e RESPEITOSO
6. Cite vícios formais possíveis (falta de dados no AIT, prazo de notificação)
7. Mantenha estrutura profissional de petição jurídica
8. Use APENAS texto puro - sem símbolos markdown

Gere o recurso administrativo completo AGORA, usando APENAS os dados fornecidos:
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
