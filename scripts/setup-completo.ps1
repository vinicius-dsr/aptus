# Script de Setup Completo - Aptus
# Execute com: .\scripts\setup-completo.ps1

Write-Host "🚀 Setup Completo do Projeto Aptus" -ForegroundColor Cyan
Write-Host "===================================`n" -ForegroundColor Cyan

# Função para verificar se comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# 1. Verificar Node.js
Write-Host "1️⃣ Verificando Node.js..." -ForegroundColor Yellow
if (Test-Command node) {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   Baixe em: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# 2. Verificar npm
Write-Host "`n2️⃣ Verificando npm..." -ForegroundColor Yellow
if (Test-Command npm) {
    $npmVersion = npm --version
    Write-Host "   ✅ npm instalado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ npm não encontrado!" -ForegroundColor Red
    exit 1
}

# 3. Verificar arquivo .env
Write-Host "`n3️⃣ Verificando arquivo .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ Arquivo .env existe" -ForegroundColor Green
    
    # Verificar NEXTAUTH_SECRET
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match 'NEXTAUTH_SECRET="[^"]+"') {
        Write-Host "   ✅ NEXTAUTH_SECRET configurado" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  NEXTAUTH_SECRET não encontrado, gerando..." -ForegroundColor Yellow
        & .\scripts\generate-env.ps1
    }
} else {
    Write-Host "   ⚠️  Arquivo .env não existe, criando..." -ForegroundColor Yellow
    & .\scripts\generate-env.ps1
}

# 4. Instalar dependências
Write-Host "`n4️⃣ Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "   📦 Instalando dependências (isso pode demorar)..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Dependências instaladas" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Erro ao instalar dependências" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   ✅ Dependências já instaladas" -ForegroundColor Green
}

# 5. Configurar banco de dados com migration
Write-Host "`n5️⃣ Configurando banco de dados (Supabase)..." -ForegroundColor Yellow
Write-Host "   📊 Criando primeira migration..." -ForegroundColor Cyan
npx prisma migrate dev --name init
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Migration criada e aplicada" -ForegroundColor Green
    Write-Host "   ✅ Prisma Client gerado automaticamente" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro ao criar migration" -ForegroundColor Red
    Write-Host "   Verifique a DATABASE_URL e DIRECT_URL no arquivo .env" -ForegroundColor Yellow
    Write-Host "   Ou use: .\scripts\setup-database.ps1 para mais opções" -ForegroundColor Yellow
    exit 1
}

# 6. Criar administrador
Write-Host "`n6️⃣ Criando usuário administrador..." -ForegroundColor Yellow
$createAdmin = Read-Host "   Deseja criar o admin padrão agora? (s/n)"
if ($createAdmin -eq "s") {
    npm run db:seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Administrador criado!" -ForegroundColor Green
        Write-Host "`n   📝 Credenciais:" -ForegroundColor Cyan
        Write-Host "      Email: admin@aptus.com" -ForegroundColor White
        Write-Host "      Senha: admin123" -ForegroundColor White
        Write-Host "      ⚠️  Altere a senha após o primeiro login!" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⏭️  Pulado. Execute 'npm run db:seed' quando quiser." -ForegroundColor Gray
}

# Resumo final
Write-Host "`n✨ Setup Concluído com Sucesso!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Green

Write-Host "📋 Configurações:" -ForegroundColor Cyan
Write-Host "   ✅ Node.js: $nodeVersion" -ForegroundColor White
Write-Host "   ✅ npm: $npmVersion" -ForegroundColor White
Write-Host "   ✅ Dependências instaladas" -ForegroundColor White
Write-Host "   ✅ Banco de dados configurado" -ForegroundColor White
Write-Host "   ✅ Prisma Client gerado" -ForegroundColor White

Write-Host "`n🚀 Para iniciar o servidor:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White

Write-Host "`n🌐 Acesse:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White

Write-Host "`n📚 Documentação:" -ForegroundColor Cyan
Write-Host "   CONFIGURACAO.md - Guia de configuração" -ForegroundColor White
Write-Host "   ADMIN.md - Sistema de administradores" -ForegroundColor White
Write-Host "   README.md - Documentação geral" -ForegroundColor White
Write-Host "   APIS.md - Configuração de APIs" -ForegroundColor White

Write-Host "`n⚠️  Lembre-se de configurar o EMAIL no arquivo .env!" -ForegroundColor Yellow
Write-Host "   Veja CONFIGURACAO.md seção 'Configuração de Email'" -ForegroundColor Yellow

Write-Host "`n🎉 Bom desenvolvimento!" -ForegroundColor Green
