# Script para gerar NEXTAUTH_SECRET e configurar .env
# Execute com: .\scripts\generate-env.ps1

Write-Host "🔐 Configurando variáveis de ambiente..." -ForegroundColor Cyan

# Gerar NEXTAUTH_SECRET
Write-Host "`n🔑 Gerando NEXTAUTH_SECRET..." -ForegroundColor Yellow

# Gerar string aleatória de 32 bytes em base64
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

Write-Host "✅ NEXTAUTH_SECRET gerado:" -ForegroundColor Green
Write-Host $secret -ForegroundColor White

# Verificar se .env já existe
if (Test-Path ".env") {
    Write-Host "`n⚠️  Arquivo .env já existe!" -ForegroundColor Yellow
    $overwrite = Read-Host "Deseja atualizar apenas o NEXTAUTH_SECRET? (s/n)"
    
    if ($overwrite -eq "s") {
        $content = Get-Content ".env" -Raw
        if ($content -match 'NEXTAUTH_SECRET="[^"]*"') {
            $content = $content -replace 'NEXTAUTH_SECRET="[^"]*"', "NEXTAUTH_SECRET=`"$secret`""
            Set-Content ".env" $content -NoNewline
            Write-Host "✅ NEXTAUTH_SECRET atualizado no .env" -ForegroundColor Green
        } else {
            Write-Host "⚠️  NEXTAUTH_SECRET não encontrado. Adicione manualmente:" -ForegroundColor Yellow
            Write-Host "NEXTAUTH_SECRET=`"$secret`"" -ForegroundColor White
        }
    }
} else {
    Write-Host "`n📝 Criando arquivo .env..." -ForegroundColor Yellow
    
    # Copiar do .env.example se existir
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        
        # Atualizar NEXTAUTH_SECRET
        $content = Get-Content ".env" -Raw
        $content = $content -replace 'NEXTAUTH_SECRET="[^"]*"', "NEXTAUTH_SECRET=`"$secret`""
        Set-Content ".env" $content -NoNewline
        
        Write-Host "✅ Arquivo .env criado a partir do .env.example" -ForegroundColor Green
        Write-Host "✅ NEXTAUTH_SECRET configurado" -ForegroundColor Green
    } else {
        Write-Host "❌ .env.example não encontrado!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n✨ Configuração concluída!" -ForegroundColor Green
Write-Host "`n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Verifique se todas as variáveis estão corretas no .env" -ForegroundColor White
Write-Host "   2. Execute: npx prisma db push" -ForegroundColor White
Write-Host "   3. Execute: npx prisma generate" -ForegroundColor White
Write-Host "   4. Execute: npm run db:seed (criar admin)" -ForegroundColor White
Write-Host "   5. Execute: npm run dev" -ForegroundColor White
