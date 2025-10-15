# 🗄️ Guia de Migrations - Prisma + Supabase

## 🎯 Diferença entre `migrate` e `push`

### `prisma migrate dev` (RECOMENDADO)
✅ **Use para:**
- Produção (Supabase, Vercel, etc)
- Trabalho em equipe
- Histórico de mudanças no banco
- Controle de versão

**Vantagens:**
- Cria arquivos SQL rastreáveis
- Histórico completo de alterações
- Permite rollback
- Integra com Git
- Ideal para CI/CD

**Como funciona:**
```bash
npx prisma migrate dev --name nome-da-migration
```

Isso:
1. Cria arquivo em `prisma/migrations/[timestamp]_nome/migration.sql`
2. Aplica no banco de dados
3. Gera Prisma Client automaticamente
4. Atualiza `_prisma_migrations` table

---

### `prisma db push` (Desenvolvimento Rápido)
⚡ **Use para:**
- Desenvolvimento local rápido
- Protótipos
- Testes rápidos
- Iteração rápida no schema

**Vantagens:**
- Mais rápido
- Sem arquivos de migration
- Ideal para mudanças experimentais

**Desvantagens:**
- Sem histórico
- Difícil de reverter
- Não recomendado para produção

---

## 🚀 Setup Inicial com Supabase

### Opção 1: Com Migration (RECOMENDADO)

```bash
# 1. Criar primeira migration
npx prisma migrate dev --name init

# Isso vai:
# - Criar prisma/migrations/[timestamp]_init/
# - Aplicar no Supabase
# - Gerar Prisma Client

# 2. Criar admin
npm run db:seed

# 3. Iniciar servidor
npm run dev
```

### Opção 2: Script Automatizado

```powershell
# Windows PowerShell
.\scripts\setup-database.ps1

# Escolha opção 1 (Migration)
```

---

## 📋 Comandos de Migration

### Criar Nova Migration
```bash
# Durante desenvolvimento
npx prisma migrate dev --name nome-descritivo

# Exemplos:
npx prisma migrate dev --name add-role-to-users
npx prisma migrate dev --name create-appeals-table
npx prisma migrate dev --name add-email-verification
```

### Aplicar Migrations (Produção)
```bash
# Aplicar todas as migrations pendentes
npx prisma migrate deploy
```

### Ver Status
```bash
# Ver migrations aplicadas e pendentes
npx prisma migrate status
```

### Resetar Banco (⚠️ CUIDADO)
```bash
# Apaga TUDO e reaplica migrations
npx prisma migrate reset

# Com confirmação automática
npx prisma migrate reset --force
```

### Resolver Problemas
```bash
# Se migration falhou ou está em estado inconsistente
npx prisma migrate resolve --applied "migration-name"
npx prisma migrate resolve --rolled-back "migration-name"
```

---

## 🔄 Workflow Completo

### 1. Mudança no Schema

Edite `prisma/schema.prisma`:
```prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  role  UserRole @default(USER)  // ← Nova coluna
  // ...
}

enum UserRole {  // ← Novo enum
  USER
  ADMIN
}
```

### 2. Criar Migration

```bash
npx prisma migrate dev --name add-user-roles
```

Output esperado:
```
✔ Generated Prisma Client
✔ Created migration 20241013_add_user_roles
✔ Applied migration 20241013_add_user_roles
```

### 3. Verificar Arquivos

```
prisma/migrations/
└── 20241013123456_add_user_roles/
    └── migration.sql  ← Arquivo SQL gerado
```

### 4. Commit no Git

```bash
git add prisma/migrations/
git commit -m "feat: add user roles system"
```

### 5. Deploy em Produção

```bash
# Em produção (Vercel, Railway, etc)
npx prisma migrate deploy
```

---

## 🛠️ Situações Comuns

### Já tenho dados no banco (primeira migration)

```bash
# 1. Criar migration inicial sem aplicar
npx prisma migrate dev --name init --create-only

# 2. Editar migration.sql se necessário
# (adicionar lógica de dados existentes)

# 3. Aplicar
npx prisma migrate dev
```

### Mudança no Schema após Deploy

**Desenvolvimento:**
```bash
# 1. Mudar schema.prisma
# 2. Criar migration
npx prisma migrate dev --name sua-mudanca

# 3. Testar localmente
npm run dev

# 4. Commit
git add . && git commit -m "feat: sua mudanca"

# 5. Push
git push
```

