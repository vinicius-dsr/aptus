# 🚀 Próximos Passos - Sistema SaaS Aptus

## ✅ O que foi implementado

### 📦 **Schema do Banco de Dados**
- ✅ Modelo `Plan` (4 planos criados)
- ✅ Modelo `Subscription` (controle de assinaturas)
- ✅ Campo `isActive` em `User`
- ✅ Enums de status de assinatura

### 🛡️ **Dashboard Admin**
- ✅ Página principal com estatísticas (`/admin`)
- ✅ Gerenciamento de usuários (`/admin/users`)
- ✅ APIs de admin completas
- ✅ Ativar/desativar usuários
- ✅ Ver dados de todos os usuários

### 👤 **Dashboard Usuário**
- ✅ Card de assinatura com progresso
- ✅ Controle de limites automático
- ✅ Página de planos (`/plans`)
- ✅ Troca de planos
- ✅ Renovação automática mensal

### 📚 **Documentação**
- ✅ `SAAS.md` - Documentação completa do SaaS
- ✅ `ADMIN.md` - Sistema de administradores
- ✅ `MIGRATIONS.md` - Guia de migrations
- ✅ Scripts PowerShell automatizados

---

## 🎯 Execute Agora (IMPORTANTE!)

### Passo 1: Setup do Sistema SaaS

```powershell
# Executar script automatizado
.\scripts\setup-saas.ps1

# OU manualmente:
npm install                                    # Instalar dependências
npx prisma migrate dev --name add-saas-system  # Criar migration
npm run db:seed                                # Popular banco
```

**O que acontece:**
1. Cria tabelas `Plan` e `Subscription`
2. Adiciona campo `isActive` em `User`
3. Popula 4 planos de assinatura
4. Cria admin (admin@aptus.com / admin123)
5. Cria usuário demo (demo@aptus.com / demo123)

---

### Passo 2: Iniciar Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

### Passo 3: Testar o Sistema

#### Como Admin:
```
1. Login: admin@aptus.com / admin123
2. Clique em "Admin" no menu
3. Veja estatísticas
4. Acesse "Gerenciar Usuários"
5. Teste ativar/desativar usuários
```

#### Como Usuário:
```
1. Login: demo@aptus.com / demo123
2. Veja card de assinatura (Plano Gratuito)
3. Clique em "Upgrade" ou "Mudar Plano"
4. Escolha outro plano
5. Tente criar recursos (limite de 2/mês no gratuito)
```

---

## 📊 Estrutura Criada

### Páginas

```
/                          → Landing page
/auth/login               → Login
/auth/register            → Cadastro
/plans                    → Escolher plano ✨ NOVO
/dashboard                → Dashboard usuário
/admin                    → Dashboard admin ✨ ATUALIZADO
/admin/users              → Gerenciar usuários ✨ NOVO
```

### APIs

```
GET  /api/plans                    ✨ NOVA
GET  /api/subscription             ✨ NOVA
POST /api/subscription/change      ✨ NOVA
GET  /api/admin/stats              ✨ NOVA
GET  /api/admin/users              ✨ NOVA
PATCH /api/admin/users/[id]        ✨ NOVA
DELETE /api/admin/users/[id]       ✨ NOVA
```

### Componentes

```
components/
├── dashboard/
│   ├── SubscriptionCard.tsx     ✨ NOVO
│   └── DashboardLayout.tsx      ✅ ATUALIZADO
└── ui/
    └── progress.tsx             ✨ NOVO
```

### Helpers

```
lib/
├── subscription.ts              ✨ NOVO
│   ├── getSubscriptionInfo()
│   ├── incrementAppealUsage()
│   ├── checkAppealLimit()
│   └── resetSubscriptionPeriod()
└── admin.ts                     ✅ EXISTENTE
```

---

## 🔧 Integrações Pendentes

### 1. Verificação de Limites na Criação de Recursos

Atualize `src/app/api/appeals/route.ts`:

```typescript
import { checkAppealLimit, incrementAppealUsage } from '@/lib/subscription'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  // Verificar limite
  const check = await checkAppealLimit(session.user.id)
  if (!check.allowed) {
    return NextResponse.json(
      { error: check.message },
      { status: 403 }
    )
  }
  
  // Criar recurso
  const appeal = await prisma.appeal.create({ /* ... */ })
  
  // Incrementar contador
  await incrementAppealUsage(session.user.id)
  
  return NextResponse.json(appeal)
}
```

### 2. Adicionar SubscriptionCard no Dashboard

Atualize `src/app/dashboard/page.tsx`:

```typescript
import SubscriptionCard from '@/components/dashboard/SubscriptionCard'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar com assinatura */}
        <div className="lg:col-span-1">
          <SubscriptionCard />
        </div>
        
        {/* Conteúdo principal */}
        <div className="lg:col-span-2">
          {/* Criar recurso, etc */}
        </div>
      </div>
    </DashboardLayout>
  )
}
```

### 3. Redirecionar Novos Usuários para Planos

Atualize `src/app/api/auth/register/route.ts`:

