'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AppealForm from '@/components/dashboard/AppealForm'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profileComplete, setProfileComplete] = useState(true)
  const [isCheckingProfile, setIsCheckingProfile] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      checkProfile()
    }
  }, [session])

  const checkProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        const isComplete = !!(data.name && data.cpf && data.phone && data.address)
        setProfileComplete(isComplete)
      }
    } catch (error) {
      console.error('Error checking profile:', error)
    } finally {
      setIsCheckingProfile(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Criar Novo Recurso
          </h1>
          <p className="text-gray-600 mt-2">
            Envie seus documentos para gerar um recurso automaticamente
          </p>
        </div>

        {!isCheckingProfile && !profileComplete && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    ⚠️ Complete seu perfil primeiro!
                  </h3>
                  <p className="text-sm text-orange-800 mb-3">
                    Para gerar recursos com seus dados completos (nome, CPF, telefone, endereço),
                    você precisa preencher seu perfil.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/dashboard/profile')}
                    className="border-orange-300 hover:bg-orange-100"
                  >
                    Ir para Meu Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <AppealForm />
      </div>
    </DashboardLayout>
  )
}
