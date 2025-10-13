import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: session.user.id
      },
      include: {
        plan: true
      }
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(subscription)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar assinatura' },
      { status: 500 }
    )
  }
}
