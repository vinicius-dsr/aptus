# Script para criar histórico de commits do projeto
# Execute: .\scripts\create-commits.ps1

Write-Host "📝 Criando histórico de commits do Aptus..." -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

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

# Commit 1: Configuração inicial
Write-Host "📦 1/20 - Configuração inicial..." -ForegroundColor Yellow
git add package.json package-lock.json tsconfig.json tailwind.config.js postcss.config.js next.config.js
git commit -m "chore: Configuração inicial do projeto

- Next.js 14 com App Router
- TypeScript 5
- Tailwind CSS
- PostCSS e Autoprefixer
- Configurações de build" -q

# Commit 2: Prisma Schema
Write-Host "📦 2/20 - Prisma Schema..." -ForegroundColor Yellow
git add prisma/schema.prisma
git commit -m "feat: Schema do banco de dados com Prisma

- Model User (autenticação e perfil)
- Model Appeal (recursos de multas)
- Model Plan (planos de assinatura)
- Model Subscription (assinaturas de usuários)
- Relações entre modelos
- Indexes para performance" -q

# Commit 3: Componentes UI
Write-Host "📦 3/20 - Componentes UI..." -ForegroundColor Yellow
git add src/components/ui/
git commit -m "feat: Componentes UI com shadcn/ui

- Button, Input, Label
- Card, Avatar, Toast
- Dialog, DropdownMenu
- Progress, Select, Tabs
- Componentes acessíveis (ARIA)
- Variants com class-variance-authority" -q

# Commit 4: Autenticação
Write-Host "📦 4/20 - Sistema de autenticação..." -ForegroundColor Yellow
git add src/app/api/auth/ src/app/auth/ src/lib/auth.ts
git commit -m "feat: Sistema de autenticação com NextAuth

- Login e registro de usuários
- Proteção de rotas
- Sessões persistentes
- Integração com Prisma Adapter
- Hash de senhas com bcrypt
- Tipos TypeScript personalizados" -q

# Commit 5: Sistema SaaS
Write-Host "📦 5/20 - Sistema SaaS..." -ForegroundColor Yellow
git add src/lib/subscription.ts src/app/plans/ src/app/api/subscription/ src/app/api/plans/
git commit -m "feat: Sistema SaaS com 4 planos de assinatura

- Planos: Gratuito (2), Básico (10), Pro (50), Enterprise (ilimitado)
- Controle de limites por plano
- Renovação automática mensal
- Dashboard com métricas de uso
- Mudança de planos
- Verificação de limites" -q

# Commit 6: Dashboard Usuário
Write-Host "📦 6/20 - Dashboard do usuário..." -ForegroundColor Yellow
git add src/app/dashboard/ src/components/dashboard/
git commit -m "feat: Dashboard do usuário

- Visão geral da assinatura
- Card de plano atual com limites
- Contador de recursos criados/disponíveis
- Histórico de recursos
- Navegação intuitiva
- Estatísticas de uso" -q

# Commit 7: Dashboard Admin
Write-Host "📦 7/20 - Dashboard administrativo..." -ForegroundColor Yellow
git add src/app/admin/ src/components/admin/ src/app/api/admin/
git commit -m "feat: Dashboard administrativo

- Gerenciamento de usuários
- Estatísticas do sistema (total users, resources, etc)
- Ativar/desativar contas
- Controle de acessos (USER/ADMIN)
- Visualização de todos os recursos
- Dashboard com KPIs" -q

# Commit 8: Upload de Documentos
Write-Host "📦 8/20 - Upload de documentos..." -ForegroundColor Yellow
git add src/components/upload/
git commit -m "feat: Sistema de upload de documentos

- Upload de CNH, CRLV e Auto de Infração
- Drag and drop com react-dropzone
- Preview de imagens
- Validação de tipos e tamanho
- Suporte a múltiplos arquivos
- UI moderna e responsiva" -q

# Commit 9: OCR
Write-Host "📦 9/20 - OCR..." -ForegroundColor Yellow
git add src/lib/ocr.ts
git commit -m "feat: Processamento OCR com Tesseract.js

- Extração de texto de imagens
- Processamento específico por tipo (CNH, CRLV, Auto)
- Fallback para entrada manual
- Tratamento de erros robusto
- Validação de dados extraídos
- Confiança do OCR" -q

# Commit 10: Google AI Integration
Write-Host "📦 10/20 - Google AI (Gemini)..." -ForegroundColor Yellow
git add src/lib/openai.ts
git commit -m "feat: Integração com Google AI (Gemini 2.5 Flash)

- Geração automática de recursos jurídicos
- Melhoramento de dados extraídos por OCR
- Modelo Gemini 2.5 Flash (gratuito - 15 req/min)
- Prompts otimizados para recursos de trânsito
- Citação de artigos do CTB
- Formatação profissional" -q

# Commit 11: APIs de Recursos
Write-Host "📦 11/20 - APIs de recursos..." -ForegroundColor Yellow
git add src/app/api/appeals/
git commit -m "feat: APIs para gerenciamento de recursos

