import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    if (!appeal) {
      return NextResponse.json({ error: 'Recurso não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ appeal })
  } catch (error) {
    console.error('Error fetching appeal:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar recurso' },
      { status: 500 }
    )
  }
}
