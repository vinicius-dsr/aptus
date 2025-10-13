# 💼 Sistema SaaS - Aptus

## 🎯 Visão Geral

O Aptus agora é um **SaaS completo** com:
- ✅ **4 planos de assinatura** (Gratuito, Básico, Pro, Enterprise)
- ✅ **Limites de uso** por plano
- ✅ **Dashboard Admin** completo com gerenciamento
- ✅ **Dashboard Usuário** com controle de assinatura
- ✅ **Sistema de ativação/desativação** de usuários
- ✅ **Controle de período** de assinatura (mensal)

---

## 📊 Planos Disponíveis

### 🆓 Gratuito
- **Preço**: R$ 0,00/mês
- **Recursos**: 2 por mês
- **Features**:
  - Geração com IA
  - Download em PDF
  - Suporte por email

### 💎 Básico
- **Preço**: R$ 29,90/mês
- **Recursos**: 10 por mês
- **Features**:
  - Geração com IA avançada
  - Download em PDF
  - Envio automático por email
  - Histórico completo
  - Suporte prioritário

### 🚀 Profissional (POPULAR)
- **Preço**: R$ 79,90/mês
- **Recursos**: 50 por mês
- **Features**:
  - IA avançada com contexto
  - Templates personalizados
  - Múltiplos usuários
  - Histórico ilimitado
  - Suporte 24/7

### 🏢 Empresarial
- **Preço**: R$ 199,90/mês
- **Recursos**: Ilimitados
- **Features**:
  - IA customizada
  - API de integração
  - White label
  - Relatórios avançados
  - Gestão de equipe
  - SLA garantido

---

## 🗄️ Schema do Banco de Dados

### Novas Tabelas

```prisma
model Plan {
  id                String         @id @default(cuid())
  name              String         @unique
  displayName       String
  description       String?
  price             Float
  appealsPerMonth   Int
  features          String[]
  isActive          Boolean        @default(true)
  stripePriceId     String?
  order             Int            @default(0)
  subscriptions     Subscription[]
}

model Subscription {
  id                String             @id @default(cuid())
  userId            String             @unique
  user              User               @relation(...)
  planId            String
  plan              Plan               @relation(...)
  status            SubscriptionStatus @default(ACTIVE)
  appealsUsed       Int                @default(0)
  appealsLimit      Int
  currentPeriodStart DateTime          @default(now())
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd Boolean           @default(false)
  stripeCustomerId  String?
  stripeSubscriptionId String?
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
  EXPIRED
}
```

### Campos Adicionados

```prisma
model User {
  // ... campos existentes
  isActive      Boolean        @default(true)  // ← Novo
  subscription  Subscription?                  // ← Novo
}
```

---

## 🎨 Dashboard Admin

### URL: `/admin`

#### Funcionalidades:

1. **Visão Geral (Stats)**
   - Total de usuários
   - Total de recursos
   - Recursos pendentes
   - Recursos concluídos

2. **Gerenciar Usuários** (`/admin/users`)
   - Listar todos os usuários
   - Ver plano de cada usuário
   - Ver uso de recursos (usado/limite)
   - Ativar/Desativar usuários
   - Buscar por nome ou email
   - Ver data de cadastro

3. **Ver Todos os Recursos** (`/admin/appeals`)
   - Lista completa de recursos do sistema
   - Filtros e pesquisa
   - Ver detalhes de cada recurso

#### APIs do Admin:

```typescript
GET  /api/admin/stats              // Estatísticas gerais
GET  /api/admin/users              // Listar usuários
PATCH /api/admin/users/[userId]    // Ativar/desativar
DELETE /api/admin/users/[userId]   // Remover usuário
```

---

## 👤 Dashboard Usuário

### URL: `/dashboard`

#### Funcionalidades:

1. **Card de Assinatura**
   - Plano atual
   - Uso de recursos (barra de progresso)
   - Dias restantes no período
   - Botão de upgrade

2. **Criar Recurso**
   - Upload de documentos
   - Verificação automática de limite
   - Bloqueio se limite atingido
   - Incremento automático do contador

3. **Histórico**
   - Recursos criados
   - Status de cada recurso
   - Download e envio

#### APIs do Usuário:

```typescript
GET  /api/subscription             // Ver assinatura atual
POST /api/subscription/change      // Mudar plano
GET  /api/plans                    // Listar planos disponíveis
```

---

## 🔄 Fluxo de Assinatura

### 1. Novo Usuário

```
Cadastro → Sem plano → Redirecionado para /plans → Escolhe plano → Ativado
```

### 2. Criar Recurso

```typescript
1. Usuário clica em "Criar Recurso"
2. Sistema verifica: await checkAppealLimit(userId)
3. Se OK:
   - Processa recurso
   - Incrementa contador: await incrementAppealUsage(userId)
4. Se limite atingido:
   - Mostra mensagem
   - Oferece upgrade
```

### 3. Renovação Mensal

```typescript
// Automático ao tentar criar recurso
if (currentDate > subscription.currentPeriodEnd) {
  await resetSubscriptionPeriod(userId)
  // Zera contador
  // Atualiza período para +30 dias
}
```

---

## 🔒 Controle de Acesso

### Middleware de Verificação

