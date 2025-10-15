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
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-orange-800">
                  Complete seu perfil para gerar recursos com seus dados pessoais.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/dashboard/profile')}
                  className="mt-3 border-orange-300 hover:bg-orange-100"
                >
                  Completar Perfil
                </Button>
              </div>
            </div>
          </div>
        )}

        <AppealForm />
      </div>
    </DashboardLayout>
  )
}
