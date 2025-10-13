'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Download, Send, Loader2, CheckCircle } from 'lucide-react'

interface Appeal {
  id: string
  driverName?: string
  driverCpf?: string
  vehiclePlate?: string
  vehicleRenavam?: string
  infractionNumber?: string
  infractionDate?: string
  infractionCode?: string
  agency?: string
  appealText?: string
  status: string
  agencyEmail?: string
}

export default function AppealViewPage() {
  const params = useParams()
  const { toast } = useToast()
  const [appeal, setAppeal] = useState<Appeal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')

  useEffect(() => {
    fetchAppeal()
  }, [params.id])

  const fetchAppeal = async () => {
    try {
      const response = await fetch(`/api/appeals/${params.id}`)
      const data = await response.json()
      
      if (data.appeal) {
        setAppeal(data.appeal)
        if (data.appeal.agencyEmail) {
          setRecipientEmail(data.appeal.agencyEmail)
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar o recurso',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    window.open(`/api/appeals/${params.id}/pdf`, '_blank')
  }

  const handleSendEmail = async () => {
    if (!recipientEmail) {
      toast({
        variant: 'destructive',
        title: 'Email obrigatório',
        description: 'Informe o email do destinatário',
      })
      return
    }

    setIsSending(true)

    try {
      const response = await fetch(`/api/appeals/${params.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recipientEmail }),
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar email')
      }

      toast({
        title: 'Email enviado!',
        description: 'O recurso foi enviado com sucesso',
      })

      fetchAppeal()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar',
        description: 'Tente novamente mais tarde',
      })
    } finally {
      setIsSending(false)
    }
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

  if (!appeal) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-gray-600">Recurso não encontrado</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recurso Gerado</h1>
            <p className="text-gray-600 mt-2">
              Auto de Infração: {appeal.infractionNumber || 'N/A'}
            </p>
          </div>
          {appeal.status === 'SENT' && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Enviado</span>
            </div>
          )}
        </div>

        {/* Dados Extraídos */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Extraídos</CardTitle>
            <CardDescription>Informações extraídas dos documentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {appeal.driverName && (
                <div>
                  <Label className="text-gray-600">Nome do Condutor</Label>
                  <p className="font-medium">{appeal.driverName}</p>
                </div>
              )}
              {appeal.driverCpf && (
                <div>
                  <Label className="text-gray-600">CPF</Label>
                  <p className="font-medium">{appeal.driverCpf}</p>
                </div>
              )}
              {appeal.vehiclePlate && (
                <div>
                  <Label className="text-gray-600">Placa</Label>
                  <p className="font-medium">{appeal.vehiclePlate}</p>
                </div>
              )}
              {appeal.vehicleRenavam && (
                <div>
                  <Label className="text-gray-600">RENAVAM</Label>
                  <p className="font-medium">{appeal.vehicleRenavam}</p>
                </div>
              )}
              {appeal.infractionCode && (
                <div>
                  <Label className="text-gray-600">Código da Infração</Label>
                  <p className="font-medium">{appeal.infractionCode}</p>
                </div>
              )}
              {appeal.agency && (
                <div>
                  <Label className="text-gray-600">Órgão Autuador</Label>
                  <p className="font-medium">{appeal.agency}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Texto do Recurso */}
        <Card>
          <CardHeader>
            <CardTitle>Recurso Gerado</CardTitle>
            <CardDescription>Texto completo do recurso de multa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                {appeal.appealText}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Baixar PDF</CardTitle>
              <CardDescription>Faça download do recurso em formato PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleDownloadPDF} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enviar por Email</CardTitle>
              <CardDescription>Envie o recurso diretamente para o órgão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email do destinatário</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@detran.gov.br"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  disabled={isSending}
                />
              </div>
              <Button
                onClick={handleSendEmail}
                disabled={isSending || !recipientEmail}
                className="w-full"
                size="lg"
              >
                {isSending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Email
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
