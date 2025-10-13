# Script para instalar Google AI oficial
# Execute com: .\scripts\install-google-ai.ps1

Write-Host "🤖 Instalando Google AI SDK Oficial" -ForegroundColor Cyan
Write-Host "===================================`n" -ForegroundColor Cyan

# 1. Parar servidor
Write-Host "1️⃣ Parando servidor..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✅ Servidor parado`n" -ForegroundColor Green

# 2. Limpar cache
Write-Host "2️⃣ Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✅ Cache removido" -ForegroundColor Green
}

# 3. Instalar @google/genai
Write-Host "`n3️⃣ Instalando @google/genai..." -ForegroundColor Yellow
npm install @google/genai
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ @google/genai instalado`n" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro ao instalar" -ForegroundColor Red
    exit 1
}

Write-Host "✨ Instalação concluída!`n" -ForegroundColor Green

Write-Host "📋 Configuração:" -ForegroundColor Cyan
Write-Host "   ✅ Pacote: @google/genai (oficial)" -ForegroundColor Green
Write-Host "   ✅ Modelo: gemini-2.5-flash" -ForegroundColor Green
Write-Host "   ✅ Chave: GOOGLE_AI_KEY no .env`n" -ForegroundColor Green

Write-Host "🚀 Inicie o servidor:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "🧪 Teste criando um recurso!" -ForegroundColor Yellow
Write-Host "   Login: demo@aptus.com / demo123`n" -ForegroundColor White
