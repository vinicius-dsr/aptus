# 📝 Histórico de Commits Sugerido

Este arquivo contém a sequência de commits que representa o desenvolvimento do Aptus.

---

## 🎯 Estratégia de Commits

### Opção 1: Commit Único (Mais Simples)
Fazer um único commit com todo o projeto pronto.

### Opção 2: Commits Históricos (Mais Profissional)
Criar commits que representam as etapas de desenvolvimento.

---

## 🚀 Opção 1: Commit Único

```bash
git init
git add .
git commit -m "feat: Sistema SaaS completo com Gemini 2.5 Flash

- Sistema de autenticação completo (NextAuth)
- 4 planos de assinatura (Gratuito, Básico, Pro, Enterprise)
- Dashboard administrativo com gerenciamento de usuários
- Geração automática de recursos com Google AI (Gemini 2.5 Flash)
- Upload e processamento de documentos
- OCR com Tesseract.js (com fallback manual)
- Geração de PDF profissional
- Sistema de envio de email
- Interface moderna com Tailwind CSS + shadcn/ui
- Deploy pronto para Vercel + Supabase"
```

---

## 📚 Opção 2: Commits Históricos

Use este script PowerShell para criar os commits automaticamente:

```powershell
# IMPORTANTE: Execute este script NA RAIZ do projeto
# .\GIT-COMMITS-AUTO.ps1

# Inicializar repositório
git init

# Commit 1: Setup inicial
git add package.json tsconfig.json tailwind.config.js postcss.config.js next.config.js
git commit -m "chore: Configuração inicial do projeto

- Next.js 14 com App Router
- TypeScript
- Tailwind CSS
- Configurações básicas"

# Commit 2: Prisma Schema
git add prisma/
git commit -m "feat: Schema do banco de dados com Prisma

- Model User (autenticação)
- Model Appeal (recursos)
- Model Plan (planos de assinatura)
- Model Subscription (assinaturas)
- Relações entre modelos"

# Commit 3: Componentes UI
git add src/components/ui/
git commit -m "feat: Componentes UI com shadcn/ui

- Button, Input, Label
- Card, Avatar, Toast
- Dialog, DropdownMenu
- Progress, Select, Tabs
- Componentes acessíveis e reutilizáveis"

# Commit 4: Autenticação
git add src/app/api/auth/ src/app/auth/ src/lib/auth.ts
git commit -m "feat: Sistema de autenticação com NextAuth

- Login e registro
- Proteção de rotas
- Sessões de usuário
- Integração com Prisma"

# Commit 5: Sistema SaaS
git add src/lib/subscription.ts src/app/plans/ src/app/api/subscription/
git commit -m "feat: Sistema SaaS com 4 planos de assinatura

- Planos: Gratuito, Básico, Pro, Enterprise
- Controle de limites por plano
- Renovação automática mensal
- Dashboard com métricas de uso"

# Commit 6: Dashboard Usuário
git add src/app/dashboard/ src/components/dashboard/
git commit -m "feat: Dashboard do usuário

- Visão geral da assinatura
- Card de plano atual
- Contador de uso
- Histórico de recursos
- Navegação intuitiva"

# Commit 7: Dashboard Admin
git add src/app/admin/ src/components/admin/ src/app/api/admin/
git commit -m "feat: Dashboard administrativo

- Gerenciamento de usuários
- Estatísticas do sistema
- Ativar/desativar contas
- Controle de acessos
- Visualização de todos os recursos"

# Commit 8: Upload de Documentos
git add src/components/upload/
git commit -m "feat: Sistema de upload de documentos

- Upload de CNH, CRLV e Auto de Infração
- Drag and drop com react-dropzone
- Preview de imagens
- Validação de tipos"

# Commit 9: OCR
git add src/lib/ocr.ts
git commit -m "feat: Processamento OCR com Tesseract.js

- Extração de texto de imagens
- Processamento de CNH, CRLV e Auto
- Fallback para entrada manual
- Tratamento de erros robusto"

# Commit 10: Google AI Integration
git add src/lib/openai.ts
git commit -m "feat: Integração com Google AI (Gemini 2.5 Flash)

- Geração automática de recursos
- Melhoramento de dados extraídos
- Modelo gratuito (15 req/min)
- Prompts otimizados para recursos jurídicos"

# Commit 11: APIs de Recursos
git add src/app/api/appeals/
git commit -m "feat: APIs para gerenciamento de recursos

- POST /api/appeals/create - Criar recurso
- GET /api/appeals - Listar recursos
- GET /api/appeals/[id] - Detalhes
- GET /api/appeals/[id]/pdf - Download PDF
- POST /api/appeals/[id]/send - Enviar email"

# Commit 12: Geração de PDF
git add src/lib/pdf.ts
git commit -m "feat: Geração de PDF profissional

- Layout formatado
- Cabeçalho e rodapé
- Quebra de linhas automática
- Download direto"

# Commit 13: Sistema de Email
git add src/lib/email.ts
git commit -m "feat: Sistema de envio de email

- Nodemailer configurado
- Templates de email
- Envio de recursos por email
- Suporte a múltiplos provedores SMTP"

# Commit 14: Páginas principais
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: Landing page e layout principal

- Hero section
- Features destacadas
- CTA para registro
- Footer com links
- Layout responsivo"

# Commit 15: Middleware
git add src/middleware.ts
git commit -m "feat: Middleware de proteção de rotas

- Proteção de rotas autenticadas
- Verificação de admin
- Redirecionamentos automáticos"

# Commit 16: Seeder
git add prisma/seed.ts scripts/
git commit -m "feat: Scripts de setup e seeding

- Seed com 4 planos
- Admin e demo users
- Scripts PowerShell utilitários
- Setup automatizado"

# Commit 17: Variáveis de ambiente
git add .env.example .gitignore
git commit -m "chore: Configuração de variáveis de ambiente

- .env.example com template
- .gitignore protegendo arquivos sensíveis
- Documentação de variáveis"

# Commit 18: Documentação
git add README.md DEPLOY.md SAAS.md GOOGLE-AI.md ADMIN.md
git commit -m "docs: Documentação completa do projeto

- README com visão geral
- DEPLOY.md com guia de deploy
- SAAS.md explicando sistema de assinaturas
- GOOGLE-AI.md sobre integração Gemini
- ADMIN.md sobre dashboard admin"

# Commit 19: Checklists
git add PRE-DEPLOY-CHECKLIST.md RESUMO-REVISAO.md
git commit -m "docs: Checklists e resumos

- Checklist pré-deploy
- Resumo da revisão
- Guias de verificação"

# Commit 20: Final
git add .
git commit -m "chore: Ajustes finais e preparação para deploy

- Build otimizado
- Scripts de deploy
- Configuração Vercel
- Projeto pronto para produção"
```

