'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Search, Eye, Download, Filter } from 'lucide-react'

interface Appeal {
  id: string
  driverName: string | null
  driverCpf: string | null
  vehiclePlate: string | null
  infractionNumber: string | null
  infractionCode: string | null
  agency: string | null
  status: string
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export default function AdminAppealsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [appeals, setAppeals] = useState<Appeal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchAppeals()
    }
  }, [session])

  const fetchAppeals = async () => {
    try {
      const response = await fetch('/api/admin/appeals')
      if (!response.ok) throw new Error('Erro ao carregar recursos')
      const data = await response.json()
      setAppeals(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os recursos',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAppeals = appeals.filter(appeal => {
    const matchesSearch = 
      appeal.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.infractionNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appeal.user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || appeal.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      PENDING: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      PROCESSING: { label: 'Processando', className: 'bg-blue-100 text-blue-800' },
      COMPLETED: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
      SENT: { label: 'Enviado', className: 'bg-purple-100 text-purple-800' },
      ERROR: { label: 'Erro', className: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (session?.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Todos os Recursos</h1>
          <p className="text-gray-600 mt-2">Visualize todos os recursos criados no sistema</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, placa, número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'ALL' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('ALL')}
                >
                  Todos
                </Button>
                <Button
                  variant={statusFilter === 'COMPLETED' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('COMPLETED')}
                >
                  Concluídos
                </Button>
                <Button
                  variant={statusFilter === 'PROCESSING' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('PROCESSING')}
                >
                  Processando
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Condutor</th>
                    <th className="text-left py-3 px-4">Veículo</th>
                    <th className="text-left py-3 px-4">Infração</th>
                    <th className="text-left py-3 px-4">Usuário</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Data</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppeals.map((appeal) => (
                    <tr key={appeal.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{appeal.driverName || '—'}</p>
                          <p className="text-sm text-gray-500">{appeal.driverCpf || '—'}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium">{appeal.vehiclePlate || '—'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{appeal.infractionNumber || '—'}</p>
                          <p className="text-sm text-gray-500">{appeal.infractionCode || '—'}</p>
                          <p className="text-xs text-gray-400">{appeal.agency || '—'}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm">{appeal.user.name}</p>
                          <p className="text-xs text-gray-500">{appeal.user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(appeal.status)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(appeal.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/appeals/${appeal.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredAppeals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum recurso encontrado
                </div>
              )}
            </div>

            {filteredAppeals.length > 0 && (
              <div className="mt-4 text-sm text-gray-500">
                Mostrando {filteredAppeals.length} de {appeals.length} recursos
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
