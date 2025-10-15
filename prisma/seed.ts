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

  // 3. Criar templates de recursos
  console.log('\n📄 Criando templates de recursos...')
  
  const templates = [
    {
      type: 'recurso',
      target: 'com_cnh',
      content: `RECURSO ADMINISTRATIVO DE INFRAÇÃO DE TRÂNSITO

ILUSTRÍSSIMO(A) SENHOR(A) PRESIDENTE DA JUNTA ADMINISTRATIVA DE RECURSOS DE INFRAÇÕES (JARI)

RECORRENTE: [NOME_COMPLETO]
CPF: [CPF]
ENDEREÇO: [ENDERECO]

VEÍCULO:
PLACA: [PLACA]
RENAVAM: [RENAVAM]

I. EXPOSIÇÃO DOS FATOS

Venho, respeitosamente, apresentar RECURSO ADMINISTRATIVO contra o Auto de Infração nº [NUMERO_AUTO], lavrado em [DATA_INFRACAO], pelo órgão [ORGAO_AUTUADOR], pelo cometimento da infração prevista no art. [CODIGO_INFRACAO] do CTB.

II. FUNDAMENTAÇÃO JURÍDICA

Art. 280 do CTB - O auto de infração será lavrado no local da infração, sendo proibida a remoção do veículo antes da lavratura.
Art. 281 do CTB - O auto de infração deverá conter, obrigatoriamente, as seguintes indicações: [...]

III. DOS PEDIDOS

Diante do exposto, requer-se:
a) Arquivamento do auto de infração
b) Declaração de insubsistência do registro
c) Concessão de efeito suspensivo

[LOCAL_DATA]

_____________________________
Assinatura do Recorrente`
    },
    {
      type: 'defesa_previa',
      target: 'sem_cnh',
      content: `DEFESA PRÉVIA CONTRA MULTA DE TRÂNSITO

ILUSTRÍSSIMO(A) SENHOR(A) [ORGAO_AUTUADOR]

RESPONSÁVEL: [NOME_COMPLETO]
CPF: [CPF]
ENDEREÇO: [ENDERECO]

VEÍCULO:
PLACA: [PLACA]
RENAVAM: [RENAVAM]

I. EXPOSIÇÃO DOS FATOS

Venho, respeitosamente, apresentar DEFESA PRÉVIA contra a Notificação de Infração nº [NUMERO_AUTO], lavrada em [DATA_INFRACAO], pelo órgão [ORGAO_AUTUADOR].

IMPORTANTE: Não possuo Carteira Nacional de Habilitação válida, razão pela qual não conduzia o veículo no momento da infração.

II. FUNDAMENTAÇÃO JURÍDICA

Art. 257 do CTB - Ao proprietário do veículo cabe a responsabilidade pelo pagamento das multas, excetuadas as situações em que o veículo seja furtado ou roubado.
Art. 281 do CTB - Garantido o direito à ampla defesa e ao contraditório em sede administrativa.

III. DOS PEDIDOS

Diante do exposto, requer-se:
a) Arquivamento da defesa/notificação
b) Possibilidade de indicação do verdadeiro condutor
c) Concessão de prazo para apresentação de condutor

[LOCAL_DATA]

_____________________________
Assinatura do Proprietário`
    },
    {
      type: 'indicacao_condutor',
      target: 'sem_cnh',
      content: `INDICAÇÃO DE CONDUTOR

ILUSTRÍSSIMO(A) SENHOR(A) [ORGAO_AUTUADOR]

PROPRIETÁRIO: [NOME_COMPLETO]
CPF: [CPF]

CONDUTOR INDICADO: [NOME_CONDUTOR]
CPF: [CPF_CONDUTOR]
CNH: [NUMERO_CNH]

VEÍCULO:
PLACA: [PLACA]
RENAVAM: [RENAVAM]

I. DA INDICAÇÃO

Venho, por meio desta, indicar [NOME_CONDUTOR], CPF [CPF_CONDUTOR], portador da CNH nº [NUMERO_CNH], como o verdadeiro condutor do veículo de placa [PLACA] no momento da infração registrada no Auto nº [NUMERO_AUTO].

II. DECLARAÇÃO

Declaro, sob as penas da lei, que as informações acima são verdadeiras e que assumo integral responsabilidade pelas mesmas.

[LOCAL_DATA]

_____________________________
Assinatura do Proprietário

_____________________________
Assinatura do Condutor Indicado`
    }
  ]

  for (const templateData of templates) {
    const existingTemplate = await prisma.template.findFirst({
      where: {
        type: templateData.type,
        target: templateData.target
      }
    })

    if (existingTemplate) {
      console.log(`   ⏭️  Template ${templateData.type} (${templateData.target}) já existe`)
    } else {
      await prisma.template.create({ data: templateData })
      console.log(`   ✅ Template ${templateData.type} (${templateData.target}) criado`)
    }
  }

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log('\n📋 Resumo:')
  console.log('   ✅ 4 planos criados')
  console.log('   ✅ Admin criado (se configurado)')
  console.log('   ✅ Templates de recursos criados')

}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
