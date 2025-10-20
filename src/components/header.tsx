import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Aptus</span>
            </div>
          </Link>
          <nav className="flex space-x-2 items-center">
            <Link href="">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                Como funciona
              </Button>
            </Link>
            <Link href="">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                Planos
              </Button>
            </Link>
            <Link href="">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                Pedidos
              </Button>
            </Link>
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex "
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="sm"
                className=""
              >
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}