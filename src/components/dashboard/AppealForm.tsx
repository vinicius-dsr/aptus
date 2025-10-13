'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import FileUpload from './FileUpload'
import { Loader2 } from 'lucide-react'

interface UploadedFiles {
  cnh: File | null
  crlv: File | null
  infraction: File | null
}

export default function AppealForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [files, setFiles] = useState<UploadedFiles>({
    cnh: null,
    crlv: null,
    infraction: null,
  })

  const handleFileChange = (type: keyof UploadedFiles, file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }))
  }

  const handleSubmit = async () => {
    if (!files.cnh || !files.crlv || !files.infraction) {
      toast({
        variant: 'destructive',
        title: 'Documentos incompletos',
        description: 'Por favor, envie todos os documentos necessários',
      })
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('cnh', files.cnh)
      formData.append('crlv', files.crlv)
      formData.append('infraction', files.infraction)

      const response = await fetch('/api/appeals/create', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao processar documentos')
      }

      const data = await response.json()

      toast({
        title: 'Documentos processados!',
        description: 'Redirecionando para visualização...',
      })

      router.push(`/dashboard/appeals/${data.appealId}`)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao processar',
        description: error.message || 'Tente novamente mais tarde',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>1. Upload de Documentos</CardTitle>
          <CardDescription>
            Envie os documentos necessários para análise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload
            label="CNH (Carteira Nacional de Habilitação)"
            accept="image/*,.pdf"
            onChange={(file) => handleFileChange('cnh', file)}
            file={files.cnh}
          />
          
          <FileUpload
            label="CRLV (Documento do Veículo)"
            accept="image/*,.pdf"
            onChange={(file) => handleFileChange('crlv', file)}
            file={files.crlv}
          />
          
          <FileUpload
            label="Auto de Infração (Multa Recebida)"
            accept="image/*,.pdf"
            onChange={(file) => handleFileChange('infraction', file)}
            file={files.infraction}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isProcessing || !files.cnh || !files.crlv || !files.infraction}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            'Processar Documentos'
          )}
        </Button>
      </div>
    </div>
  )
}
