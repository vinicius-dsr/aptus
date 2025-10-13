import { prisma } from './prisma'

export interface SubscriptionInfo {
  hasActiveSubscription: boolean
  canCreateAppeal: boolean
  appealsUsed: number
  appealsLimit: number
  planName: string
  planDisplayName: string
  daysRemaining: number
}

export async function getSubscriptionInfo(userId: string): Promise<SubscriptionInfo | null> {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      include: {
        plan: true
      }
    })

    if (!subscription) {
      return null
    }

    const now = new Date()
    const daysRemaining = Math.ceil(
      (subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Se o período expirou, resetar o contador
    if (now > subscription.currentPeriodEnd) {
      await resetSubscriptionPeriod(userId)
      return await getSubscriptionInfo(userId) // Recursivo após reset
    }

    return {
      hasActiveSubscription: subscription.status === 'ACTIVE',
      canCreateAppeal: subscription.appealsUsed < subscription.appealsLimit,
      appealsUsed: subscription.appealsUsed,
      appealsLimit: subscription.appealsLimit,
      planName: subscription.plan.name,
      planDisplayName: subscription.plan.displayName,
      daysRemaining
    }
  } catch (error) {
    console.error('Error getting subscription info:', error)
    return null
  }
}

export async function incrementAppealUsage(userId: string): Promise<boolean> {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    })

    if (!subscription) {
      throw new Error('Assinatura não encontrada')
    }

    if (subscription.appealsUsed >= subscription.appealsLimit) {
      throw new Error('Limite de recursos atingido')
    }

    await prisma.subscription.update({
      where: { userId },
      data: {
        appealsUsed: {
          increment: 1
        }
      }
    })

    return true
  } catch (error) {
    console.error('Error incrementing appeal usage:', error)
    return false
  }
}

export async function resetSubscriptionPeriod(userId: string): Promise<void> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId }
  })

  if (!subscription) {
    return
  }

  const newPeriodStart = new Date()
  const newPeriodEnd = new Date()
  newPeriodEnd.setDate(newPeriodEnd.getDate() + 30)

  await prisma.subscription.update({
    where: { userId },
    data: {
      appealsUsed: 0,
      currentPeriodStart: newPeriodStart,
      currentPeriodEnd: newPeriodEnd
    }
  })
}

export async function checkAppealLimit(userId: string): Promise<{
  allowed: boolean
  message?: string
}> {
  const info = await getSubscriptionInfo(userId)

  if (!info) {
    return {
      allowed: false,
      message: 'Você precisa assinar um plano para criar recursos'
    }
  }

  if (!info.hasActiveSubscription) {
    return {
      allowed: false,
      message: 'Sua assinatura está inativa. Por favor, atualize seu plano.'
    }
  }

  if (!info.canCreateAppeal) {
    return {
      allowed: false,
      message: `Você atingiu o limite de ${info.appealsLimit} recursos do seu plano ${info.planDisplayName}. Faça upgrade para continuar.`
    }
  }

  return { allowed: true }
}
