import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Verificar se é admin
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    // Buscar todos os recursos
    const appeals = await prisma.appeal.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(appeals)
  } catch (error) {
    console.error('Error fetching appeals:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar recursos' },
      { status: 500 }
    )
  }
}
