# Script para iniciar o servidor de desenvolvimento
# Execute com: .\scripts\start.ps1

Write-Host "🚀 Iniciando servidor Aptus..." -ForegroundColor Cyan

# Verificar se .env existe
if (-not (Test-Path ".env")) {
    Write-Host "❌ Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\scripts\init.ps1" -ForegroundColor Yellow
    exit 1
}

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "`n✨ Servidor iniciando em http://localhost:3000" -ForegroundColor Green
Write-Host "⏱️  Aguarde alguns segundos..." -ForegroundColor Yellow
Write-Host "`nPressione Ctrl+C para parar o servidor`n" -ForegroundColor Gray

npm run dev
