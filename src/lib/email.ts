import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export interface EmailData {
  to: string
  subject: string
  text: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

export async function sendEmail(data: EmailData): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html || data.text,
      attachments: data.attachments,
    })
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error('Falha ao enviar email')
  }
}

export async function sendAppealByEmail(
  recipientEmail: string,
  appealData: {
    driverName?: string
    infractionNumber?: string
    pdfBuffer: Buffer
  }
): Promise<void> {
  const subject = `Recurso de Multa - Auto ${appealData.infractionNumber || 'N/A'}`
  
  const text = `
Prezado(a) Senhor(a),

Segue em anexo recurso referente ao Auto de Infração nº ${appealData.infractionNumber || 'N/A'}.

${appealData.driverName ? `Recorrente: ${appealData.driverName}` : ''}

Atenciosamente,
${appealData.driverName || 'Recorrente'}
  `.trim()

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Recurso de Multa de Trânsito</h2>
    </div>
    <div class="content">
      <p>Prezado(a) Senhor(a),</p>
      <p>Segue em anexo recurso referente ao Auto de Infração nº <strong>${appealData.infractionNumber || 'N/A'}</strong>.</p>
      ${appealData.driverName ? `<p>Recorrente: <strong>${appealData.driverName}</strong></p>` : ''}
      <p>O documento em anexo contém toda a fundamentação legal e argumentação necessária para análise do recurso.</p>
      <div class="footer">
        <p>Atenciosamente,<br>${appealData.driverName || 'Recorrente'}</p>
        <p><em>Documento gerado automaticamente pelo sistema Aptus</em></p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()

  await sendEmail({
    to: recipientEmail,
    subject,
    text,
    html,
    attachments: [
      {
        filename: `recurso-${appealData.infractionNumber || 'multa'}.pdf`,
        content: appealData.pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })
}
