import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAppealPDF } from '@/lib/pdf'
import { sendAppealByEmail } from '@/lib/email'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email não informado' }, { status: 400 })
    }

    const appeal = await prisma.appeal.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!appeal || !appeal.appealText) {
      return NextResponse.json({ error: 'Recurso não encontrado' }, { status: 404 })
    }

    const pdfBuffer = generateAppealPDF({
      appealText: appeal.appealText,
      driverName: appeal.driverName || undefined,
      driverCpf: appeal.driverCpf || undefined,
      vehiclePlate: appeal.vehiclePlate || undefined,
      infractionNumber: appeal.infractionNumber || undefined,
      infractionDate: appeal.infractionDate?.toLocaleDateString('pt-BR') || undefined,
      agency: appeal.agency || undefined,
    })

    await sendAppealByEmail(email, {
      driverName: appeal.driverName || undefined,
      infractionNumber: appeal.infractionNumber || undefined,
      pdfBuffer,
    })

    await prisma.appeal.update({
      where: { id: appeal.id },
      data: {
        status: 'SENT',
        agencyEmail: email,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email' },
      { status: 500 }
    )
  }
}
