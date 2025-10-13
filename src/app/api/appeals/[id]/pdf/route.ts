import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateAppealPDF } from '@/lib/pdf'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
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

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="recurso-${appeal.infractionNumber || appeal.id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar PDF' },
      { status: 500 }
    )
  }
}
