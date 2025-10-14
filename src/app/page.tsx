import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Upload, Bot, Send, Check, Star, Zap, Crown, ArrowRight, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Floating CTA Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        <Link href="/auth/register">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Aptus</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 text-sm">
            🚀 Plataforma SaaS Completa
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Recursos de Multas<br />
            <span className="text-blue-600">Automatizados com IA</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Envie seus documentos e receba um recurso de multa completo,
            personalizado e pronto para envio em minutos com nossa IA avançada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                Criar Recurso Agora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#planos">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
              >
                Ver Planos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Processo simples e automatizado em 4 etapas
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">1. Upload</CardTitle>
              <CardDescription className="text-sm">
                Envie CNH, CRLV e auto de infração de forma segura
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">2. Extração</CardTitle>
              <CardDescription className="text-sm">
                OCR inteligente extrai automaticamente os dados dos documentos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">3. Geração</CardTitle>
              <CardDescription className="text-sm">
                IA gera recurso personalizado com argumentos jurídicos sólidos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">4. Envio</CardTitle>
              <CardDescription className="text-sm">
                Baixe o PDF profissional ou envie direto por e-mail
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Escolha Seu Plano
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Planos flexíveis para todos os perfis de motoristas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Gratuito */}
            <Card className="relative hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">Gratuito</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$ 0</div>
                <p className="text-sm text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-sm text-gray-600 mb-6">Ideal para testar o serviço</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    2 recursos por mês
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Geração com IA
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Download em PDF
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Suporte por email
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full py-3 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
                  >
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Básico */}
            <Card className="relative hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Básico</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$ 29</div>
                <p className="text-sm text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-sm text-gray-600 mb-6">Para motoristas frequentes</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    10 recursos por mês
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    IA avançada
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Envio por email
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Histórico completo
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Suporte prioritário
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    Escolher Básico
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profissional */}
            <Card className="relative hover:shadow-xl transition-all duration-300 border-2 border-blue-500 shadow-lg scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">Mais Popular</Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Profissional</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$ 79</div>
                <p className="text-sm text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-sm text-gray-600 mb-6">Para profissionais do volante</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    50 recursos por mês
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    IA com contexto avançado
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Templates personalizados
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Múltiplos usuários
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Suporte 24/7
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group font-semibold"
                  >
                    Escolher Profissional
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Empresarial */}
            <Card className="relative hover:shadow-xl transition-all duration-300 border-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Crown className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Empresarial</CardTitle>
                <div className="text-3xl font-bold text-gray-900">R$ 199</div>
                <p className="text-sm text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-sm text-gray-600 mb-6">Para frotas e empresas</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Recursos ilimitados
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    IA customizada
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    API de integração
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    White label
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    SLA garantido
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full py-3 border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group text-purple-700 hover:text-purple-900"
                  >
                    Fale Conosco
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Pronto para Criar Seu Recurso?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de motoristas que já recorreram com sucesso usando nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group font-semibold"
              >
                Começar Gratuitamente
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#planos">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 w-full sm:w-auto border-2 border-white/80 text-blue-100 hover:bg-white hover:text-blue-600 hover:border-white transition-all duration-300 group font-semibold bg-white/10 backdrop-blur-sm"
              >
                Ver Todos os Planos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Aptus</span>
            </div>
            <div className="text-center md:text-right text-gray-600">
              <p className="text-sm">&copy; 2024 Aptus. Todos os direitos reservados.</p>
              <p className="text-xs mt-1">Recursos jurídicos automatizados com IA</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
