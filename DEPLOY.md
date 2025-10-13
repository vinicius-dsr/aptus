# 🚀 Deploy - Vercel + GitHub

## ✅ Checklist Pré-Deploy

### 1. Segurança
- [x] `.env` no `.gitignore` ✅
- [x] `.env.example` criado ✅
- [x] Sem credenciais hardcoded ✅
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] NEXTAUTH_SECRET gerado para produção

### 2. Banco de Dados
- [ ] Supabase configurado
- [ ] DATABASE_URL de produção
- [ ] Migrations aplicadas
- [ ] Seed executado (admin criado)

### 3. Dependências
- [x] package.json atualizado ✅
- [x] @google/generative-ai v0.24.1 ✅
- [x] Sem dependências dev em production ✅

### 4. Código
- [ ] Build local testado
- [ ] Sem console.logs críticos
- [ ] Tratamento de erros OK
- [ ] OCR com fallback ✅

---

## 📋 Passo a Passo - Deploy

### 1. Preparar Repositório GitHub

```bash
# Inicializar git (se não feito)
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: Sistema SaaS completo com Gemini 2.5 Flash"

# Criar repositório no GitHub
# https://github.com/new

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/aptus.git

# Push
git branch -M main
git push -u origin main
```

---

### 2. Configurar Supabase (Banco de Dados)

#### 2.1 Criar Projeto

1. Acesse: https://supabase.com/dashboard
2. **New Project**
3. Nome: `aptus-production`
4. Senha: [gere uma forte]
5. Região: `South America (São Paulo)`
6. **Create Project**

#### 2.2 Obter Credenciais

1. **Settings** → **Database**
2. Copie:
   - **Connection Pooling** (para DATABASE_URL)
   - **Direct Connection** (para DIRECT_URL)

```env
# Exemplo (USE SUAS CREDENCIAIS!)
DATABASE_URL="postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

#### 2.3 Aplicar Migrations

```bash
# Com as credenciais no .env
npx prisma migrate deploy
npx prisma db seed
```

---

### 3. Deploy na Vercel

#### 3.1 Conectar GitHub

1. Acesse: https://vercel.com
2. **New Project**
3. **Import Git Repository**
4. Selecione: `aptus`
5. **Import**

#### 3.2 Configurar Variáveis de Ambiente

Na Vercel, vá em **Settings** → **Environment Variables**

Adicione TODAS essas variáveis:

```env
# Database (Supabase - Produção)
DATABASE_URL=postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:5432/postgres

# NextAuth
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=[GERE UM NOVO - INSTRUÇÕES ABAIXO]

# Google AI (Gemini)
GOOGLE_AI_KEY=sua-chave-google-ai

# Email (Gmail ou outro SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=senha-de-app-do-gmail
EMAIL_FROM=Aptus <seu-email@gmail.com>
```

#### 3.3 Gerar NEXTAUTH_SECRET para Produção

```bash
# No terminal local
openssl rand -base64 32
```

Copie o resultado e cole na variável `NEXTAUTH_SECRET` na Vercel.

#### 3.4 Deploy

1. Clique **Deploy**
2. Aguarde build (~2-3 minutos)
3. ✅ Deploy concluído!

---

## 🔑 Variáveis de Ambiente - Referência

### DATABASE_URL
- **Onde obter**: Supabase → Database Settings → Connection Pooling
- **Formato**: `postgresql://user:password@host:6543/postgres?pgbouncer=true`

### DIRECT_URL
- **Onde obter**: Supabase → Database Settings → Direct Connection
- **Formato**: `postgresql://user:password@host:5432/postgres`

### NEXTAUTH_URL
- **Desenvolvimento**: `http://localhost:3000`
- **Produção**: `https://seu-app.vercel.app`

### NEXTAUTH_SECRET
- **Gerar**: `openssl rand -base64 32`
- **IMPORTANTE**: Use um diferente para produção!

### GOOGLE_AI_KEY
- **Onde obter**: https://aistudio.google.com/app/apikey
- **Modelo usado**: `gemini-2.5-flash` (FREE)

### EMAIL (Opcional)
- **Gmail**: Use "Senha de App" (não a senha normal)
- **Como criar senha de app**: 
  1. Conta Google → Segurança
  2. Verificação em duas etapas (ative)
  3. Senhas de app → Gerar
  4. Use a senha gerada

---

## 🧪 Testar Deploy

### 1. Acessar Site

```
https://seu-app.vercel.app
```

### 2. Criar Admin

