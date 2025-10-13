# Script para resolver problema do OCR
# Execute com: .\scripts\fix-ocr-issue.ps1

Write-Host "🔧 Resolvendo problema do OCR..." -ForegroundColor Cyan
Write-Host "=================================`n" -ForegroundColor Cyan

# 1. Parar servidor
Write-Host "1️⃣ Parando servidor..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "   ✅ Servidor parado`n" -ForegroundColor Green

# 2. Limpar cache do Next.js
Write-Host "2️⃣ Limpando cache do Next.js..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✅ Cache removido" -ForegroundColor Green
} else {
    Write-Host "   ⏭️  Sem cache para limpar" -ForegroundColor Gray
}

# 3. Limpar cache de módulos
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "   ✅ Cache de módulos removido" -ForegroundColor Green
}

Write-Host "`n3️⃣ Reinstalando pacotes..." -ForegroundColor Yellow
npm install
Write-Host "   ✅ Pacotes instalados`n" -ForegroundColor Green

Write-Host "✨ Correção concluída!`n" -ForegroundColor Green

Write-Host "⚠️  IMPORTANTE: OCR Temporariamente Desabilitado" -ForegroundColor Yellow
Write-Host "   O sistema está funcional MAS:" -ForegroundColor White
Write-Host "   • OCR não extrai dados automaticamente" -ForegroundColor White
Write-Host "   • Você precisa preencher manualmente" -ForegroundColor White
Write-Host "   • Gemini AINDA gera recursos perfeitamente ✅" -ForegroundColor Green
Write-Host "   • Leia: OCR-TEMPORARIO.md`n" -ForegroundColor Cyan

Write-Host "🚀 Inicie agora:" -ForegroundColor Cyan
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "📖 Leia a documentação:" -ForegroundColor Cyan
Write-Host "   OCR-TEMPORARIO.md - Explicação completa" -ForegroundColor White
Write-Host "   RESUMO-FINAL.md - Status do sistema`n" -ForegroundColor White
