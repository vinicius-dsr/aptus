import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // 1. Criar planos
  console.log('\n📊 Criando planos de assinatura...')
  
  const plans = [
    {
      name: 'free',
      displayName: 'Gratuito',
      description: 'Ideal para testar o serviço',
      price: 0,
      appealsPerMonth: 2,
      features: [
        '2 recursos por mês',
        'Suporte por email',
        'Geração com IA',
        'Download em PDF'
      ],
      order: 1
    },
    {
      name: 'basic',
      displayName: 'Básico',
      description: 'Para uso pessoal',
      price: 29.90,
      appealsPerMonth: 10,
      features: [
        '10 recursos por mês',
        'Suporte prioritário',
        'Geração com IA avançada',
        'Download em PDF',
        'Envio automático por email',
        'Histórico completo'
      ],
      order: 2
    },
    {
      name: 'pro',
      displayName: 'Profissional',
      description: 'Para profissionais e escritórios',
      price: 79.90,
      appealsPerMonth: 50,
      features: [
        '50 recursos por mês',
        'Suporte prioritário 24/7',
        'IA avançada com contexto',
        'Download em PDF',
        'Envio automático',
        'Histórico ilimitado',
        'Templates personalizados',
        'Múltiplos usuários'
      ],
      order: 3
    },
    {
      name: 'enterprise',
      displayName: 'Empresarial',
      description: 'Para grandes escritórios',
      price: 199.90,
      appealsPerMonth: 999,
      features: [
        'Recursos ilimitados',
        'Suporte dedicado',
        'IA customizada',
        'API de integração',
        'White label',
        'Relatórios avançados',
        'Gestão de equipe',
        'SLA garantido'
      ],
      order: 4
    }
  ]

  for (const planData of plans) {
    const existingPlan = await prisma.plan.findUnique({
      where: { name: planData.name }
    })

    if (existingPlan) {
      console.log(`   ⏭️  Plano ${planData.displayName} já existe`)
    } else {
      await prisma.plan.create({ data: planData })
      console.log(`   ✅ Plano ${planData.displayName} criado`)
    }
  }

  // 2. Criar usuário admin (requer variáveis de ambiente)
  console.log('\n👤 Criando usuário administrador...')
  
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.log('   ❌ ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidos nas variáveis de ambiente')
    console.log('   Exemplo: ADMIN_EMAIL=admin@aptus.com ADMIN_PASSWORD=senha_segura')
    process.exit(1)
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log(`   ✅ Admin já existe: ${adminEmail}`)
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    console.log(`   ✅ Admin criado com sucesso!`)
    console.log(`   📧 Email: ${admin.email}`)
    console.log(`   ⚠️  ALTERE A SENHA APÓS O PRIMEIRO LOGIN!`)
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log('\n📋 Resumo:')
  console.log('   ✅ 4 planos criados')
  console.log('   ✅ Admin criado (se configurado)')

}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
