# Script de inicialização para Windows (PowerShell)
# Execute com: .\scripts\init.ps1

Write-Host "🚀 Iniciando configuração do Aptus..." -ForegroundColor Cyan

# Verificar Node.js
Write-Host "`n📦 Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js não encontrado! Instale em: https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion instalado" -ForegroundColor Green

# Verificar npm
$npmVersion = npm --version 2>$null
Write-Host "✅ npm $npmVersion instalado" -ForegroundColor Green

# Instalar dependências
Write-Host "`n📥 Instalando dependências..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependências instaladas" -ForegroundColor Green

# Verificar .env
Write-Host "`n🔐 Verificando arquivo .env..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Arquivo .env não encontrado!" -ForegroundColor Yellow
    Write-Host "📋 Copiando .env.example para .env..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  IMPORTANTE: Configure as variáveis no arquivo .env antes de continuar!" -ForegroundColor Red
    Write-Host "   - DATABASE_URL" -ForegroundColor Yellow
    Write-Host "   - NEXTAUTH_SECRET" -ForegroundColor Yellow
    Write-Host "   - OPENAI_API_KEY" -ForegroundColor Yellow
    Write-Host "   - EMAIL_* (configurações de email)" -ForegroundColor Yellow
    Write-Host "`n📖 Veja APIS.md para instruções detalhadas" -ForegroundColor Cyan
    
    $continue = Read-Host "`nDeseja continuar? (s/n)"
    if ($continue -ne "s") {
        exit 0
    }
}
Write-Host "✅ Arquivo .env encontrado" -ForegroundColor Green

# Gerar Prisma Client
Write-Host "`n🔧 Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client gerado" -ForegroundColor Green

# Tentar conectar ao banco
Write-Host "`n🗄️  Tentando conectar ao banco de dados..." -ForegroundColor Yellow
npx prisma db push 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Banco de dados conectado e tabelas criadas" -ForegroundColor Green
} else {
    Write-Host "⚠️  Não foi possível conectar ao banco de dados" -ForegroundColor Yellow
    Write-Host "   Verifique a DATABASE_URL no arquivo .env" -ForegroundColor Yellow
    Write-Host "   Execute 'npx prisma db push' quando o banco estiver configurado" -ForegroundColor Yellow
}

# Finalizar
Write-Host "`n✨ Configuração concluída!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Configure as variáveis no arquivo .env" -ForegroundColor White
Write-Host "   2. Execute: npx prisma db push (se ainda não executou)" -ForegroundColor White
Write-Host "   3. Execute: npm run dev" -ForegroundColor White
Write-Host "   4. Acesse: http://localhost:3000" -ForegroundColor White
Write-Host "`n📚 Documentação:" -ForegroundColor Cyan
Write-Host "   - SETUP.md - Guia completo de setup" -ForegroundColor White
Write-Host "   - APIS.md - Configuração de APIs" -ForegroundColor White
Write-Host "   - README.md - Documentação geral" -ForegroundColor White
Write-Host "`n🎉 Bom desenvolvimento!" -ForegroundColor Green
