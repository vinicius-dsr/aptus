'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Loader2 } from 'lucide-react'

interface Appeal {
  id: string
  infractionNumber?: string
  vehiclePlate?: string
  status: string
  createdAt: string
}

export default function HistoryPage() {
  const [appeals, setAppeals] = useState<Appeal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAppeals()
  }, [])

  const fetchAppeals = async () => {
    try {
      const response = await fetch('/api/appeals')
      const data = await response.json()
      setAppeals(data.appeals || [])
    } catch (error) {
      console.error('Error fetching appeals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      PENDING: 'Pendente',
      PROCESSING: 'Processando',
      COMPLETED: 'Concluído',
      SENT: 'Enviado',
      ERROR: 'Erro',
    }
    return statusMap[status] || status
  }

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      SENT: 'bg-purple-100 text-purple-800',
      ERROR: 'bg-red-100 text-red-800',
    }
    return colorMap[status] || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Recursos</h1>
          <p className="text-gray-600 mt-2">
            Histórico de todos os recursos gerados
          </p>
        </div>

        {appeals.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum recurso ainda</h3>
              <p className="text-gray-600 mb-6">Você ainda não criou nenhum recurso</p>
              <Link href="/dashboard">
                <Button>Criar Primeiro Recurso</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {appeals.map((appeal) => (
              <Card key={appeal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Recurso {appeal.infractionNumber || 'N/A'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appeal.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          appeal.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          appeal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getStatusText(appeal.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Placa: <span className="font-medium">{appeal.vehiclePlate || 'N/A'}</span></p>
                        <p>Criado em {new Date(appeal.createdAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Link href={`/dashboard/appeals/${appeal.id}`}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
