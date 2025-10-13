# Script para corrigir problemas do Tesseract.js
# Execute com: .\scripts\fix-tesseract.ps1

Write-Host "🔧 Corrigindo problemas do Tesseract.js..." -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 1. Parar servidor se estiver rodando
Write-Host "1️⃣ Parando servidor Next.js..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "   ✅ Servidor parado`n" -ForegroundColor Green

# 2. Limpar cache do Next.js
Write-Host "2️⃣ Limpando cache do Next.js..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✅ Cache .next removido" -ForegroundColor Green
} else {
    Write-Host "   ⏭️  Sem cache para limpar" -ForegroundColor Gray
}

# 3. Limpar node_modules/.cache
Write-Host "`n3️⃣ Limpando cache de módulos..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "   ✅ Cache de módulos removido" -ForegroundColor Green
} else {
    Write-Host "   ⏭️  Sem cache para limpar" -ForegroundColor Gray
}

# 4. Reinstalar Tesseract.js
Write-Host "`n4️⃣ Reinstalando Tesseract.js..." -ForegroundColor Yellow
npm uninstall tesseract.js
npm install tesseract.js@latest
Write-Host "   ✅ Tesseract.js reinstalado" -ForegroundColor Green

# 5. Rebuild Next.js
Write-Host "`n5️⃣ Reconstruindo Next.js..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Build concluído com sucesso" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Build teve avisos, mas pode estar OK" -ForegroundColor Yellow
}

Write-Host "`n✨ Correção concluída!" -ForegroundColor Green
Write-Host "==================`n" -ForegroundColor Green

Write-Host "🚀 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Execute: npm run dev" -ForegroundColor White
Write-Host "   2. Teste criar um recurso" -ForegroundColor White
Write-Host "   3. Se ainda der erro, reinicie o computador`n" -ForegroundColor White

Write-Host "💡 Dica: O Tesseract pode demorar no primeiro uso" -ForegroundColor Yellow
Write-Host "   enquanto baixa os dados de OCR (~50MB)`n" -ForegroundColor Yellow
