# 🔑 Configuração de APIs

## 1. OpenAI API

### Obter API Key

1. Acesse: https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Dê um nome (ex: "Aptus")
5. Copie a chave (começa com `sk-`)
6. **IMPORTANTE**: Cole no `.env` em `OPENAI_API_KEY`

### Adicionar Créditos

⚠️ **A API não funciona sem créditos!**

1. Acesse: https://platform.openai.com/account/billing
2. Clique em "Add payment method"
3. Adicione um cartão
4. Compre créditos (mínimo $5)
5. Verifique o limite em "Usage limits"

### Custos Estimados

**Modelo GPT-4:**
- Input: $0.03 por 1K tokens
- Output: $0.06 por 1K tokens
- **Custo médio por recurso**: ~$0.10-$0.20

**Modelo GPT-3.5-turbo (alternativa mais barata):**
- Input: $0.0015 por 1K tokens
- Output: $0.002 por 1K tokens
- **Custo médio por recurso**: ~$0.01-$0.02

### Trocar para GPT-3.5 (mais barato)

Em `src/lib/openai.ts`, linha 46, troque:
```typescript
model: 'gpt-4',  // ← Trocar para 'gpt-3.5-turbo'
```

---

## 2. Email SMTP

### Opção A: Gmail (Recomendado para testes)

#### Passo a Passo:

1. **Ativar 2FA:**
   - Acesse: https://myaccount.google.com/security
   - Role até "Verificação em duas etapas"
   - Clique em "Ativar"
   - Siga as instruções

2. **Criar Senha de App:**
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "E-mail" e "Computador Windows"
   - Clique em "Gerar"
   - **Copie a senha de 16 caracteres**

3. **Configurar .env:**
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"  # ← Senha de app
EMAIL_FROM="Aptus <seu-email@gmail.com>"
```

### Opção B: SendGrid (Produção)

1. Crie conta: https://sendgrid.com
2. Crie API Key em: Settings > API Keys
3. Configure:
```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT="587"
EMAIL_USER="apikey"
EMAIL_PASSWORD="SG.sua-api-key"
EMAIL_FROM="noreply@seudominio.com"
```

### Opção C: Mailgun

1. Crie conta: https://mailgun.com
2. Acesse: Sending > Domain settings > SMTP credentials
3. Configure:
```env
EMAIL_HOST="smtp.mailgun.org"
EMAIL_PORT="587"
EMAIL_USER="postmaster@mg.seudominio.com"
EMAIL_PASSWORD="sua-senha"
EMAIL_FROM="noreply@seudominio.com"
```

### Opção D: Outlook/Hotmail

```env
EMAIL_HOST="smtp-mail.outlook.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@outlook.com"
EMAIL_PASSWORD="sua-senha"
EMAIL_FROM="seu-email@outlook.com"
```

---

## 3. PostgreSQL Database

### Opção A: Supabase (Grátis - Recomendado)

1. Acesse: https://supabase.com
2. Crie uma conta
3. Clique em "New Project"
4. Escolha nome, senha e região
5. Aguarde ~2 minutos
6. Vá em: Settings > Database
7. Copie "Connection string" (URI)
8. **IMPORTANTE**: Troque `[YOUR-PASSWORD]` pela senha do passo 4

```env
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.xxxx.supabase.co:5432/postgres"
```

### Opção B: Railway (Grátis)

1. Acesse: https://railway.app
2. Crie conta com GitHub
3. Clique em "New Project"
4. Selecione "Provision PostgreSQL"
5. Clique no banco > Connect > Copie "Postgres Connection URL"

```env
DATABASE_URL="postgresql://postgres:senha@containers-us-west-xx.railway.app:7432/railway"
```

### Opção C: Render (Grátis)

1. Acesse: https://render.com
2. Crie conta
3. Dashboard > New > PostgreSQL
4. Copie "External Database URL"

### Opção D: Local (Windows)

1. Baixe: https://www.postgresql.org/download/windows/
2. Instale (anote a senha)
3. Abra "pgAdmin 4"
4. Crie database "aptus"
5. Configure:

```env
DATABASE_URL="postgresql://postgres:sua-senha@localhost:5432/aptus"
```

---

## 4. Verificação de Configuração

Execute este comando para verificar tudo:

```bash
npm run dev
```

### Checklist de APIs:

- [ ] ✅ OpenAI API Key configurada
- [ ] ✅ OpenAI com créditos disponíveis
- [ ] ✅ Email SMTP configurado e testado
- [ ] ✅ PostgreSQL rodando e acessível
- [ ] ✅ Todas variáveis no `.env`

---

## 🧪 Testar APIs Individualmente

### Testar OpenAI:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Testar Email (Node.js):

Crie `test-email.js`:
```javascript
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha-de-app'
  }
});

transport.sendMail({
  from: 'seu-email@gmail.com',
  to: 'seu-email@gmail.com',
  subject: 'Teste',
  text: 'Funcionou!'
}).then(() => console.log('✅ Email enviado!'))
  .catch(err => console.error('❌ Erro:', err));
```

Execute: `node test-email.js`

### Testar PostgreSQL:

```bash
npx prisma db push
npx prisma studio
```

---

## 💰 Custos Mensais Estimados

### Uso Leve (10 recursos/mês):
- OpenAI GPT-4: ~$2
- OpenAI GPT-3.5: ~$0.20
- Supabase: Grátis
- Vercel: Grátis
- **Total**: ~$2/mês

### Uso Médio (100 recursos/mês):
- OpenAI GPT-4: ~$20
- OpenAI GPT-3.5: ~$2
- Supabase: Grátis
- Vercel: Grátis
- **Total**: ~$20/mês

### Uso Alto (1000 recursos/mês):
- OpenAI GPT-4: ~$200
- OpenAI GPT-3.5: ~$20
- Supabase: ~$25/mês
- Vercel Pro: ~$20/mês
- **Total**: ~$245/mês (GPT-4) ou ~$65/mês (GPT-3.5)

---

## 🔒 Segurança

⚠️ **NUNCA compartilhe suas API keys!**

- Não commite o arquivo `.env`
- Use variáveis de ambiente na produção
- Rotacione keys regularmente
- Monitore uso em: https://platform.openai.com/usage

---

## 📞 Suporte das APIs

- **OpenAI**: https://help.openai.com
- **Supabase**: https://supabase.com/docs
- **Gmail**: https://support.google.com/mail
- **SendGrid**: https://docs.sendgrid.com
