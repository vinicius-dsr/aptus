import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer)
    })
  })
}

async function main() {
  console.log('🔐 Criar Novo Administrador\n')

  const name = await question('Nome: ')
  const email = await question('Email: ')
  const password = await question('Senha: ')
  const cpf = await question('CPF (opcional): ')

  if (!name || !email || !password) {
    console.error('❌ Nome, email e senha são obrigatórios!')
    process.exit(1)
  }

  // Verificar se já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.error(`❌ Já existe um usuário com o email: ${email}`)
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      cpf: cpf || undefined,
      role: 'ADMIN',
    },
  })

  console.log('\n✅ Administrador criado com sucesso!')
  console.log(`   ID: ${admin.id}`)
  console.log(`   Nome: ${admin.name}`)
  console.log(`   Email: ${admin.email}`)
  console.log(`   Role: ${admin.role}`)
  console.log('\n🎉 Agora você pode fazer login com essas credenciais!')
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    rl.close()
  })
