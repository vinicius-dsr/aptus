import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { planId } = await request.json()

    // Buscar o plano
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plano não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se já tem assinatura
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id }
    })

    const currentPeriodEnd = new Date()
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30) // 30 dias

    if (existingSubscription) {
      // Atualizar assinatura existente
      const subscription = await prisma.subscription.update({
        where: { userId: session.user.id },
        data: {
          planId: plan.id,
          appealsLimit: plan.appealsPerMonth,
          appealsUsed: 0, // Reset do contador
          currentPeriodStart: new Date(),
          currentPeriodEnd,
          status: 'ACTIVE'
        },
        include: {
          plan: true
        }
      })

      return NextResponse.json(subscription)
    } else {
      // Criar nova assinatura
      const subscription = await prisma.subscription.create({
        data: {
          userId: session.user.id,
          planId: plan.id,
          appealsLimit: plan.appealsPerMonth,
          appealsUsed: 0,
          currentPeriodEnd,
          status: 'ACTIVE'
        },
        include: {
          plan: true
        }
      })

      return NextResponse.json(subscription)
    }
  } catch (error) {
    console.error('Error changing subscription:', error)
    return NextResponse.json(
      { error: 'Erro ao alterar plano' },
      { status: 500 }
    )
  }
}
