# ⚙️ Configuração do Projeto - Passo a Passo

## ✅ Status Atual

- ✅ **NEXTAUTH_SECRET gerado e configurado**
- ✅ **Schema do Prisma atualizado para Supabase**
- ✅ **Arquivo .env criado**
- ⏳ **Falta: Executar comandos do banco de dados**

---

## 🚀 Próximos Passos

### 1️⃣ Verificar o arquivo `.env`

Abra o arquivo `.env` e confirme que tem:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.ijhplagtzsmgwwdvcqyv:churrasco@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.ijhplagtzsmgwwdvcqyv:churrasco@aws-1-sa-east-1.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sISFj/RgzZMXhuyi5ZFX7IzDyPt0Nw1f24RaJcps+0Y="

# Google AI Studio (Gemini)
GOOGLE_AI_KEY="AIzaSyAB2mxYwnuaEk5eYDJ7z3kon2c-17LOnt0"

# Email (configure com suas credenciais)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASSWORD="sua-senha-de-app"
EMAIL_FROM="Aptus <seu-email@gmail.com>"
```

⚠️ **IMPORTANTE**: Configure o EMAIL com suas credenciais reais!

---

### 2️⃣ Executar Comandos do Banco de Dados

Abra um novo terminal PowerShell ou CMD na pasta do projeto e execute:

```bash
# 1. Atualizar o banco de dados (criar tabelas)
npx prisma db push

# 2. Gerar o Prisma Client
npx prisma generate

# 3. Criar usuário administrador padrão
npm run db:seed
```

**Credenciais do Admin:**
- Email: `admin@aptus.com`
- Senha: `admin123`

⚠️ Altere a senha após o primeiro login!

---

### 3️⃣ Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔐 Configuração de Email (Gmail)

### Passo 1: Ativar Verificação em 2 Etapas

1. Acesse: https://myaccount.google.com/security
2. Clique em "Verificação em duas etapas"
3. Siga as instruções

### Passo 2: Gerar Senha de App

1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "E-mail" e "Computador Windows"
3. Clique em "Gerar"
4. Copie a senha de 16 caracteres
5. Cole no `.env` em `EMAIL_PASSWORD`

### Passo 3: Atualizar .env

```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # ← Senha de app gerada
EMAIL_FROM="Aptus <seu-email@gmail.com>"
```

---

## 📊 Comandos Resumidos

```bash
# Configuração inicial (executar nesta ordem)
npx prisma db push          # Criar tabelas no banco
npx prisma generate         # Gerar Prisma Client
npm run db:seed             # Criar admin padrão

# Desenvolvimento
npm run dev                 # Iniciar servidor

# Administração
npm run admin:create        # Criar admin personalizado
npx prisma studio           # Ver dados visualmente

# Úteis
npm install                 # Instalar dependências
npm run build               # Build para produção
```

---

## ✅ Checklist de Configuração

- [ ] Node.js instalado (v18+)
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado e configurado
- [ ] NEXTAUTH_SECRET gerado (✅ feito automaticamente)
- [ ] Banco de dados Supabase configurado (✅ já configurado)
- [ ] OpenAI API Key configurada (✅ já configurada)
- [ ] Email configurado (⚠️ configure suas credenciais)
- [ ] `npx prisma db push` executado
- [ ] `npx prisma generate` executado
- [ ] `npm run db:seed` executado
- [ ] `npm run dev` rodando

---

## 🎯 Testando a Aplicação

### 1. Acesse o login
http://localhost:3000/auth/login

### 2. Entre como admin
- Email: `admin@aptus.com`
- Senha: `admin123`

### 3. Acesse o painel admin
Clique no botão **"Admin"** no menu superior

### 4. Crie um recurso
1. Vá em "Novo Recurso"
2. Envie 3 documentos (CNH, CRLV, Multa)
3. Aguarde o processamento (30-60 segundos)
4. Veja o recurso gerado
5. Baixe o PDF ou envie por email

---

## 🐛 Problemas Comuns

### Erro: "Database connection failed"

**Solução:**
1. Verifique se a `DATABASE_URL` está correta no `.env`
2. Confirme que o Supabase está ativo
3. Tente a conexão direta com `DIRECT_URL`

### Erro: "NEXTAUTH_SECRET is not set"

**Solução:**
```bash
.\scripts\generate-env.ps1
```

### Erro: "OpenAI API Error"

**Solução:**
1. Verifique se a API Key está correta
2. Confirme créditos disponíveis em: https://platform.openai.com/usage
3. Teste a key em: https://platform.openai.com/api-keys

### Erro: "Email sending failed"

**Solução:**
1. Use senha de app do Gmail (não senha normal)
2. Verifique se 2FA está ativo
3. Confira EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD

---

## 📞 Suporte

- **Documentação completa**: Veja `README.md`
- **Sistema de admin**: Veja `ADMIN.md`
- **APIs**: Veja `APIS.md`
- **Arquitetura**: Veja `ARQUITETURA.md`

---

## 🎉 Pronto!

Depois de executar todos os passos acima, sua aplicação estará 100% funcional!

**Última atualização**: Outubro 2024
