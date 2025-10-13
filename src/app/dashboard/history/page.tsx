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
          <h1 className="text-3xl font-bold text-gray-900">Histórico de Recursos</h1>
          <p className="text-gray-600 mt-2">
            Visualize todos os recursos criados
          </p>
        </div>

        {appeals.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum recurso criado ainda</p>
              <Link href="/dashboard">
                <Button className="mt-4">Criar Primeiro Recurso</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {appeals.map((appeal) => (
              <Card key={appeal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        Auto de Infração: {appeal.infractionNumber || 'N/A'}
                      </CardTitle>
                      <CardDescription>
                        Placa: {appeal.vehiclePlate || 'N/A'} • 
                        Criado em {new Date(appeal.createdAt).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appeal.status)}`}>
                      {getStatusText(appeal.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href={`/dashboard/appeals/${appeal.id}`}>
                    <Button>Ver Detalhes</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