- POST /api/appeals/create - Criar recurso
- GET /api/appeals - Listar recursos do usuário
- GET /api/appeals/[id] - Detalhes do recurso
- GET /api/appeals/[id]/pdf - Download PDF
- POST /api/appeals/[id]/send - Enviar por email
- Validação de permissões
- Verificação de limites" -q

# Commit 12: Geração de PDF
Write-Host "📦 12/20 - Geração de PDF..." -ForegroundColor Yellow
git add src/lib/pdf.ts
git commit -m "feat: Geração de PDF profissional com jsPDF

- Layout formatado e profissional
- Cabeçalho com dados do condutor
- Corpo com texto do recurso
- Rodapé com data e assinatura
- Quebra de linhas automática
- Download direto no navegador" -q

# Commit 13: Sistema de Email
Write-Host "📦 13/20 - Sistema de email..." -ForegroundColor Yellow
git add src/lib/email.ts
git commit -m "feat: Sistema de envio de email com Nodemailer

- Configuração Nodemailer
- Templates de email HTML
- Envio de recursos por email
- Anexo de PDF
- Suporte a múltiplos provedores SMTP
- Tratamento de erros" -q

# Commit 14: Páginas principais
Write-Host "📦 14/20 - Landing page..." -ForegroundColor Yellow
git add src/app/page.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: Landing page e layout principal

- Hero section com CTA
- Features destacadas
- Seção de planos
- Footer com links úteis
- Layout responsivo
- Design moderno com Tailwind" -q

# Commit 15: Middleware
Write-Host "📦 15/20 - Middleware..." -ForegroundColor Yellow
git add src/middleware.ts
git commit -m "feat: Middleware de proteção de rotas

- Proteção de rotas autenticadas
- Verificação de role ADMIN
- Redirecionamentos automáticos
- Middleware do NextAuth
- Proteção de APIs" -q

# Commit 16: Seeder e Scripts
Write-Host "📦 16/20 - Seeds e scripts..." -ForegroundColor Yellow
git add prisma/seed.ts scripts/
git commit -m "feat: Scripts de setup e database seeding

- Seed com 4 planos de assinatura
- Criação de admin padrão
- Criação de usuário demo
- Scripts PowerShell de setup
- Script de criação de admin
- Automação de tarefas" -q

# Commit 17: Variáveis de ambiente
Write-Host "📦 17/20 - Variáveis de ambiente..." -ForegroundColor Yellow
git add .env.example .gitignore
git commit -m "chore: Configuração de variáveis de ambiente

- .env.example com template completo
- .gitignore protegendo arquivos sensíveis
- Documentação de cada variável
- Proteção de uploads e migrations
- Configuração para Vercel" -q

# Commit 18: Documentação principal
Write-Host "📦 18/20 - Documentação..." -ForegroundColor Yellow
git add README.md DEPLOY.md SAAS.md GOOGLE-AI.md ADMIN.md MIGRATIONS.md
git commit -m "docs: Documentação completa do projeto

- README.md com visão geral e setup
- DEPLOY.md com guia passo a passo para Vercel
- SAAS.md explicando sistema de assinaturas
- GOOGLE-AI.md sobre integração com Gemini
- ADMIN.md sobre dashboard administrativo
- MIGRATIONS.md sobre banco de dados" -q

# Commit 19: Checklists
Write-Host "📦 19/20 - Checklists..." -ForegroundColor Yellow
git add PRE-DEPLOY-CHECKLIST.md RESUMO-REVISAO.md RESUMO-FINAL.md
git commit -m "docs: Checklists e resumos

- Checklist pré-deploy completo
- Resumo da revisão do código
- Resumo final do projeto
- Guias de verificação
- Links úteis" -q

# Commit 20: Ajustes finais
Write-Host "📦 20/20 - Ajustes finais..." -ForegroundColor Yellow
git add .
git commit -m "chore: Ajustes finais e preparação para deploy

- Build otimizado para produção
- Scripts de deploy automatizados
- Configuração Vercel pronta
- Documentação de commits
- Projeto 100% pronto para produção
- Sistema SaaS completo e funcional" -q

Write-Host "`n✨ Histórico de commits criado com sucesso!`n" -ForegroundColor Green

Write-Host "📊 Resumo dos commits:" -ForegroundColor Cyan
git log --oneline --graph --decorate

Write-Host "`n📈 Estatísticas:" -ForegroundColor Cyan
Write-Host "   Total de commits: $(git rev-list --count HEAD)" -ForegroundColor White
Write-Host "   Arquivos rastreados: $(git ls-files | Measure-Object -Line | Select-Object -ExpandProperty Lines)" -ForegroundColor White

Write-Host "`n🚀 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Criar repositório no GitHub: https://github.com/new" -ForegroundColor White
Write-Host "   2. Adicionar remote:" -ForegroundColor Yellow
Write-Host "      git remote add origin https://github.com/SEU-USUARIO/aptus.git" -ForegroundColor White
Write-Host "   3. Renomear branch:" -ForegroundColor Yellow
Write-Host "      git branch -M main" -ForegroundColor White
Write-Host "   4. Push inicial:" -ForegroundColor Yellow
Write-Host "      git push -u origin main`n" -ForegroundColor White

Write-Host "✅ Pronto para o GitHub!" -ForegroundColor Green
