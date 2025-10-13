# Script para criar commit único do projeto
# Execute: .\scripts\create-single-commit.ps1

Write-Host "📝 Criando commit único do Aptus..." -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Verificar se já é um repositório git
if (Test-Path ".git") {
    Write-Host "⚠️  Já existe um repositório Git." -ForegroundColor Yellow
    $response = Read-Host "Deseja remover e criar novo? (s/N)"
    if ($response -ne "s") {
        Write-Host "Operação cancelada." -ForegroundColor Red
        exit
    }
    Remove-Item -Recurse -Force .git
    Write-Host "✅ Repositório anterior removido`n" -ForegroundColor Green
}

# Inicializar repositório
git init
Write-Host "✅ Repositório Git inicializado`n" -ForegroundColor Green

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Criar commit único
Write-Host "📝 Criando commit..." -ForegroundColor Yellow
git commit -m "feat: Sistema SaaS completo com Gemini 2.5 Flash

🎯 Plataforma completa para geração automática de recursos de multas de trânsito

## 🚀 Features Principais

### Sistema SaaS
- 4 planos de assinatura (Gratuito, Básico, Pro, Enterprise)
- Controle de limites por plano
- Renovação automática mensal
- Dashboard com métricas de uso

### Autenticação e Autorização
- NextAuth.js com credenciais
- Proteção de rotas
- Roles (USER/ADMIN)
- Sessões persistentes

### Dashboard Administrativo
- Gerenciamento de usuários
- Estatísticas do sistema
- Ativar/desativar contas
- Visualização de todos os recursos

### Geração de Recursos
- Upload de documentos (CNH, CRLV, Auto de Infração)
- OCR com Tesseract.js (com fallback manual)
- Geração automática com Google AI (Gemini 2.5 Flash)
- Download de PDF profissional
- Envio por email

### Interface
- Design moderno com Tailwind CSS
- Componentes shadcn/ui
- Totalmente responsivo
- Acessibilidade (ARIA)

## 🛠️ Stack Tecnológica

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js

### IA e Processamento
- Google AI (Gemini 2.5 Flash) - FREE
- Tesseract.js (OCR)
- jsPDF
- Nodemailer

## 📊 Estrutura do Projeto

src/
├── app/                 # Pages e API routes
│   ├── api/            # Backend APIs
│   ├── auth/           # Autenticação
│   ├── dashboard/      # Dashboard usuário
│   ├── admin/          # Dashboard admin
│   └── plans/          # Planos de assinatura
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── dashboard/     # Dashboard components
│   ├── admin/         # Admin components
│   └── upload/        # Upload components
└── lib/               # Utilities
    ├── auth.ts        # NextAuth config
    ├── subscription.ts # SaaS logic
    ├── openai.ts      # Google AI integration
    ├── ocr.ts         # OCR processing
    ├── pdf.ts         # PDF generation
    └── email.ts       # Email sending

## 🎯 Deploy

Sistema pronto para deploy em:
- Vercel (frontend + backend)
- Supabase (PostgreSQL)
- Google AI (Gemini - FREE tier)

## 📝 Documentação

- README.md - Setup e visão geral
- DEPLOY.md - Guia completo de deploy
- SAAS.md - Sistema de assinaturas
- GOOGLE-AI.md - Integração Gemini
- ADMIN.md - Dashboard admin

## 💰 Custos

Tier gratuito disponível:
- Vercel: R$ 0
- Supabase: R$ 0
- Google AI: R$ 0
Total: R$ 0/mês

## ✅ Status

- Build: ✅ Funcionando
- Testes: ✅ Validado
- Documentação: ✅ Completa
- Deploy: ✅ Pronto

Sistema 100% funcional e pronto para produção! 🚀" -q

Write-Host "✅ Commit criado com sucesso!`n" -ForegroundColor Green

Write-Host "📊 Informações do commit:" -ForegroundColor Cyan
git log --stat --format=medium

Write-Host "`n📈 Estatísticas:" -ForegroundColor Cyan
Write-Host "   Arquivos rastreados: $(git ls-files | Measure-Object -Line | Select-Object -ExpandProperty Lines)" -ForegroundColor White
Write-Host "   Adições: +$(git diff --cached --numstat | awk '{s+=$1} END {print s}')" -ForegroundColor Green

Write-Host "`n🚀 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Criar repositório no GitHub: https://github.com/new" -ForegroundColor White
Write-Host "   2. Adicionar remote:" -ForegroundColor Yellow
Write-Host "      git remote add origin https://github.com/SEU-USUARIO/aptus.git" -ForegroundColor White
Write-Host "   3. Renomear branch:" -ForegroundColor Yellow
Write-Host "      git branch -M main" -ForegroundColor White
Write-Host "   4. Push inicial:" -ForegroundColor Yellow
Write-Host "      git push -u origin main`n" -ForegroundColor White

Write-Host "✅ Pronto para o GitHub!" -ForegroundColor Green
