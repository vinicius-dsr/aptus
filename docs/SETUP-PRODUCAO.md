# 🚀 Setup Rápido - Banco de Produção

## 🎯 Problema Atual

Login não funciona porque o **banco de produção está vazio**.

---

## ✅ Solução (3 Passos)

### 1️⃣ Obter Credenciais do Supabase

Acesse: https://supabase.com/dashboard

1. Clique no seu projeto
2. **Settings** → **Database**
3. Role até **Connection String**

Copie **2 URLs**:

**Connection Pooling** (usar no DATABASE_URL):
```
postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Direct Connection** (usar no DIRECT_URL):
```
postgresql://postgres.xxx:senha@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

---

### 2️⃣ Configurar Banco Local Temporariamente

Edite o arquivo `.env` local:

```env
# Cole as URLs de produção temporariamente
DATABASE_URL="postgresql://postgres.xxx..."
DIRECT_URL="postgresql://postgres.xxx..."
```

---

### 3️⃣ Executar Comandos

```bash
# Aplicar migrations
npx prisma migrate deploy

# Criar dados (planos + usuários)
npx prisma db seed
```

**Pronto!** ✅

---

## 🧪 Testar

Acesse: https://seu-app.vercel.app/auth/login

**Credenciais criadas:**
- Admin: `admin@aptus.com` / `admin123`
- Demo: `demo@aptus.com` / `demo123`

---

## ⚠️ IMPORTANTE

Após testar, **restaure o .env local** para desenvolvimento:

```env
# Voltar para banco local
DATABASE_URL="postgresql://postgres:password@localhost:5432/aptus"
DIRECT_URL="postgresql://postgres:password@localhost:5432/aptus"
```

---

## 🎉 Resultado

- ✅ 4 planos criados
- ✅ 2 usuários criados (admin + demo)
- ✅ 2 assinaturas criadas
- ✅ Login funcionando!

---

**Execute os comandos e teste!** 🚀
