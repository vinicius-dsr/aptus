'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Upload, X, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  label: string
  accept?: string
  onChange: (file: File | null) => void
  file: File | null
}

export default function FileUpload({ label, accept, onChange, file }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0])
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxFiles: 1,
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card
        {...getRootProps()}
        className={`p-6 cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-600 bg-blue-50' : 'border-dashed hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {isDragActive
                ? 'Solte o arquivo aqui...'
                : 'Arraste um arquivo ou clique para selecionar'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, PNG, JPG até 10MB
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
