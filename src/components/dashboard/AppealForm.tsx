'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import FileUpload from './FileUpload'
import { Loader2, Sparkles, CheckCircle } from 'lucide-react'

interface UploadedFiles {
  cnh: File | null
  crlv: File | null
  rg: File | null
  infraction: File | null
}

export default function AppealForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [possuiCnh, setPossuiCnh] = useState<boolean | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [files, setFiles] = useState<UploadedFiles>({
    cnh: null,
    crlv: null,
    rg: null,
    infraction: null,
  })

  const handleFileChange = (type: keyof UploadedFiles, file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file }))
  }

  const handleSubmit = async () => {
    if (possuiCnh === null) {
      toast({
        variant: 'destructive',
        title: 'Informação necessária',
        description: 'Por favor, informe se você possui CNH válida.',
      })
      return
    }

    const requiredFiles = possuiCnh 
      ? ['cnh', 'crlv', 'infraction'] as const
      : ['crlv', 'rg', 'infraction'] as const

    const missingFiles = requiredFiles.filter(type => !files[type])

    if (missingFiles.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Documentos incompletos',
        description: `Por favor, envie: ${missingFiles.join(', ').toUpperCase()}`,
      })
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('possuiCnh', possuiCnh.toString())
      
      if (files.cnh) formData.append('cnh', files.cnh)
      if (files.crlv) formData.append('crlv', files.crlv)
      if (files.rg) formData.append('rg', files.rg)
      if (files.infraction) formData.append('infraction', files.infraction)

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
            Informações Iniciais
          </CardTitle>
          <CardDescription>
            Responda a pergunta abaixo para personalizar seu processo de recurso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Você possui CNH válida?</h3>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={possuiCnh === true ? "default" : "outline"}
                onClick={() => setPossuiCnh(true)}
                className="flex items-center gap-2"
              >
                {possuiCnh === true && <CheckCircle className="h-4 w-4" />}
                Sim
              </Button>
              <Button
                type="button"
                variant={possuiCnh === false ? "default" : "outline"}
                onClick={() => setPossuiCnh(false)}
                className="flex items-center gap-2"
              >
                {possuiCnh === false && <CheckCircle className="h-4 w-4" />}
                Não
              </Button>
            </div>
            {possuiCnh === false && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ Sem CNH?</strong> Mesmo assim você pode recorrer! 
                  Envie apenas o CRLV do veículo e seu RG/CPF. Geraremos uma defesa prévia ou recurso adequado à sua situação.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {possuiCnh !== null && (
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
            {possuiCnh ? (
              <>
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
              </>
            ) : (
              <>
                <FileUpload
                  label="CRLV (Documento do Veículo)"
                  accept="image/*,.pdf"
                  onChange={(file) => handleFileChange('crlv', file)}
                  file={files.crlv}
                />
                
                <FileUpload
                  label="RG/CPF (Documento Pessoal)"
                  accept="image/*,.pdf"
                  onChange={(file) => handleFileChange('rg', file)}
                  file={files.rg}
                />
                
                <FileUpload
                  label="Auto de Infração (Multa Recebida)"
                  accept="image/*,.pdf"
                  onChange={(file) => handleFileChange('infraction', file)}
                  file={files.infraction}
                />
              </>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>🤖 Como funciona:</strong> Após o upload, o Gemini Vision irá analisar seus documentos, 
                extrair automaticamente os dados e gerar um recurso jurídico completo em segundos!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={possuiCnh === null || isProcessing || 
            (possuiCnh ? (!files.cnh || !files.crlv || !files.infraction) : (!files.crlv || !files.rg || !files.infraction))}
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