**Produção (Vercel/Railway):**
```bash
# Automaticamente executado no build:
npx prisma migrate deploy
```

### Reverter Migration (antes de aplicar)

```bash
# Se ainda não commitou:
rm -rf prisma/migrations/[nome-da-migration]
npx prisma migrate dev
```

### Reverter Migration (já aplicada)

```bash
# Opção 1: Criar migration reversa
npx prisma migrate dev --name revert-[nome]

# Opção 2: Reset completo (⚠️ perde dados)
npx prisma migrate reset
```

---

## 🔐 Supabase Específico

### Connection Pooling

No `.env`:
```env
# Para migrations (conexão direta)
DIRECT_URL="postgresql://...supabase.com:5432/postgres"

# Para aplicação (pooling)
DATABASE_URL="postgresql://...supabase.com:6543/postgres?pgbouncer=true"
```

No `schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // ← Importante!
}
```

### Ver Migrations no Supabase

1. Acesse: Supabase Dashboard
2. Vá em: Table Editor
3. Procure: `_prisma_migrations`
4. Veja: Histórico completo

---

## 🐛 Troubleshooting

### Erro: "Migration engine crashed"

**Solução:**
```bash
# Limpar cache
rm -rf node_modules/.prisma
npx prisma generate
npx prisma migrate dev
```

### Erro: "Database is not empty"

**Solução:**
```bash
# Se for primeira migration e banco já tem dados:
npx prisma migrate dev --name init --create-only

# Depois edite o SQL gerado se necessário
```

### Erro: "P3005: Database schema is not empty"

**Solução A (Resetar):**
```bash
npx prisma migrate reset
```

**Solução B (Marcar como aplicada):**
```bash
npx prisma migrate resolve --applied "migration-name"
```

### Migrations fora de sincronia

**Solução:**
```bash
# Ver status
npx prisma migrate status

# Resolver manualmente
npx prisma migrate resolve --applied "nome"
# ou
npx prisma migrate resolve --rolled-back "nome"
```

---

## 📊 Estrutura de Arquivos

```
prisma/
├── schema.prisma              # Schema principal
└── migrations/
    ├── migration_lock.toml    # Lock file
    ├── 20241013120000_init/
    │   └── migration.sql      # SQL da primeira migration
    ├── 20241013130000_add_roles/
    │   └── migration.sql
    └── 20241013140000_add_appeals/
        └── migration.sql
```

---

## ✅ Checklist de Migration

Antes de criar migration:
- [ ] Schema está correto em `prisma/schema.prisma`
- [ ] Testei localmente
- [ ] Considerei dados existentes
- [ ] Nome descritivo para migration

Após criar migration:
- [ ] Arquivo SQL foi gerado corretamente
- [ ] Migration aplicou sem erros
- [ ] Prisma Client foi regenerado
- [ ] Testei a aplicação
- [ ] Commitei no Git

Deploy em produção:
- [ ] Todas migrations locais commitadas
- [ ] CI/CD configurado para rodar `migrate deploy`
- [ ] Backup do banco feito (se crítico)
- [ ] Variáveis de ambiente configuradas

---

## 🎓 Boas Práticas

1. **Nomes descritivos**: Use verbos e seja específico
   ```bash
   ✅ npx prisma migrate dev --name add-user-roles
   ❌ npx prisma migrate dev --name update
   ```

2. **Migrations pequenas**: Uma mudança por migration
   
3. **Testar localmente**: Sempre teste antes de commitar

4. **Backup**: Faça backup antes de migrations grandes

5. **Versionamento**: Commit migrations junto com código

6. **Documentar**: Adicione comentários em SQL se necessário

---

## 📚 Comandos Rápidos

```bash
# Desenvolvimento
npx prisma migrate dev                    # Criar + aplicar migration
npx prisma migrate dev --name nome        # Com nome específico
npx prisma migrate dev --create-only      # Criar sem aplicar

# Produção
npx prisma migrate deploy                 # Aplicar pendentes

# Informação
npx prisma migrate status                 # Ver status
npx prisma migrate resolve --help         # Ajuda resolver

# Manutenção
npx prisma migrate reset                  # Reset completo
npx prisma generate                       # Regerar client
npx prisma db push                        # Push sem migration (dev)

# Visualizar
npx prisma studio                         # Ver dados graficamente
```

---

**Última atualização**: Outubro 2024  
**Versão Prisma**: 5.7.1
