import { jsPDF } from 'jspdf'

export interface PDFData {
  appealText: string
  driverName?: string
  driverCpf?: string
  vehiclePlate?: string
  infractionNumber?: string
  infractionDate?: string
  agency?: string
}

export function generateAppealPDF(data: PDFData): Buffer {
  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper para adicionar texto com quebra de linha
  const addText = (text: string, size: number = 12, isBold: boolean = false) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')
    
    const lines = doc.splitTextToSize(text, contentWidth)
    
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, margin, yPosition)
      yPosition += size * 0.5
    })
    
    yPosition += 5
  }

  // Cabeçalho
  addText('RECURSO DE MULTA DE TRÂNSITO', 16, true)
  yPosition += 5

  // Dados do recorrente
  if (data.driverName) {
    addText(`RECORRENTE: ${data.driverName}`, 12, true)
  }
  if (data.driverCpf) {
    addText(`CPF: ${data.driverCpf}`)
  }
  if (data.vehiclePlate) {
    addText(`PLACA DO VEÍCULO: ${data.vehiclePlate}`)
  }
  if (data.infractionNumber) {
    addText(`AUTO DE INFRAÇÃO Nº: ${data.infractionNumber}`)
  }
  if (data.infractionDate) {
    addText(`DATA DA INFRAÇÃO: ${data.infractionDate}`)
  }
  if (data.agency) {
    addText(`ÓRGÃO AUTUADOR: ${data.agency}`)
  }

  yPosition += 10

  // Corpo do recurso
  addText(data.appealText, 11)

  // Rodapé
  yPosition += 10
  addText('_'.repeat(60))
  addText('Assinatura do Recorrente')
  
  const currentDate = new Date().toLocaleDateString('pt-BR')
  addText(`Data: ${currentDate}`)

  return Buffer.from(doc.output('arraybuffer'))
}
