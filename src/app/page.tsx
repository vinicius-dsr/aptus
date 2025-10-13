import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Bot, Send } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Aptus</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Começar Agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Recursos de Multas<br />
          <span className="text-blue-600">Automatizados com IA</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Envie seus documentos e receba um recurso de multa completo,
          personalizado e pronto para envio em minutos.
        </p>
        <Link href="/auth/register">
          <Button size="lg" className="text-lg px-8 py-6">
            Criar Recurso Agora
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Upload className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>1. Upload</CardTitle>
              <CardDescription>
                Envie CNH, CRLV e auto de infração
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>2. Extração</CardTitle>
              <CardDescription>
                OCR extrai automaticamente os dados dos documentos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Bot className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>3. Geração</CardTitle>
              <CardDescription>
                IA gera recurso personalizado com argumentos jurídicos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Send className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>4. Envio</CardTitle>
              <CardDescription>
                Baixe o PDF ou envie direto por e-mail
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Criar Seu Recurso?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de motoristas que já recorreram com sucesso
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Começar Gratuitamente
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Aptus. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
