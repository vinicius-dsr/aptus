# Script final para Google AI
# Execute com: .\scripts\setup-google-ai-final.ps1

Write-Host "🤖 Setup Final Google AI" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

# 1. Parar servidor
Write-Host "1️⃣ Parando servidor..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✅ Parado`n" -ForegroundColor Green

# 2. Limpar cache
Write-Host "2️⃣ Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules\.cache") { Remove-Item -Recurse -Force "node_modules\.cache" }
Write-Host "   ✅ Cache limpo`n" -ForegroundColor Green

# 3. Instalar pacote correto
Write-Host "3️⃣ Instalando @google/generative-ai v0.21.0..." -ForegroundColor Yellow
npm install @google/generative-ai@0.21.0
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Instalado`n" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro na instalação" -ForegroundColor Red
    exit 1
}

Write-Host "✨ Setup concluído!`n" -ForegroundColor Green

Write-Host "📋 Configuração:" -ForegroundColor Cyan
Write-Host "   ✅ Pacote: @google/generative-ai v0.21.0" -ForegroundColor Green
Write-Host "   ✅ Modelo: gemini-2.5-flash" -ForegroundColor Green  
Write-Host "   ✅ Variáveis: GOOGLE_AI_KEY no .env`n" -ForegroundColor Green

Write-Host "⚠️  Importante:" -ForegroundColor Yellow
Write-Host "   • OCR vai falhar (esperado)" -ForegroundColor White
Write-Host "   • Digite dados manualmente" -ForegroundColor White
Write-Host "   • Gemini vai gerar o recurso!`n" -ForegroundColor Green

Write-Host "🚀 Próximo passo:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "🧪 Teste:" -ForegroundColor Cyan
Write-Host "   1. Login: demo@aptus.com / demo123" -ForegroundColor White
Write-Host "   2. Criar Recurso" -ForegroundColor White
Write-Host "   3. Upload 3 imagens" -ForegroundColor White
Write-Host "   4. Digite dados manualmente" -ForegroundColor White
Write-Host "   5. Gemini gera recurso ✅`n" -ForegroundColor Green
