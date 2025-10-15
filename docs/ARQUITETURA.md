# 🏗️ Arquitetura do Sistema Aptus

## 📊 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIO                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │  Landing   │  │   Login/   │  │    Dashboard       │   │
│  │    Page    │  │  Register  │  │  (Upload/View)     │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                API ROUTES (Next.js)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Auth API  │  │  Appeals API │  │   Email/PDF API  │  │
│  │ (NextAuth)  │  │  (CRUD)      │  │   (Generation)   │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└──────┬────────────────┬────────────────────┬────────────────┘
       │                │                    │
       ▼                ▼                    ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│  PostgreSQL  │  │   Tesseract  │  │      OpenAI GPT-4    │
│   (Prisma)   │  │     (OCR)    │  │  (Text Generation)   │
└──────────────┘  └──────────────┘  └──────────────────────┘
       │                                     │
       ▼                                     ▼
┌──────────────┐                    ┌──────────────────────┐
│  File System │                    │      jsPDF           │
│   (Uploads)  │                    │  (PDF Generation)    │
└──────────────┘                    └──────────────────────┘
                                             │
                                             ▼
                                    ┌──────────────────────┐
                                    │     Nodemailer       │
                                    │   (Email Sending)    │
                                    └──────────────────────┘
```

## 🔄 Fluxo de Dados

### 1. Autenticação

```typescript
User → Login Form → /api/auth/[...nextauth]
                     ↓
              NextAuth verifica credenciais
                     ↓
              Busca user no PostgreSQL (Prisma)
                     ↓
              Gera JWT token
                     ↓
              Retorna session para o cliente
```

### 2. Criação de Recurso

```typescript
User → Upload 3 Files → /api/appeals/create
                         ↓
                   Salva arquivos no filesystem
                         ↓
                   Processa cada arquivo com OCR (Tesseract)
                         ↓
                   Extrai dados (regex parsing)
                         ↓
                   Envia dados para GPT-4 (OpenAI)
                         ↓
                   GPT-4 gera texto do recurso
                         ↓
                   Salva no PostgreSQL
                         ↓
                   Retorna appealId
                         ↓
                   Redireciona para /dashboard/appeals/[id]
```

### 3. Geração de PDF

```typescript
User → Clica "Baixar PDF" → /api/appeals/[id]/pdf
                              ↓
                        Busca appeal no PostgreSQL
                              ↓
                        Gera PDF com jsPDF
                              ↓
                        Retorna PDF buffer
                              ↓
                        Browser faz download
```

### 4. Envio de Email

```typescript
User → Insere email → /api/appeals/[id]/send
       Clica "Enviar"    ↓
                    Busca appeal no PostgreSQL
                         ↓
                    Gera PDF com jsPDF
                         ↓
                    Cria email com Nodemailer
                         ↓
                    Anexa PDF
                         ↓
                    Envia via SMTP
                         ↓
                    Atualiza status para "SENT"
                         ↓
                    Retorna sucesso