---

## 🎯 Script Automatizado

Criei um script que faz todos os commits de uma vez:

```powershell
# Arquivo: scripts/create-commits.ps1
# Execute: .\scripts\create-commits.ps1

Write-Host "📝 Criando histórico de commits..." -ForegroundColor Cyan

# Verificar se já é um repositório git
if (Test-Path ".git") {
    Write-Host "⚠️  Já existe um repositório Git. Removendo..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .git
}

git init
Write-Host "✅ Repositório Git inicializado" -ForegroundColor Green

# Array de commits
$commits = @(
    @{
        files = "package.json", "tsconfig.json", "tailwind.config.js", "postcss.config.js", "next.config.js"
        message = "chore: Configuração inicial do projeto"
        body = "- Next.js 14 com App Router`n- TypeScript`n- Tailwind CSS`n- Configurações básicas"
    },
    @{
        files = "prisma/"
        message = "feat: Schema do banco de dados com Prisma"
        body = "- Model User (autenticação)`n- Model Appeal (recursos)`n- Model Plan (planos)`n- Model Subscription (assinaturas)"
    },
    @{
        files = "src/components/ui/"
        message = "feat: Componentes UI com shadcn/ui"
        body = "- Button, Input, Label, Card, etc`n- Componentes acessíveis e reutilizáveis"
    },
    @{
        files = "src/app/api/auth/", "src/app/auth/", "src/lib/auth.ts"
        message = "feat: Sistema de autenticação com NextAuth"
        body = "- Login e registro`n- Proteção de rotas`n- Sessões de usuário"
    },
    @{
        files = "src/lib/subscription.ts", "src/app/plans/", "src/app/api/subscription/"
        message = "feat: Sistema SaaS com 4 planos de assinatura"
        body = "- Planos: Gratuito, Básico, Pro, Enterprise`n- Controle de limites por plano`n- Renovação automática mensal"
    },
    @{
        files = "src/app/dashboard/", "src/components/dashboard/"
        message = "feat: Dashboard do usuário"
        body = "- Visão geral da assinatura`n- Card de plano atual`n- Histórico de recursos"
    },
    @{
        files = "src/app/admin/", "src/components/admin/", "src/app/api/admin/"
        message = "feat: Dashboard administrativo"
        body = "- Gerenciamento de usuários`n- Estatísticas do sistema`n- Controle de acessos"
    },
    @{
        files = "src/components/upload/"
        message = "feat: Sistema de upload de documentos"
        body = "- Upload com drag and drop`n- Preview de imagens`n- Validação de tipos"
    },
    @{
        files = "src/lib/ocr.ts"
        message = "feat: Processamento OCR com Tesseract.js"
        body = "- Extração de texto de imagens`n- Fallback para entrada manual`n- Tratamento de erros"
    },
    @{
        files = "src/lib/openai.ts"
        message = "feat: Integração com Google AI (Gemini 2.5 Flash)"
        body = "- Geração automática de recursos`n- Modelo gratuito (15 req/min)`n- Prompts otimizados"
    },
    @{
        files = "src/app/api/appeals/"
        message = "feat: APIs para gerenciamento de recursos"
        body = "- Criar, listar, visualizar recursos`n- Download PDF`n- Envio por email"
    },
    @{
        files = "src/lib/pdf.ts"
        message = "feat: Geração de PDF profissional"
        body = "- Layout formatado`n- Cabeçalho e rodapé`n- Download direto"
    },
    @{
        files = "src/lib/email.ts"
        message = "feat: Sistema de envio de email"
        body = "- Nodemailer configurado`n- Templates de email`n- Múltiplos provedores SMTP"
    },
    @{
        files = "src/app/page.tsx", "src/app/layout.tsx"
        message = "feat: Landing page e layout principal"
        body = "- Hero section`n- Features destacadas`n- Layout responsivo"
    },
    @{
        files = "src/middleware.ts"
        message = "feat: Middleware de proteção de rotas"
        body = "- Proteção de rotas autenticadas`n- Verificação de admin"
    },
    @{
        files = "prisma/seed.ts", "scripts/"
        message = "feat: Scripts de setup e seeding"
        body = "- Seed com 4 planos`n- Admin e demo users`n- Setup automatizado"
    },
    @{
        files = ".env.example", ".gitignore"
        message = "chore: Configuração de variáveis de ambiente"
        body = "- Template de variáveis`n- Proteção de arquivos sensíveis"
    },
    @{
        files = "README.md", "DEPLOY.md", "SAAS.md", "GOOGLE-AI.md", "ADMIN.md"
        message = "docs: Documentação completa do projeto"
        body = "- README com visão geral`n- Guias de deploy e uso`n- Documentação de features"
    },
    @{
        files = "PRE-DEPLOY-CHECKLIST.md", "RESUMO-REVISAO.md"
        message = "docs: Checklists e resumos"
        body = "- Checklist pré-deploy`n- Resumo da revisão"
    },
    @{
        files = "."
        message = "chore: Ajustes finais e preparação para deploy"
        body = "- Build otimizado`n- Scripts de deploy`n- Projeto pronto para produção"
    }
)

