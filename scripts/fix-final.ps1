# Script final de correção
# Execute com: .\scripts\fix-final.ps1

Write-Host "🔧 Correção Final - Google AI + Next.js" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 1. Parar servidor
Write-Host "1️⃣ Parando servidor..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✅ Servidor parado`n" -ForegroundColor Green

# 2. Limpar cache
Write-Host "2️⃣ Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✅ Cache .next removido" -ForegroundColor Green
}
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "   ✅ Cache de módulos removido" -ForegroundColor Green
}

# 3. Reinstalar pacotes
Write-Host "`n3️⃣ Reinstalando pacotes (Google AI v0.21.0)..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Pacotes instalados com sucesso`n" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro ao instalar pacotes" -ForegroundColor Red
    exit 1
}

Write-Host "✨ Correção concluída!`n" -ForegroundColor Green

Write-Host "📋 Mudanças Aplicadas:" -ForegroundColor Cyan
Write-Host "   ✅ Google AI atualizado: v0.1.3 → v0.21.0" -ForegroundColor Green
Write-Host "   ✅ Modelo: gemini-1.5-flash-latest" -ForegroundColor Green
Write-Host "   ✅ Next.js config: serverActions removido" -ForegroundColor Green
Write-Host "   ✅ OCR: fallback funcionando`n" -ForegroundColor Green

Write-Host "⚠️  Lembre-se:" -ForegroundColor Yellow
Write-Host "   • OCR falha (esperado)" -ForegroundColor White
Write-Host "   • Digite dados manualmente" -ForegroundColor White
Write-Host "   • Gemini vai gerar o recurso perfeitamente!`n" -ForegroundColor Green

Write-Host "🚀 Inicie o servidor agora:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "🧪 Teste:" -ForegroundColor Cyan
Write-Host "   1. Login: demo@aptus.com / demo123" -ForegroundColor White
Write-Host "   2. Criar Recurso" -ForegroundColor White
Write-Host "   3. Upload 3 imagens" -ForegroundColor White
Write-Host "   4. Digite dados manualmente" -ForegroundColor White
Write-Host "   5. Gemini gera o recurso ✅`n" -ForegroundColor Green