```

## 📁 Estrutura de Arquivos

```
aptus/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/   # NextAuth handler
│   │   │   │   └── register/        # Registro de usuários
│   │   │   └── appeals/
│   │   │       ├── create/          # Criar recurso (OCR + IA)
│   │   │       ├── [id]/            # Buscar recurso
│   │   │       ├── [id]/pdf/        # Gerar PDF
│   │   │       └── [id]/send/       # Enviar email
│   │   ├── auth/
│   │   │   ├── login/               # Página de login
│   │   │   └── register/            # Página de registro
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Dashboard principal (upload)
│   │   │   ├── history/             # Histórico de recursos
│   │   │   └── appeals/[id]/        # Visualizar recurso
│   │   ├── globals.css              # Estilos globais
│   │   ├── layout.tsx               # Layout root
│   │   ├── page.tsx                 # Landing page
│   │   └── providers.tsx            # Session provider
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   └── dashboard/               # Dashboard components
│   │       ├── DashboardLayout.tsx
│   │       ├── AppealForm.tsx
│   │       └── FileUpload.tsx
│   ├── lib/                         # Bibliotecas e utilitários
│   │   ├── auth.ts                  # Configuração NextAuth
│   │   ├── prisma.ts                # Cliente Prisma
│   │   ├── ocr.ts                   # Processamento OCR
│   │   ├── openai.ts                # Integração OpenAI
│   │   ├── pdf.ts                   # Geração de PDF
│   │   ├── email.ts                 # Envio de email
│   │   └── utils.ts                 # Utilitários gerais
│   ├── types/
│   │   └── next-auth.d.ts           # Types do NextAuth
│   └── middleware.ts                # Middleware de autenticação
├── prisma/
│   └── schema.prisma                # Schema do banco
├── public/
│   └── uploads/                     # Arquivos enviados (gitignored)
├── scripts/
│   ├── init.ps1                     # Script de inicialização
│   └── start.ps1                    # Script para iniciar servidor
├── .env.example                     # Exemplo de variáveis
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── README.md                        # Documentação principal
├── SETUP.md                         # Guia de setup
├── APIS.md                          # Configuração de APIs
└── ARQUITETURA.md                   # Este arquivo
```

## 🗄️ Modelos de Dados (Prisma)

### User
```prisma
id            String   (cuid)
email         String   (unique)
name          String?
password      String?  (hashed)
cpf           String?  (unique)
appeals       Appeal[] (relation)
createdAt     DateTime
updatedAt     DateTime
```

### Appeal
```prisma
id                 String      (cuid)
userId             String      (foreign key)
driverName         String?
driverCpf          String?
vehiclePlate       String?
vehicleRenavam     String?
infractionNumber   String?
infractionDate     DateTime?
infractionCode     String?
agency             String?
cnhDocument        String?     (file path)
crlvDocument       String?     (file path)
infractionDocument String?     (file path)
appealText         String?     (generated text)
appealPdf          String?     (pdf path)
status             AppealStatus (enum)
createdAt          DateTime
updatedAt          DateTime
```

### AppealStatus (Enum)
```
PENDING    - Criado, aguardando processamento
PROCESSING - Em processamento (OCR/IA)
COMPLETED  - Processado e pronto
SENT       - Enviado por email
ERROR      - Erro no processamento
```

## 🔧 Tecnologias e Responsabilidades

| Tecnologia | Responsabilidade |
|------------|------------------|
| **Next.js 14** | Framework principal, SSR, routing |
| **React 18** | UI components, interatividade |
| **TypeScript** | Type safety, IntelliSense |
| **Tailwind CSS** | Styling, design system |
| **shadcn/ui** | Componentes UI prontos |
| **Prisma** | ORM, migrations, type-safe queries |
| **PostgreSQL** | Banco de dados relacional |
| **NextAuth.js** | Autenticação, sessões, JWT |
| **bcryptjs** | Hash de senhas |
| **Tesseract.js** | OCR (reconhecimento de texto) |
| **OpenAI** | Geração de texto com IA |
| **jsPDF** | Geração de PDF |
| **Nodemailer** | Envio de emails |
| **react-dropzone** | Upload de arquivos |
| **Zod** | Validação de schemas |

## 🔐 Segurança

### Autenticação
- Senhas hasheadas com bcrypt (10 rounds)
- JWT tokens com expiração
- Middleware protege rotas /dashboard/*
- Session stored server-side

### Validação
- Zod valida todos os inputs
- Type-safe com TypeScript
- Sanitização de uploads
- CORS configurado

### Storage
- Arquivos salvos fora de public/ (exceto uploads)
- .env não commitado
- API keys em variáveis de ambiente
- Database queries parametrizadas (Prisma)

## 🚀 Performance

### Otimizações
- Next.js Image optimization
- Static generation para landing page
- API Routes edge-ready
- Database indexing (Prisma)
- React Server Components
- Lazy loading de componentes

### Caching
- Next.js automatic caching
- Database connection pooling
- Static assets CDN-ready

## 📈 Escalabilidade

### Horizontal Scaling
- Stateless API Routes
- Database em serviço separado
- File storage pode migrar para S3/Supabase Storage
- Queue system pode ser adicionado (Bull/Redis)

### Vertical Scaling
- OCR pode usar workers
- IA pode ter rate limiting
- Email pode usar queue
- Database read replicas

## 🧪 Testing Strategy (Futuro)

```
Unit Tests:
- lib/ functions (OCR parsing, PDF generation)
- Componentes React

Integration Tests:
- API Routes
- Database operations

E2E Tests:
- Fluxo completo de criação de recurso
- Playwright/Cypress
```

## 📊 Monitoramento (Futuro)

```
Logging:
- Winston/Pino para logs estruturados
- Log levels (error, warn, info, debug)

Metrics:
- OpenAI API usage
- Database query performance
- Email delivery rate

Alerting:
- Erros críticos
- Quota exceeded
- Database down
```

## 🔄 CI/CD (Futuro)

```yaml
# GitHub Actions example
on: [push]
jobs:
  test:
    - npm install
    - npm run lint
    - npm run build
    - npx prisma generate
  deploy:
    - Deploy to Vercel
    - Run migrations
```

---

**Documentação criada em**: Outubro 2024  
**Versão**: 1.0.0
