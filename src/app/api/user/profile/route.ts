import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Buscar dados do usuário
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar perfil' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar dados do usuário
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await req.json()
    const { name, cpf, phone, address } = data

    // Validação básica
    if (!name || !cpf || !phone || !address) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se CPF já está em uso por outro usuário
    if (cpf) {
      const existingUser = await prisma.user.findFirst({
        where: {
          cpf,
          NOT: {
            id: session.user.id,
          },
        },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'CPF já está em uso por outro usuário' },
          { status: 400 }
        )
      }
    }

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        cpf,
        phone,
        address,
      },
      select: {
        name: true,
        email: true,
        cpf: true,
        phone: true,
        address: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar perfil' },
      { status: 500 }
    )
  }
}
