# 🐛 Debug Completo - Login Não Funciona

## ✅ Já Feito
- [x] Migrations aplicadas
- [x] Seed executado
- [x] .env verificado

## 🔍 Próximos Checks

---

## 1️⃣ Verificar Dados no Banco

```bash
# Com DATABASE_URL de produção no .env
npx prisma studio
```

**Verificar:**
- ✅ Tabela `User` tem 2 usuários?
- ✅ Emails: `admin@aptus.com` e `demo@aptus.com`?
- ✅ Campo `password` está preenchido (hash bcrypt)?
- ✅ Tabela `Plan` tem 4 planos?
- ✅ Tabela `Subscription` tem 2 registros?

Se **TUDO vazio** → seed não rodou corretamente!

---

## 2️⃣ Verificar Variáveis na Vercel

Acesse: https://vercel.com/dashboard → Seu Projeto → **Settings** → **Environment Variables**

### ⚠️ CRÍTICO: NEXTAUTH_URL

**Deve ser a URL da Vercel:**
```env
NEXTAUTH_URL="https://seu-app.vercel.app"
```

❌ **ERRADO:**
```env
NEXTAUTH_URL="http://localhost:3000"
```

### ⚠️ CRÍTICO: NEXTAUTH_SECRET

**Deve estar preenchido (32+ caracteres):**
```env
NEXTAUTH_SECRET="cole-um-secret-forte-aqui"
```

**Gerar novo:**
```bash
openssl rand -base64 32
```

Ou PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Checklist Completo:

```env
✅ DATABASE_URL="postgresql://..." (Supabase Connection Pooling)
✅ DIRECT_URL="postgresql://..." (Supabase Direct Connection)
✅ NEXTAUTH_URL="https://seu-app.vercel.app" (URL CORRETA!)
✅ NEXTAUTH_SECRET="[32+ caracteres]" (NÃO vazio!)
✅ GOOGLE_AI_KEY="AIzaSy..." (Google AI)
```

---

## 3️⃣ Ver Logs da Vercel

### Durante Login:

1. Vercel Dashboard → Seu projeto
2. **Deployments** → Deployment atual
3. **Functions** → Clicar em `/api/auth/[...nextauth]`
4. Tentar fazer login
5. Ver logs em tempo real

### Procurar por:

```
❌ "Database connection failed"
❌ "Prisma error"
❌ "NEXTAUTH_SECRET not found"
❌ "Invalid credentials"
❌ "User not found"
```

---

## 4️⃣ Testar Console do Navegador

1. Abrir site: https://seu-app.vercel.app/auth/login
2. Abrir DevTools (F12)
3. Aba **Console**
4. Tentar fazer login
5. Ver erros JavaScript

### Procurar por:

```
❌ Failed to fetch
❌ 401 Unauthorized
❌ 500 Internal Server Error
❌ Network error
```

---

## 5️⃣ Testar Aba Network

1. DevTools → Aba **Network**
2. Tentar fazer login
3. Procurar requisição `api/auth/callback/credentials`
4. Clicar nela → Ver **Response**

### Resposta Esperada:

```json
{
  "url": "https://seu-app.vercel.app/dashboard"
}
```

### Se erro:

```json
{
  "error": "CredentialsSignin"
}
```

**Causa:** Credenciais inválidas OU usuário não existe no banco

---

## 🔧 Soluções por Cenário

### Cenário A: "CredentialsSignin"

**Causa:** Usuário não existe no banco de produção

**Solução:**
```bash
# Com DATABASE_URL de produção no .env
npx prisma db seed
```

### Cenário B: Nada acontece (sem erro)

**Causa:** `NEXTAUTH_URL` incorreto ou `NEXTAUTH_SECRET` faltando

**Solução:**
1. Vercel → Settings → Environment Variables
2. Corrigir `NEXTAUTH_URL="https://seu-app.vercel.app"`
3. Adicionar/Gerar `NEXTAUTH_SECRET`
4. **Redeploy** (importante!)

### Cenário C: "Internal Server Error"

**Causa:** Banco de dados não conecta

**Solução:**
1. Verificar `DATABASE_URL` na Vercel
2. Testar conexão:
```bash
# Com DATABASE_URL de produção
npx prisma db pull
```

### Cenário D: Redirect loop (fica voltando pro login)

**Causa:** Middleware ou session não funcionando

**Solução:**
1. Verificar `NEXTAUTH_SECRET` configurado
2. Limpar cookies do navegador
3. Testar em aba anônima

---

## 🧪 Teste Definitivo

### Script para verificar usuário no banco:

```bash
# Com DATABASE_URL de produção no .env
npx prisma studio
```

1. Abrir tabela `User`
2. Ver se existe `admin@aptus.com`
3. Verificar campo `password` (deve ter hash longo)

### Se usuário NÃO existe:

```bash
# Seed novamente
npx prisma db seed

# Se der erro, forçar:
npx prisma migrate reset --force
npx prisma db seed
```

---

## 📋 Checklist Final

Marque o que já verificou:

- [ ] Usuários existem no banco (Prisma Studio)
- [ ] `NEXTAUTH_URL` correto na Vercel
- [ ] `NEXTAUTH_SECRET` configurado (32+ chars)
- [ ] `DATABASE_URL` correto na Vercel
- [ ] Logs da Vercel não mostram erros
- [ ] Console do navegador sem erros
- [ ] Network mostra status 200 ou redirect
- [ ] Redeploy feito após mudar variáveis

---

## 🆘 Se NADA Funcionar

### Compartilhe:

1. **Logs da Vercel** (Functions → /api/auth)
2. **Console do navegador** (print dos erros)
3. **Network tab** (response da requisição de login)
4. **Print do Prisma Studio** (tabela User)

---

## 💡 Dica Rápida

**Teste credenciais exatas do seed:**

```
Email: admin@aptus.com
Senha: admin123
```

**Tente também:**
```
Email: demo@aptus.com
Senha: demo123
```

Se **NENHUM** funcionar → problema nas variáveis de ambiente da Vercel!

---

## 🎯 Ação Imediata

1. Abra Prisma Studio:
```bash
npx prisma studio
```

2. Veja tabela `User` - tem os 2 usuários?
   - ✅ SIM → Problema é nas variáveis da Vercel
   - ❌ NÃO → Rodar seed novamente

3. Vercel → Settings → Environment Variables
   - Verificar `NEXTAUTH_URL` e `NEXTAUTH_SECRET`
   - **REDEPLOY** após qualquer mudança

---

**Siga os checks acima e me diga o que encontrou!** 🔍
