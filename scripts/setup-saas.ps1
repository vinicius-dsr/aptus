# Script para configurar sistema SaaS completo
# Execute com: .\scripts\setup-saas.ps1

Write-Host "💼 Setup do Sistema SaaS - Aptus" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# 1. Verificar se está tudo OK
Write-Host "1️⃣ Verificando ambiente..." -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "   📦 Instalando dependências..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   ❌ Erro ao instalar dependências" -ForegroundColor Red
        exit 1
    }
}
Write-Host "   ✅ Dependências OK" -ForegroundColor Green

# 2. Criar migration do SaaS
Write-Host "`n2️⃣ Criando migration do sistema SaaS..." -ForegroundColor Yellow
Write-Host "   Isso vai adicionar:" -ForegroundColor Cyan
Write-Host "   - Tabela Plan (planos)" -ForegroundColor White
Write-Host "   - Tabela Subscription (assinaturas)" -ForegroundColor White
Write-Host "   - Campo isActive em User" -ForegroundColor White
Write-Host "   - Enums de status`n" -ForegroundColor White

npx prisma migrate dev --name add-saas-system

if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Erro ao criar migration" -ForegroundColor Red
    Write-Host "   Verifique a DATABASE_URL no .env" -ForegroundColor Yellow
    exit 1
}

Write-Host "   ✅ Migration criada e aplicada" -ForegroundColor Green

# 3. Popular com planos
Write-Host "`n3️⃣ Populando banco de dados..." -ForegroundColor Yellow
Write-Host "   Criando:" -ForegroundColor Cyan
Write-Host "   - 4 planos (Gratuito, Básico, Pro, Enterprise)" -ForegroundColor White
Write-Host "   - Admin padrão (admin@aptus.com)" -ForegroundColor White
Write-Host "   - Usuário demo (demo@aptus.com)`n" -ForegroundColor White

npm run db:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Erro ao popular banco" -ForegroundColor Red
    exit 1
}

Write-Host "   ✅ Banco populado com sucesso" -ForegroundColor Green

# 4. Resumo final
Write-Host "`n✨ Sistema SaaS configurado com sucesso!" -ForegroundColor Green
Write-Host "=========================================`n" -ForegroundColor Green

Write-Host "📊 Planos Criados:" -ForegroundColor Cyan
Write-Host "   🆓 Gratuito    - R$ 0,00   (2 recursos/mês)" -ForegroundColor White
Write-Host "   💎 Básico      - R$ 29,90  (10 recursos/mês)" -ForegroundColor White
Write-Host "   🚀 Pro         - R$ 79,90  (50 recursos/mês)" -ForegroundColor White
Write-Host "   🏢 Enterprise  - R$ 199,90 (999 recursos/mês)`n" -ForegroundColor White

Write-Host "👤 Usuários Criados:" -ForegroundColor Cyan
Write-Host "   Admin: Configure ADMIN_EMAIL e ADMIN_PASSWORD no .env" -ForegroundColor White
Write-Host "   Demo: Removido para segurança" -ForegroundColor White

Write-Host "🌐 URLs Disponíveis:" -ForegroundColor Cyan
Write-Host "   Dashboard:     http://localhost:3000/dashboard" -ForegroundColor White
Write-Host "   Admin:         http://localhost:3000/admin" -ForegroundColor White
Write-Host "   Planos:        http://localhost:3000/plans" -ForegroundColor White
Write-Host "   Gerenciar:     http://localhost:3000/admin/users`n" -ForegroundColor White

Write-Host "🚀 Para iniciar o servidor:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "📚 Documentação:" -ForegroundColor Cyan
Write-Host "   SAAS.md        - Sistema SaaS completo" -ForegroundColor White
Write-Host "   ADMIN.md       - Sistema de administradores" -ForegroundColor White
Write-Host "   README.md      - Documentação geral`n" -ForegroundColor White

Write-Host "⚠️  Lembre-se:" -ForegroundColor Yellow
Write-Host "   - Altere as senhas padrão após primeiro login" -ForegroundColor White
Write-Host "   - Configure EMAIL no .env para envio funcionar" -ForegroundColor White
Write-Host "   - O sistema já controla limites automaticamente`n" -ForegroundColor White

Write-Host "🎉 Pronto para usar!" -ForegroundColor Green
