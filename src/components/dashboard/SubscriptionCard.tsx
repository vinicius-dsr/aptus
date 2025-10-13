'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Crown, TrendingUp, Calendar, FileText } from 'lucide-react'

interface SubscriptionInfo {
  plan: {
    displayName: string
    name: string
    appealsPerMonth: number
  }
  appealsUsed: number
  appealsLimit: number
  currentPeriodEnd: string
  status: string
}

export default function SubscriptionCard() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')
      if (response.ok) {
        const data = await response.json()
        setSubscription(data)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!subscription) {
    return (
      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-500" />
            Nenhuma Assinatura
          </CardTitle>
          <CardDescription>
            Escolha um plano para começar a criar recursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/plans')} className="w-full">
            Ver Planos
          </Button>
        </CardContent>
      </Card>
    )
  }

  const usagePercentage = (subscription.appealsUsed / subscription.appealsLimit) * 100
  const daysRemaining = Math.ceil(
    (new Date(subscription.currentPeriodEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="h-5 w-5 mr-2 text-blue-600" />
            Plano {subscription.plan.displayName}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/plans')}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Upgrade
          </Button>
        </CardTitle>
        <CardDescription>
          Status: {subscription.status === 'ACTIVE' ? '✅ Ativo' : '⚠️ Inativo'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Uso de Recursos */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-1 text-gray-500" />
              <span className="font-medium">Recursos Utilizados</span>
            </div>
            <span className="text-sm font-bold">
              {subscription.appealsUsed} / {subscription.appealsLimit}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          {usagePercentage >= 80 && (
            <p className="text-xs text-orange-600 mt-1">
              ⚠️ Você está próximo do limite mensal
            </p>
          )}
          {usagePercentage >= 100 && (
            <p className="text-xs text-red-600 mt-1">
              🚫 Limite atingido. Faça upgrade para continuar.
            </p>
          )}
        </div>

        {/* Dias Restantes */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Renova em</span>
          </div>
          <span className="text-sm font-bold">
            {daysRemaining} dia{daysRemaining !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/plans')}
            className="flex-1"
          >
            Mudar Plano
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
