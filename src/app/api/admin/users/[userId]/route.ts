import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin()

    const { userId } = params
    const body = await request.json()

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: body.isActive
      }
    })

    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao atualizar usuário' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin()

    const { userId } = params

    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ message: 'Usuário removido com sucesso' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao remover usuário' },
      { status: 400 }
    )
  }
}
