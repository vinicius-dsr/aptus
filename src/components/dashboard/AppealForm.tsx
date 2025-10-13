'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import FileUpload from './FileUpload'
import { Loader2, Sparkles } from 'lucide-react'

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
        const error = await response.json()
        throw new Error(error.error || 'Erro ao processar documentos')
      }

      const data = await response.json()

      toast({
        title: '✨ Documentos analisados com IA!',
        description: 'Gemini extraiu os dados e gerou o recurso. Redirecionando...',
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
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Upload de Documentos
          </CardTitle>
          <CardDescription>
            ✨ <strong>Novidade:</strong> IA Gemini analisa suas imagens automaticamente e extrai todos os dados!
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>🤖 Como funciona:</strong> Após o upload, o Gemini Vision irá analisar seus documentos, 
              extrair automaticamente os dados e gerar um recurso jurídico completo em segundos!
            </p>
          </div>
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
              IA analisando documentos...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analisar com IA
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
