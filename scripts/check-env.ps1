# Script para verificar configuração e gerar NEXTAUTH_SECRET
# Execute: .\scripts\check-env.ps1

Write-Host "🔍 Verificando Configuração..." -ForegroundColor Cyan
Write-Host "==============================`n" -ForegroundColor Cyan

# Verificar banco com DATABASE_URL de produção
Write-Host "📊 Verificando dados no banco..." -ForegroundColor Yellow
Write-Host "Abrindo Prisma Studio...`n" -ForegroundColor White
Write-Host "⚠️  Certifique-se que o .env tem DATABASE_URL de PRODUÇÃO!`n" -ForegroundColor Yellow

# Gerar NEXTAUTH_SECRET
Write-Host "🔑 Gerando novo NEXTAUTH_SECRET..." -ForegroundColor Yellow
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

Write-Host "✅ NEXTAUTH_SECRET gerado:`n" -ForegroundColor Green
Write-Host "$secret`n" -ForegroundColor Cyan

Write-Host "📋 Cole este valor na Vercel:" -ForegroundColor Yellow
Write-Host "   1. Acesse: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   2. Seu projeto → Settings → Environment Variables" -ForegroundColor White
Write-Host "   3. Edite ou adicione NEXTAUTH_SECRET" -ForegroundColor White
Write-Host "   4. Cole o valor acima" -ForegroundColor White
Write-Host "   5. IMPORTANTE: Clique em Redeploy!`n" -ForegroundColor Red

Write-Host "🧪 Verificar dados no banco:" -ForegroundColor Yellow
Write-Host "   npx prisma studio`n" -ForegroundColor White

$response = Read-Host "Deseja abrir Prisma Studio agora? (S/n)"
if ($response -eq "" -or $response -eq "s" -or $response -eq "S") {
    Write-Host "`n🚀 Abrindo Prisma Studio..." -ForegroundColor Green
    npx prisma studio
}
