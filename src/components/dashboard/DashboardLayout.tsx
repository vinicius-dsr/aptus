'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, LogOut, User, History, Shield, Menu, X } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Novo Recurso', href: '/dashboard', icon: FileText },
    { name: 'Histórico', href: '/dashboard/history', icon: History },
  ]

  if (session?.user?.role === 'ADMIN') {
    navigation.push({ name: 'Admin', href: '/admin', icon: Shield })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
            <SidebarContent navigation={navigation} session={session} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-white shadow-lg">
          <SidebarContent navigation={navigation} session={session} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar for mobile */}
        <div className="sticky top-0 z-40 bg-white border-b lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Aptus</span>
            </Link>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        <main className="px-4 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

interface SidebarContentProps {
  navigation: Array<{ name: string; href: string; icon: any }>
  session: any
  onClose?: () => void
}

function SidebarContent({ navigation, session, onClose }: SidebarContentProps) {
  return (
    <>
      <div className="flex items-center justify-between p-6 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
          <FileText className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Aptus</span>
        </Link>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900"
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Link href="/dashboard/profile" onClick={onClose}>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Meu Perfil
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </>
  )
}
