# 🔐 Sistema de Administradores - Aptus

## 📋 Visão Geral

O sistema possui dois tipos de usuários:
- **USER** (padrão): Pode criar e gerenciar seus próprios recursos
- **ADMIN**: Acesso completo ao sistema + painel administrativo

## 🚀 Configuração Inicial

### 1. Atualizar Banco de Dados

O schema foi atualizado para incluir o campo `role`. Execute:

```powershell
.\scripts\setup-admin.ps1
```

OU manualmente:

```bash
# Atualizar tabelas
npx prisma db push

# Gerar Prisma Client
npx prisma generate
```

### 2. Criar Primeiro Administrador

#### Opção A: Admin Padrão (Rápido)

```bash
npm run db:seed
```

Isso cria:
- **Email**: `admin@aptus.com`
- **Senha**: `admin123`

⚠️ **ALTERE A SENHA APÓS O PRIMEIRO LOGIN!**

#### Opção B: Admin Personalizado (Recomendado)

```bash
npm run admin:create
```

O script pedirá:
1. Nome
2. Email
3. Senha
4. CPF (opcional)

#### Opção C: Variáveis de Ambiente

```bash
# No .env
ADMIN_EMAIL="seu-admin@empresa.com"
ADMIN_PASSWORD="senha-segura-aqui"

# Depois execute
npm run db:seed
```

## 👤 Criar Mais Administradores

### Via Script (Recomendado)

```bash
npm run admin:create
```

### Via Código (API)

Crie uma rota temporária ou use o Prisma Studio:

```typescript
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const hashedPassword = await bcrypt.hash('senha', 10)

await prisma.user.create({
  data: {
    name: 'Novo Admin',
    email: 'admin2@aptus.com',
    password: hashedPassword,
    role: 'ADMIN',
  },
})
```

### Via Prisma Studio (Visual)

```bash
npx prisma studio
```

1. Abra a tabela `User`
2. Crie um novo usuário
3. Defina `role` como `ADMIN`
4. Senha deve ser hasheada com bcrypt

## 🎯 Funcionalidades Admin

### Painel Administrativo

Acesse: **http://localhost:3000/admin**

O painel mostra:
- ✅ Total de usuários
- ✅ Total de recursos
- ✅ Recursos pendentes
- ✅ Recursos concluídos

### Navegação

Quando logado como admin, você verá um botão **"Admin"** no menu superior.

### Proteção de Rotas

Rotas protegidas automaticamente:
- `/admin/*` - Apenas admins
- `/api/admin/*` - Apenas admins

## 🔒 Segurança

### Verificar se é Admin (Server)

```typescript
import { requireAdmin } from '@/lib/admin'

export async function GET() {
  await requireAdmin() // Throws error se não for admin
  // Seu código aqui
}
```

### Verificar se é Admin (Client)

```typescript
'use client'
import { useSession } from 'next-auth/react'

export default function Component() {
  const { data: session } = useSession()
  
  if (session?.user?.role !== 'ADMIN') {
    return <div>Acesso negado</div>
  }
  
  return <div>Conteúdo admin</div>
}
```

### Mostrar Conteúdo Condicional

```typescript
{session?.user?.role === 'ADMIN' && (
  <Link href="/admin">
    <Button>Painel Admin</Button>
  </Link>
)}
```

## 📊 Schema do Banco

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  cpf           String?   @unique
  phone         String?
  image         String?
  role          UserRole  @default(USER)  // ← NOVO
  accounts      Account[]
  sessions      Session[]
  appeals       Appeal[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum UserRole {
  USER
  ADMIN
}
```

## 🛠️ Comandos Úteis

```bash
# Criar admin padrão
npm run db:seed

# Criar admin personalizado (interativo)
npm run admin:create

# Atualizar banco de dados
npm run db:push

# Ver dados no navegador
npx prisma studio

# Gerar Prisma Client
npx prisma generate
```

## 🔄 Promover Usuário Existente a Admin

### Via Prisma Studio:

1. Execute: `npx prisma studio`
2. Abra tabela `User`
3. Encontre o usuário
4. Clique nele
5. Mude `role` de `USER` para `ADMIN`
6. Salve

### Via Script (criar um):

```typescript
// scripts/promote-user.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  
  if (!email) {
    console.error('Uso: npm run promote <email>')
    process.exit(1)
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  })

  console.log(`✅ ${user.name} agora é ADMIN!`)
}

main()
```

Adicione ao `package.json`:
```json
"scripts": {
  "promote": "tsx scripts/promote-user.ts"
}
```

Use:
```bash
npm run promote usuario@email.com
```

## ❓ Troubleshooting

### Erro: "role does not exist"

Execute:
```bash
npx prisma db push
npx prisma generate
```

### Erro: "requireAdmin is not defined"

Reinicie o servidor:
```bash
npm run dev
```

### Admin não consegue acessar /admin

Verifique:
1. Usuário tem `role: 'ADMIN'` no banco?
2. Fez logout/login após criar admin?
3. Prisma Client foi regenerado?

### Como resetar senha de admin?

```typescript
import bcrypt from 'bcryptjs'
const newPassword = await bcrypt.hash('nova-senha', 10)

await prisma.user.update({
  where: { email: 'admin@aptus.com' },
  data: { password: newPassword },
})
```

## 🎯 Próximas Funcionalidades (TODO)

- [ ] Gerenciar usuários (listar, editar, deletar)
- [ ] Ver todos os recursos do sistema
- [ ] Logs de auditoria
- [ ] Configurações globais
- [ ] Templates de recursos customizáveis
- [ ] Estatísticas avançadas
- [ ] Exportar dados (CSV, Excel)
- [ ] Sistema de notificações

## 📞 Suporte

Em caso de problemas, verifique:
1. Logs do servidor (`npm run dev`)
2. Console do navegador (F12)
3. Prisma Studio (`npx prisma studio`)

---

**Criado em**: Outubro 2024  
**Versão**: 1.0.0