```typescript
// src/lib/subscription.ts

// Verificar se pode criar recurso
const check = await checkAppealLimit(userId)

if (!check.allowed) {
  return error(check.message)
}

// Criar recurso
await createAppeal(...)

// Incrementar contador
await incrementAppealUsage(userId)
```

### Proteção de Rotas Admin

```typescript
// Qualquer rota/API admin
await requireAdmin() // Throws error se não for admin
```

---

## 🚀 Setup e Migration

### 1. Executar Migration

```bash
# Criar migration com novos modelos
npx prisma migrate dev --name add-saas-system

# Isso irá:
# - Criar tabelas Plan e Subscription
# - Adicionar campo isActive em User
# - Gerar Prisma Client atualizado
```

### 2. Popular Planos

```bash
npm run db:seed

# Isso cria:
# - 4 planos (Gratuito, Básico, Pro, Enterprise)
# - Admin padrão
# - Usuário demo com plano gratuito
```

### 3. Instalar Dependências

```bash
npm install
# Inclui @radix-ui/react-progress
```

---

## 📝 Exemplo de Uso

### Criar Recurso com Verificação

```typescript
// src/app/api/appeals/create/route.ts

import { checkAppealLimit, incrementAppealUsage } from '@/lib/subscription'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  // 1. Verificar limite
  const check = await checkAppealLimit(session.user.id)
  
  if (!check.allowed) {
    return NextResponse.json(
      { error: check.message },
      { status: 403 }
    )
  }
  
  // 2. Criar recurso
  const appeal = await prisma.appeal.create({
    data: {
      userId: session.user.id,
      // ... dados do recurso
    }
  })
  
  // 3. Incrementar contador
  await incrementAppealUsage(session.user.id)
  
  return NextResponse.json(appeal)
}
```

### Ver Plano Atual no Component

```typescript
'use client'

import SubscriptionCard from '@/components/dashboard/SubscriptionCard'

export default function Dashboard() {
  return (
    <div>
      <SubscriptionCard /> {/* Mostra plano, uso, dias restantes */}
      
      {/* Resto do dashboard */}
    </div>
  )
}
```

---

## 🎨 Componentes Criados

### 1. `SubscriptionCard.tsx`
- Exibe informações da assinatura
- Barra de progresso de uso
- Dias restantes
- Botão de upgrade

### 2. Admin Users Page
- Tabela de usuários
- Busca e filtros
- Ações (ativar/desativar)

### 3. Plans Page
- Grid de planos
- Seleção de plano
- Destaque no plano Pro

---

## 💳 Integração com Stripe (Futuro)

### Campos Preparados:

```typescript
model Plan {
  stripePriceId String?  // ID do preço no Stripe
}

model Subscription {
  stripeCustomerId      String?
  stripeSubscriptionId  String?
}
```

### Implementação Futura:

1. **Criar produtos no Stripe**
2. **Salvar `stripePriceId` em cada plano**
3. **Criar Checkout Session**
4. **Webhook para confirmar pagamento**
5. **Atualizar subscription no banco**

---

## ✅ Checklist de Setup

- [ ] Executar migration: `npx prisma migrate dev --name add-saas-system`
- [ ] Gerar Prisma Client: `npx prisma generate`
- [ ] Instalar dependências: `npm install`
- [ ] Popular banco: `npm run db:seed`
- [ ] Testar login como admin: `admin@aptus.com / admin123`
- [ ] Testar login como usuário: `demo@aptus.com / demo123`
- [ ] Acessar admin: `/admin`
- [ ] Acessar planos: `/plans`
- [ ] Testar criação de recurso com limite

---

## 🔄 Fluxo Completo

### Usuário Novo:
```
1. Cadastro (/auth/register)
2. Sem assinatura
3. Redirecionado para /plans
4. Escolhe plano gratuito
5. Assinatura criada
6. Pode criar 2 recursos/mês
```

### Admin:
```
1. Login como admin
2. Botão "Admin" aparece no menu
3. Dashboard admin com estatísticas
4. Pode gerenciar usuários
5. Pode ver todos os recursos
6. Pode ativar/desativar usuários
```

### Limite Atingido:
```
1. Usuário usou todos os recursos do mês
2. Tenta criar novo recurso
3. Sistema bloqueia
4. Mostra mensagem: "Limite atingido"
5. Oferece upgrade de plano
6. Se fizer upgrade → limite aumenta
```

---

## 📞 Endpoints API Resumo

```typescript
// Públicas
GET  /api/plans                    // Listar planos

// Usuário autenticado
GET  /api/subscription             // Ver assinatura
POST /api/subscription/change      // Trocar plano
POST /api/appeals/create           // Criar recurso (com verificação)

// Admin apenas
GET  /api/admin/stats              // Estatísticas
GET  /api/admin/users              // Listar usuários
PATCH /api/admin/users/[id]        // Ativar/desativar
DELETE /api/admin/users/[id]       // Remover
GET  /api/admin/appeals            // Todos os recursos
```

---

## 🎉 Pronto para Usar!

Após executar os comandos acima, seu SaaS estará 100% funcional com:

✅ Sistema de planos  
✅ Controle de limites  
✅ Dashboard admin completo  
✅ Dashboard usuário com assinatura  
✅ Renovação automática mensal  
✅ Pronto para integrar Stripe  

---

**Criado em**: Outubro 2024  
**Versão**: 2.0.0 (SaaS Edition)
