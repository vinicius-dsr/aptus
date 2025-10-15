import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    await requireAdmin()

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        subscription: {
          select: {
            plan: {
              select: {
                displayName: true
              }
            },
            status: true,
            appealsUsed: true,
            appealsLimit: true
          }
        },
        _count: {
          select: {
            appeals: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(users)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Acesso negado' },
      { status: 403 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const body = await req.json()
    const { name, email, password, cpf, phone, address, role, possuiCnh } = body

    // Validações básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        phone,
        address,
        role: role || 'USER',
        possuiCnh: possuiCnh || false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        possuiCnh: true,
        createdAt: true,
      }
    })

    return NextResponse.json(newUser)
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}
