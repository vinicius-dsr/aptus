# Script para configurar sistema de administradores
# Execute com: .\scripts\setup-admin.ps1

Write-Host "🔐 Configurando Sistema de Administradores..." -ForegroundColor Cyan

# 1. Atualizar banco de dados com novo campo 'role'
Write-Host "`n📊 Atualizando schema do banco de dados..." -ForegroundColor Yellow
npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao atualizar banco de dados" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Banco de dados atualizado" -ForegroundColor Green

# 2. Gerar Prisma Client atualizado
Write-Host "`n🔧 Gerando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao gerar Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma Client gerado" -ForegroundColor Green

# 3. Perguntar se deseja criar admin
Write-Host "`n👤 Deseja criar um usuário administrador agora?" -ForegroundColor Cyan
$createAdmin = Read-Host "Digite 's' para sim ou 'n' para não"

if ($createAdmin -eq "s") {
    Write-Host "`n📋 Criando administrador..." -ForegroundColor Yellow
    npm run db:seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Sistema de administradores configurado com sucesso!" -ForegroundColor Green
        Write-Host "`n📝 Credenciais padrão (se criado):" -ForegroundColor Cyan
        Write-Host "   Email: admin@aptus.com" -ForegroundColor White
        Write-Host "   Senha: admin123" -ForegroundColor White
        Write-Host "`n⚠️  IMPORTANTE: Altere a senha após o primeiro login!" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n✅ Banco atualizado! Execute 'npm run admin:create' quando quiser criar um admin." -ForegroundColor Green
}

Write-Host "`n📚 Comandos disponíveis:" -ForegroundColor Cyan
Write-Host "   npm run db:seed       - Criar admin padrão (admin@aptus.com / admin123)" -ForegroundColor White
Write-Host "   npm run admin:create  - Criar admin personalizado (interativo)" -ForegroundColor White
Write-Host "`n🎉 Pronto!" -ForegroundColor Green
