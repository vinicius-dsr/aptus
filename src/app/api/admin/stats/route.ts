import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await requireAdmin()

    const [totalUsers, totalAppeals, pendingAppeals, completedAppeals] = await Promise.all([
      prisma.user.count(),
      prisma.appeal.count(),
      prisma.appeal.count({ where: { status: 'PENDING' } }),
      prisma.appeal.count({ where: { status: 'COMPLETED' } }),
    ])

    return NextResponse.json({
      totalUsers,
      totalAppeals,
      pendingAppeals,
      completedAppeals,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Acesso negado' },
      { status: 403 }
    )
  }
}
