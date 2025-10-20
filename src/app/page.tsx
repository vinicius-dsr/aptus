import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Bot, Send, Check, ArrowRight, Sparkles } from 'lucide-react'
import Header from '@/components/header'

export default function Home() {
  return (

    <div className="min-h-screen ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Recursos de Multas<br />
            <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">Rápidos e Seguros</span>
          </h1>
          <p className="text-xl sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Gere recursos completos contra multas em minutos.
            Com ou sem CNH, nós ajudamos você.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className=" px-10 py-6 w-full sm:w-auto hover:shadow-xl transition-all duration-300 "
              >
                Criar Meu Recurso
                <ArrowRight className="ml-3 h-5 w-4" />
              </Button>
            </Link>
            <Link href="#planos">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-6 w-full sm:w-auto "
              >
                Ver Planos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Processo simples em 3 etapas
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Faça Upload</h3>
            <p className="text-lg text-gray-600">
              Envie seus documentos: CRLV, auto de infração e CNH (se tiver).
              Sem CNH? Podemos ajudar também.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Gere Automaticamente</h3>
            <p className="text-lg text-gray-600">
              Nossa tecnologia analisa seus documentos e cria um recurso
              personalizado com argumentos jurídicos sólidos.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Send className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Baixe e Envie</h3>
            <p className="text-lg text-gray-600">
              Receba seu recurso em PDF profissional pronto para envio
              ao órgão responsável.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Planos Simples
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Gratuito */}
            <Card className="relative text-center">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <div className="text-4xl font-bold text-gray-900">R$ 0</div>
                <p className="text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-gray-600 mb-8">Perfeito para testar</p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>2 recursos por mês</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>PDF profissional</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Suporte básico</span>
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button className="w-full py-3">
                    Começar Grátis
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Básico */}
            <Card className="relative text-center border-2 border-blue-500 shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Básico</CardTitle>
                <div className="text-4xl font-bold text-gray-900">R$ 29</div>
                <p className="text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-gray-600 mb-8">Para uso regular</p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>10 recursos por mês</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Histórico completo</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Envio por email</span>
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700">
                    Escolher Básico
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profissional */}
            <Card className="relative text-center">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Profissional</CardTitle>
                <div className="text-4xl font-bold text-gray-900">R$ 79</div>
                <p className="text-gray-500">/mês</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-center text-gray-600 mb-8">Para profissionais</p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>50 recursos por mês</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Suporte 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Múltiplos usuários</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Templates avançados</span>
                  </li>
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button variant="outline" className="w-full py-3">
                    Escolher Profissional
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para Resolver Sua Multa?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Junte-se a milhares de motoristas que já economizaram tempo e dinheiro
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="secondary"
              className="px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl font-medium"
            >
              Criar Meu Primeiro Recurso
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Aptus</span>
            </div>
            <div className="text-center md:text-right text-gray-600">
              <p className="text-sm">&copy; 2024 Aptus. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