```typescript
// Após criar usuário
const user = await prisma.user.create({ /* ... */ })

// Redirecionar para escolher plano
return NextResponse.json({
  redirect: '/plans'
})
```

---

## 💳 Integração com Stripe (Futuro)

### Preparação Existente:

```typescript
model Plan {
  stripePriceId String?  // ← Já preparado
}

model Subscription {
  stripeCustomerId      String?  // ← Já preparado
  stripeSubscriptionId  String?  // ← Já preparado
  stripePaymentMethodId String?  // ← Adicionado
}
```

### Próximos Passos Stripe:

1. **Criar conta Stripe**: https://stripe.com
2. **Criar produtos e preços** no Dashboard
3. **Adicionar Stripe SDK**:
   ```bash
   npm install stripe @stripe/stripe-js
   ```
4. **Configurar webhook** para confirmar pagamentos
5. **Atualizar planos** com `stripePriceId`

---

## 🎨 Melhorias de UI Sugeridas

### Landing Page (`src/app/page.tsx`)

```typescript
// Adicionar seção de planos
<section className="py-20">
  <h2 className="text-3xl font-bold text-center mb-12">
    Planos e Preços
  </h2>
  <div className="grid md:grid-cols-4 gap-6">
    {/* Carregar planos da API */}
  </div>
  <div className="text-center mt-8">
    <Link href="/plans">
      <Button size="lg">Ver Todos os Planos</Button>
    </Link>
  </div>
</section>
```

### Dashboard Layout

Adicionar indicador de plano no header:

```typescript
{session?.user?.role !== 'ADMIN' && (
  <div className="text-xs text-gray-500">
    Plano: {subscription?.plan.displayName}
  </div>
)}
```

---

## 📈 Funcionalidades Futuras

### Curto Prazo (1-2 semanas)
- [ ] Integração com Stripe
- [ ] Página de histórico de pagamentos
- [ ] Notificações de limite atingido
- [ ] Email de boas-vindas com plano
- [ ] Cancelamento de assinatura

### Médio Prazo (1 mês)
- [ ] Relatórios e analytics
- [ ] Exportar dados em CSV
- [ ] API pública para integrações
- [ ] Webhook para eventos
- [ ] Sistema de cupons/descontos

### Longo Prazo (3+ meses)
- [ ] White label
- [ ] Multi-tenancy
- [ ] App mobile
- [ ] Integrações com órgãos de trânsito
- [ ] IA treinada em casos específicos

---

## 🔍 Checklist de Verificação

Antes de colocar em produção:

### Banco de Dados
- [ ] Migration executada com sucesso
- [ ] Planos criados no banco
- [ ] Admin criado e testado
- [ ] Backup configurado

### Segurança
- [ ] Senhas padrão alteradas
- [ ] NEXTAUTH_SECRET forte
- [ ] DATABASE_URL segura
- [ ] OPENAI_API_KEY protegida
- [ ] Rate limiting configurado

### Funcionalidades
- [ ] Login/Registro funcionando
- [ ] Seleção de planos funcionando
- [ ] Criação de recursos com limite
- [ ] Dashboard admin acessível
- [ ] Gerenciamento de usuários OK
- [ ] OCR processando
- [ ] IA gerando recursos
- [ ] PDF sendo criado
- [ ] Email enviando

### Performance
- [ ] Build de produção testado
- [ ] Otimização de imagens
- [ ] Cache configurado
- [ ] CDN para assets
- [ ] Monitoramento ativo

### Documentação
- [ ] README atualizado
- [ ] API docs criada
- [ ] Guia de usuário
- [ ] FAQ

---

## 🚦 Status Atual

| Componente | Status | Observação |
|------------|--------|------------|
| Schema SaaS | ⚠️ Pendente | Executar migration |
| Planos | ⚠️ Pendente | Executar seed |
| Admin Dashboard | ✅ Pronto | Código completo |
| User Dashboard | 🔨 Parcial | Adicionar SubscriptionCard |
| API Admin | ✅ Pronto | Testável após migration |
| API Subscription | ✅ Pronto | Testável após migration |
| Verificação Limites | 🔨 Parcial | Integrar na criação |
| Documentação | ✅ Pronto | Completa |

---

## 🎯 Comando Final (EXECUTE AGORA)

```powershell
# Este é o comando mais importante!
.\scripts\setup-saas.ps1
```

Isso vai configurar **TUDO** automaticamente! 🚀

Após executar, você terá:
- ✅ Sistema SaaS completo
- ✅ 4 planos funcionais
- ✅ Admin e usuário demo
- ✅ Pronto para desenvolvimento

---

## 📞 Suporte

Se encontrar problemas:

1. **Erros de Prisma**: Execute `npx prisma generate`
2. **Erros de módulo**: Execute `npm install`
3. **Erros de banco**: Verifique `DATABASE_URL` no `.env`
4. **Outros**: Consulte `SAAS.md` ou `ADMIN.md`

---

**Criado em**: Outubro 2024  
**Versão**: 2.0.0 (SaaS Complete)  
**Status**: ⚠️ Aguardando setup-saas.ps1
