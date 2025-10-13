# Fix Google AI - Atualizar para versão compatível
Write-Host "🔧 Atualizando Google AI..." -ForegroundColor Cyan

# Parar servidor
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Limpar cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Atualizar pacote
Write-Host "📦 Instalando @google/generative-ai@latest..." -ForegroundColor Yellow
npm install @google/generative-ai@latest

Write-Host "`n✅ Pronto! Execute: npm run dev" -ForegroundColor Green
