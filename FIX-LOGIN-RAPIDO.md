# ⚡ Fix Rápido - Login (3 minutos)

## 🎯 Diagnóstico Rápido

Já rodou migrate e seed, mas login não funciona?  
**99% das vezes é um destes problemas:**

---

## ✅ Check 1: NEXTAUTH_URL na Vercel

**Problema #1 mais comum!**

1. Acesse: https://vercel.com/dashboard
2. Seu projeto → **Settings** → **Environment Variables**
3. Procure `NEXTAUTH_URL`

### ⚠️ Deve estar assim:

```env
NEXTAUTH_URL=https://seu-app.vercel.app
```

### ❌ NÃO pode estar assim:

```env
NEXTAUTH_URL=http://localhost:3000
```

**Se estiver errado:**
1. Editar variável
2. Colocar URL correta da Vercel
3. **Salvar**
4. **Deployments** → **... (3 pontos)** → **Redeploy** ← IMPORTANTE!

---

## ✅ Check 2: NEXTAUTH_SECRET existe?

1. Vercel → Settings → Environment Variables
2. Procure `NEXTAUTH_SECRET`

### Se NÃO existe ou está vazio:

```powershell
# Execute para gerar:
.\scripts\check-env.ps1
```

**Ou gere manualmente:**

```bash
# Linux/Mac/WSL
openssl rand -base64 32

# PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Cole o resultado na Vercel como `NEXTAUTH_SECRET`**

⚠️ **Depois: REDEPLOY!**

---

## ✅ Check 3: Usuários no Banco?

```bash
# Com DATABASE_URL de produção no .env
npx prisma studio
```

**Verificar:**
- Tabela `User` → Deve ter 2 usuários
- Email: `admin@aptus.com`
- Campo `password` → Deve ter hash longo (tipo: `$2a$10$...`)

**Se estiver vazio:**
```bash
npx prisma db seed
```

---

## 🧪 Teste no Navegador

1. Abra: https://seu-app.vercel.app/auth/login
2. Aperte **F12** (DevTools)
3. Aba **Console**
4. Tente fazer login com:
   - Email: `admin@aptus.com`
   - Senha: `admin123`

### O que deve aparecer:

✅ **Sucesso:** Redireciona para `/dashboard`

❌ **Erro no Console:**
- "Failed to fetch" → Vercel está fora do ar (improvável)
- "401" → Credenciais erradas OU usuário não existe
- "500" → Banco não conecta OU variáveis erradas

---

## 📋 Checklist Rápido

Marque conforme verifica:

```
[ ] NEXTAUTH_URL correto na Vercel (https://...)
[ ] NEXTAUTH_SECRET existe e tem 32+ caracteres
[ ] DATABASE_URL correto na Vercel (Supabase)
[ ] Prisma Studio mostra usuários no banco
[ ] Fiz REDEPLOY após mudar variáveis
[ ] Testei em aba anônima (sem cache)
```

---

## 🎯 Ação Imediata (Faça AGORA)

### 1. Execute o script:
```powershell
.\scripts\check-env.ps1
```

Isso vai:
- Gerar NEXTAUTH_SECRET novo
- Abrir Prisma Studio para verificar usuários

### 2. Copie o NEXTAUTH_SECRET gerado

### 3. Cole na Vercel:
- Settings → Environment Variables
- NEXTAUTH_SECRET = [cole aqui]

### 4. REDEPLOY:
- Deployments → ... → Redeploy

### 5. Aguarde ~2 minutos

### 6. Teste login novamente

---

## 💡 Dica Pro

**Se AINDA não funcionar**, me envie:

1. **Print do Prisma Studio** (tabela User)
2. **Print das variáveis da Vercel** (pode esconder valores sensíveis)
3. **Print do Console do navegador** (F12) ao tentar login
4. **URL do seu app na Vercel**

---

## 🆘 Solução Extrema

Se nada funcionar, faça reset completo:

```bash
# 1. Com DATABASE_URL de produção no .env
npx prisma migrate reset --force

# 2. Seed novamente
npx prisma db seed

# 3. Regenerar NEXTAUTH_SECRET
.\scripts\check-env.ps1

# 4. Atualizar na Vercel

# 5. Redeploy
```

---

**Execute o script check-env.ps1 AGORA!** ⚡

```powershell
.\scripts\check-env.ps1
```
