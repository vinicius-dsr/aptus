# 🎯 Aptus - Plataforma SaaS de Recursos Automatizados

Plataforma completa **SaaS** para geração automática de recursos de multas de trânsito com IA (Gemini 2.5 Flash), sistema de assinaturas e dashboard administrativo.

## 🚀 Funcionalidades

### 💼 SaaS Completo
- 💳 **4 planos de assinatura** (Gratuito, Básico, Pro, Enterprise)
- 📊 **Controle de limites** por plano
- 🔄 **Renovação automática** mensal
- 📈 **Dashboard com métricas** de uso

### 🛡️ Sistema Administrativo
- 👥 **Gerenciamento de usuários** (ativar/desativar)
- 📊 **Estatísticas gerais** do sistema
- 🔍 **Visualização de todos os recursos**
- 👨‍💼 **Controle de acessos** (USER/ADMIN)

### 🤖 Geração de Recursos
- 📤 **Upload de documentos** (CNH, CRLV, Auto de Infração)
- 🔍 **OCR automático** com Tesseract.js
- 🤖 **Geração com Gemini 2.5 Flash** (Google AI - FREE)
- 📄 **Geração de PDF** profissional
- 📧 **Envio automático por email**
- 📚 **Histórico completo** de recursos

### 🎨 Interface Moderna
- 🎨 **UI moderna** com Tailwind CSS + shadcn/ui
- 📱 **Responsiva** (mobile-first)
- ⚡ **Performance otimizada**

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (componentes)
- **Lucide Icons**
- **react-dropzone** (upload de arquivos)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**
- **NextAuth.js** (autenticação)
- **bcryptjs** (hash de senhas)

### IA e Processamento
- **Google AI (Gemini 2.5 Flash)** - Geração de textos (FREE)
- **Tesseract.js** - OCR (com fallback manual)
- **jsPDF** - Geração de PDF
- **Nodemailer** - Envio de emails

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL (ou Supabase)
- Google AI Studio (API Key - FREE)
- Servidor SMTP (Gmail, SendGrid, etc.)

## ⚙️ Instalação

### 1. Clone e instale dependências

```bash
cd aptus
npm install
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha:

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/aptus"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"

# Google AI Studio (Gemini)
GOOGLE_AI_KEY="sua-chave-aqui"

# Email (exemplo Gmail)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASSWORD="sua-senha-de-app"
EMAIL_FROM="Aptus <seu-email@gmail.com>"
```

### 3. Configure o banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas
npx prisma db push

# (Opcional) Abrir Prisma Studio
npx prisma studio
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## 📧 Configuração de Email

### Gmail
1. Ative a verificação em 2 etapas
2. Gere uma "Senha de App" em: https://myaccount.google.com/apppasswords
3. Use essa senha no `EMAIL_PASSWORD`

### Outros provedores
- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailgun**: `smtp.mailgun.org:587`
- **AWS SES**: Configure conforme documentação

## 🗄️ Estrutura do Banco de Dados

```prisma
User          - Usuários do sistema
Appeal        - Recursos de multas
Account       - Contas OAuth (NextAuth)
Session       - Sessões ativas
```

## 🔄 Fluxo de Uso

1. **Cadastro/Login** → Usuário cria conta ou faz login
2. **Upload** → Envia CNH, CRLV e auto de infração
3. **Processamento** → Sistema extrai dados com OCR
4. **IA** → GPT-4 gera recurso personalizado
5. **Visualização** → Usuário revisa o recurso gerado
6. **Download/Envio** → Baixa PDF ou envia por email

## 💼 Setup do Sistema SaaS

```bash
# Setup completo (migrations + planos + admin)
.\scripts\setup-saas.ps1

# Isso cria:
# - Tabelas de planos e assinaturas
# - 4 planos (Gratuito, Básico, Pro, Enterprise)
# - Admin: admin@aptus.com / admin123
# - Demo:  demo@aptus.com / demo123
```

Veja **SAAS.md** para documentação completa do sistema SaaS.

## 🔐 Sistema de Administradores

```bash
# Criar admin adicional
npm run admin:create
```

Veja **ADMIN.md** para documentação completa.

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── api/              # API Routes
│   ├── auth/             # Páginas de autenticação
│   ├── dashboard/        # Dashboard do usuário
│   ├── admin/            # Painel administrativo
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # Componentes shadcn/ui
│   └── dashboard/        # Componentes do dashboard
├── lib/
│   ├── auth.ts           # Configuração NextAuth
│   ├── admin.ts          # Helpers admin
│   ├── prisma.ts         # Cliente Prisma
│   ├── ocr.ts            # Processamento OCR
│   ├── openai.ts         # Integração OpenAI
│   ├── pdf.ts            # Geração de PDF
│   └── email.ts          # Envio de emails
└── types/                # TypeScript types
```

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT com NextAuth
- Validação de sessão em rotas protegidas
- Sanitização de inputs com Zod
- Uploads limitados e validados

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure variáveis de ambiente no dashboard
```

### Docker (Opcional)

```dockerfile
# Dockerfile já pode ser criado se necessário
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
```

## 📊 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint

# Banco de dados
npm run db:push          # Atualizar schema
npm run db:seed          # Criar admin padrão

# SaaS Setup
.\scripts\setup-saas.ps1  # Setup completo do SaaS

# Administradores
npm run admin:create      # Criar admin adicional

# Prisma Studio (visualizar banco)
npx prisma studio

# Resetar banco de dados
npx prisma db push --force-reset
```

## 🐛 Troubleshooting

### Erro de OCR
- Certifique-se que as imagens estão legíveis
- Tesseract funciona melhor com imagens de alta qualidade
- Considere usar Google Vision API para melhor precisão

### Erro Google AI
- Verifique se a API Key está correta
- Modelo deve ser: `gemini-2.5-flash`
- Chave gratuita: https://aistudio.google.com/app/apikey

### Erro de Email
- Confirme credenciais SMTP
- Para Gmail, use senha de app (não senha normal)
- Verifique firewall/portas (587 ou 465)

## 🚀 Deploy em Produção

### Deploy Rápido (Vercel + Supabase)

```bash
# 1. Preparar projeto
.\scripts\prepare-deploy.ps1

# 2. Push para GitHub
git init
git add .
git commit -m "feat: Sistema completo"
git push origin main

# 3. Deploy na Vercel
# - Importar repositório do GitHub
# - Configurar variáveis de ambiente (ver .env.example)
# - Deploy automático!
```

### Variáveis de Ambiente Necessárias

Ver arquivo `.env.example` e documentação completa em **`DEPLOY.md`**

### Documentação Detalhada

- **`DEPLOY.md`** - Guia completo de deploy
- **`PRE-DEPLOY-CHECKLIST.md`** - Checklist de verificação
- **`.env.example`** - Template de variáveis

## 📝 TODO / Melhorias Futuras

- [ ] Suporte a múltiplos idiomas
- [ ] Template de recursos customizáveis
- [ ] Integração com APIs de DETRANs
- [ ] Assinatura digital de PDFs
- [ ] Notificações push
- [ ] Painel administrativo
- [ ] Analytics e relatórios
- [ ] Suporte a Google Vision API (OCR melhor)
- [ ] Upload para Supabase Storage
- [ ] Testes automatizados

## 📄 Licença

MIT License - Sinta-se livre para usar em projetos pessoais e comerciais.

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças grandes, abra uma issue primeiro.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Next.js, OpenAI e Prisma**
