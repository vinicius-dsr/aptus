# 🚀 Deploy: Dados do Usuário no Recurso

## ✅ Implementado

Sistema agora puxa dados do usuário logado automaticamente!

---

## 🎯 Mudanças

### 1. Schema Prisma
**Adicionado campo `address` ao User:**
```prisma
model User {
  // ... outros campos
  cpf     String?  @unique  // Já existia
  phone   String?           // Já existia
  address String?           // ✨ NOVO
}
```

### 2. API `/api/appeals/create`
**Agora puxa dados do usuário:**
```typescript
// Busca usuário logado
const user = await prisma.user.findUnique({
  where: { id: session.user.id },
  select: { name, cpf, phone, address, email }
})

// Combina com dados extraídos
const completeData = {
  driverName: user?.name,      // Da conta
  driverCpf: user?.cpf,         // Da conta
  driverPhone: user?.phone,     // Da conta
  driverAddress: user?.address, // Da conta
  driverEmail: user?.email,     // Da conta
  ...extractedData              // Dos documentos (Gemini)
}
```

### 3. Prompt Gemini Atualizado
**Agora recebe e usa:**
- Nome completo
- CPF
- Endereço
- Telefone
- E-mail
- Placa, RENAVAM (extraídos)
- Nº Auto, Data, Código (extraídos)

---

## 📋 Passos para Deploy

### 1. Aplicar Migration

```bash
# Adicionar campo address ao banco de produção
npx prisma migrate deploy
```

Ou criar migration:
```bash
# Criar migration
npx prisma migrate dev --name add_address_to_user

# Aplicar em produção
npx prisma migrate deploy
```

### 2. Commit e Push

```bash
git add prisma/schema.prisma
git add src/lib/openai.ts
git add src/app/api/appeals/create/route.ts
git commit -m "feat: Puxar dados do usuário automaticamente no recurso

- Adicionar campo address ao User
- API puxa nome, CPF, telefone, endereço do usuário logado
- Combinar dados do usuário com dados extraídos por Gemini Vision
- Atualizar prompt Gemini com dados completos
- IA gera recurso com informações completas do recorrente"

git push origin main
```

### 3. Aguardar Deploy

Vercel faz deploy automático (~2 min)

---

## 🧪 Como Testar

### 1. Adicionar Dados no Cadastro

Usuário precisa ter no perfil:
- ✅ Nome (já tem)
- ✅ CPF (já existe no schema)
- ✅ Telefone (já existe no schema)
- ✅ Endereço (**novo campo**)

### 2. Criar Recurso

1. Login
2. Upload documentos
3. Gemini extrai: placa, RENAVAM, nº auto, data, código
4. API puxa: nome, CPF, telefone, endereço
5. IA gera recurso **COM TODOS OS DADOS**

---

## 📊 Dados no Recurso

### ✅ Agora Aparece Completo:

```
RECORRENTE:
Nome Completo: João da Silva          ← Da conta
CPF: 123.456.789-00                   ← Da conta
Endereço: Rua X, 123 - São Paulo/SP   ← Da conta
Telefone: (11) 98765-4321             ← Da conta
E-mail: joao@email.com                ← Da conta
Nº Registro CNH: [extraído se houver]

VEÍCULO:
Placa: ABC-1234                       ← Gemini Vision
RENAVAM: 12345678901                  ← Gemini Vision

INFRAÇÃO:
Nº Auto: T012345678                   ← Gemini Vision
Data: 10/10/2025                      ← Gemini Vision
Código: 745-50                        ← Gemini Vision
Órgão: DETRAN/PA                      ← Gemini Vision
```

---

## ⚠️ IMPORTANTE: Migration

**Antes de fazer deploy, aplicar migration:**

### Opção 1: Local → Produção

```bash
# 1. Com DATABASE_URL local
npx prisma migrate dev --name add_address_to_user

# 2. Com DATABASE_URL de produção
npx prisma migrate deploy
```

### Opção 2: Direto em Produção

```bash
# Com DATABASE_URL de produção no .env
npx prisma migrate deploy
```

---

## 🔧 Atualizar Cadastro Existente

Usuários já cadastrados precisam adicionar endereço.

### Criar Página de Perfil (Futuro)

```
/dashboard/profile
- Editar nome
- Editar CPF
- Editar telefone
- ✨ Adicionar/editar endereço
```

---

## 💡 Melhorias Futuras

### 1. Validação de CPF no Cadastro
```typescript
// Validar formato CPF
if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
  throw new Error('CPF inválido')
}
```

### 2. Campo CNH
```prisma
model User {
  // ...
  cnhNumber String?  // Nº da CNH
}
```

### 3. Autocompletar Endereço
- API ViaCEP para buscar por CEP
- Google Places API

---

## 📝 Checklist Completo

Antes de testar:

```
[ ] Migration aplicada (campo address criado)
[ ] Código commitado e push feito
[ ] Deploy Vercel completado
[ ] Usuário tem dados no perfil:
    [ ] Nome
    [ ] CPF
    [ ] Telefone
    [ ] Endereço (novo)
[ ] Testar criar recurso
[ ] Verificar se dados aparecem completos
```

---

## 🎯 Execute Agora

### 1. Migration

```bash
# Com DATABASE_URL de produção
npx prisma migrate deploy
```

### 2. Deploy

```bash
git add .
git commit -m "feat: Dados do usuário no recurso"
git push origin main
```

### 3. Testar

Aguarde 2 min e crie um recurso!

---

**Recurso agora sai completo com todos os dados do usuário!** ✅🎉