```bash
# Conectar no banco de produção
# Ajuste DATABASE_URL no .env local temporariamente
npm run admin:create
```

**Ou use o admin criado pelo seed:**
- Email: `admin@aptus.com`
- Senha: `admin123`
- ⚠️ **ALTERE APÓS PRIMEIRO LOGIN!**

### 3. Testar Fluxo Completo

1. **Cadastro** → Criar conta
2. **Login** → Entrar
3. **Escolher Plano** → Selecionar plano
4. **Criar Recurso**:
   - Upload 3 documentos
   - OCR falha (OK)
   - Digite dados manualmente
   - Gemini gera recurso
   - Download PDF
5. **Dashboard Admin** → Ver usuários

---

## 🔧 Troubleshooting Deploy

### Build Falha

**Erro**: `Prisma Client not generated`

**Solução**: Adicionar em `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Failed

**Erro**: `Can't reach database`

**Soluções**:
1. Verificar `DATABASE_URL` e `DIRECT_URL`
2. Verificar se IP da Vercel está permitido no Supabase
3. Usar Connection Pooling (`pgbouncer=true`)

### NEXTAUTH Error

**Erro**: `No secret provided`

**Solução**: Verificar `NEXTAUTH_SECRET` nas variáveis de ambiente

### Google AI Error

**Erro**: `Invalid API key`

**Soluções**:
1. Gerar nova chave em https://aistudio.google.com/app/apikey
2. Verificar se chave está na variável `GOOGLE_AI_KEY`
3. Modelo correto: `gemini-2.5-flash`

---

## 📊 Monitoramento

### Vercel Analytics

1. **Vercel Dashboard** → Seu projeto
2. **Analytics** → Ver tráfego
3. **Logs** → Ver erros em tempo real

### Supabase Logs

1. **Supabase Dashboard** → Seu projeto
2. **Database** → **Logs**
3. Ver queries e erros

---

## 🔄 Atualizar Deploy

```bash
# 1. Fazer alterações no código
# 2. Commit
git add .
git commit -m "feat: nova funcionalidade"

# 3. Push
git push origin main

# 4. Vercel faz deploy automático! 🚀
```

---

## 💰 Custos Estimados

### Tier Gratuito (Ideal para começar)

| Serviço | Plano | Custo | Limites |
|---------|-------|-------|---------|
| **Vercel** | Hobby | R$ 0 | 100GB bandwidth |
| **Supabase** | Free | R$ 0 | 500MB DB, 1GB transfer |
| **Google AI** | Free | R$ 0 | 15 req/min (Gemini 2.5 Flash) |
| **TOTAL** | - | **R$ 0/mês** | ✅ |

### Se Crescer (Tier Pago)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Vercel | Pro | ~$20/mês |
| Supabase | Pro | ~$25/mês |
| Google AI | Pay-as-go | ~$0.001/requisição |
| **TOTAL** | - | **~R$ 250/mês** |

---

## 🎯 Checklist Pós-Deploy

- [ ] Site acessível
- [ ] Login funcionando
- [ ] Admin criado
- [ ] Planos carregando
- [ ] Gemini gerando recursos
- [ ] PDF download funcionando
- [ ] Email enviando (se configurado)
- [ ] Dashboard admin acessível
- [ ] Alterar senha do admin padrão
- [ ] Configurar domínio customizado (opcional)
- [ ] Configurar analytics (opcional)

---

## 🌐 Domínio Customizado (Opcional)

### 1. Comprar Domínio

- **Registro.br**: ~R$ 40/ano (.com.br)
- **Namecheap**: ~$10/ano (.com)

### 2. Configurar na Vercel

1. **Vercel** → Seu projeto → **Settings** → **Domains**
2. **Add Domain**
3. Insira: `seudominio.com.br`
4. **Add**
5. Configurar DNS (Vercel mostra instruções)

### 3. SSL Automático

Vercel configura SSL (HTTPS) automaticamente! ✅

---

## 📚 Links Úteis

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Google AI Studio**: https://aistudio.google.com
- **GitHub Repo**: https://github.com/seu-usuario/aptus
- **Documentação Next.js**: https://nextjs.org/docs
- **Documentação Prisma**: https://www.prisma.io/docs

---

## 🎉 Pronto!

Seu sistema está em produção! 🚀

**Próximos passos:**
1. Divulgar o link
2. Criar landing page
3. Adicionar mais features
4. Integrar Stripe (pagamentos)
5. Implementar Google Vision (OCR profissional)

**Boa sorte com o Aptus!** 💼
