import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

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
