'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowLeft } from 'lucide-react'

interface Plan {
  id: string
  name: string
  displayName: string
  description: string
  price: number
  appealsPerMonth: number
  features: string[]
  order: number
}

export default function PlansPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
    if (session?.user) {
      fetchCurrentSubscription()
    }
  }, [session])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans')
      const data = await response.json()
      setPlans(data.sort((a: Plan, b: Plan) => a.order - b.order))
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCurrentSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')
      if (response.ok) {
        const data = await response.json()
        setCurrentPlan(data.plan.name)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    }
  }

  const handleSelectPlan = async (planId: string) => {
    if (!session?.user) {
      router.push('/auth/login')
      return
    }

    try {
      const response = await fetch('/api/subscription/change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      })

      if (response.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error changing plan:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-gray-600">
            Geração automatizada de recursos com inteligência artificial
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${
                plan.name === 'pro' 
                  ? 'border-blue-500 border-2 shadow-xl transform scale-105' 
                  : ''
              }`}
            >
              {plan.name === 'pro' && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 ml-2">/mês</span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={currentPlan === plan.name}
                  className="w-full"
                  variant={plan.name === 'pro' ? 'default' : 'outline'}
                >
                  {currentPlan === plan.name ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-2">✅ Cancele quando quiser • ✅ Sem taxas escondidas • ✅ Suporte incluído</p>
          <p className="text-sm">Todos os planos incluem geração com IA, download em PDF e histórico</p>
        </div>
      </div>
    </div>
  )
}