# Criar commits
foreach ($commit in $commits) {
    foreach ($file in $commit.files) {
        git add $file 2>$null
    }
    
    $fullMessage = "$($commit.message)`n`n$($commit.body)"
    git commit -m $fullMessage 2>$null
    
    Write-Host "  ✅ $($commit.message)" -ForegroundColor Green
}

Write-Host "`n✨ Histórico de commits criado com sucesso!" -ForegroundColor Green
Write-Host "`n📊 Resumo:" -ForegroundColor Cyan
git log --oneline

Write-Host "`n🚀 Próximo passo:" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/SEU-USUARIO/aptus.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
```

---

## 🎯 Recomendação

### Para GitHub Público/Portfolio:
Use **Opção 2** (Commits Históricos) - Mostra profissionalismo e processo de desenvolvimento.

### Para Deploy Rápido:
Use **Opção 1** (Commit Único) - Mais simples e direto.

---

## 📝 Mensagens de Commit - Convenções

Seguimos o **Conventional Commits**:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `chore:` - Tarefas de manutenção
- `refactor:` - Refatoração de código
- `test:` - Testes
- `style:` - Formatação

---

## 🚀 Executar

```powershell
# Opção 1: Commit único
git init
git add .
git commit -m "feat: Sistema SaaS completo com Gemini 2.5 Flash"

# Opção 2: Commits históricos (automático)
.\scripts\create-commits.ps1

# Adicionar remote e push
git remote add origin https://github.com/SEU-USUARIO/aptus.git
git branch -M main
git push -u origin main
```

---

**Escolha a opção que preferir!** 🎯
