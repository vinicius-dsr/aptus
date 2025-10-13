# Script para fazer commit do fix serverless
# Execute: .\scripts\deploy-serverless-fix.ps1

Write-Host "🔧 Deploy do Fix Serverless..." -ForegroundColor Cyan
Write-Host "==============================`n" -ForegroundColor Cyan

# Verificar se está em um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Não é um repositório Git!" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Mudanças aplicadas:" -ForegroundColor Yellow
Write-Host "   ✅ Removido salvamento de arquivos em disco" -ForegroundColor Green
Write-Host "   ✅ Processamento em memória (Vercel serverless)" -ForegroundColor Green
Write-Host "   ✅ Documentos salvos como null no banco`n" -ForegroundColor Green

# Verificar status
Write-Host "📊 Status do Git:" -ForegroundColor Yellow
git status --short

Write-Host "`n🔍 Arquivos modificados:" -ForegroundColor Yellow
Write-Host "   - src/app/api/appeals/create/route.ts" -ForegroundColor White

Write-Host "`n📦 Adicionando arquivos..." -ForegroundColor Yellow
git add src/app/api/appeals/create/route.ts
git add FIX-SERVERLESS.md

Write-Host "✅ Arquivos adicionados`n" -ForegroundColor Green

Write-Host "📝 Criando commit..." -ForegroundColor Yellow
git commit -m "fix: Processar uploads em memória para Vercel serverless

- Remover criação de diretórios (não suportado em serverless)
- Remover salvamento de arquivos no filesystem
- Processar uploads diretamente em memória
- Documentos salvos como null (sem storage permanente)

Resolve erro: ENOENT: no such file or directory, mkdir '/var/task/public'

Para storage permanente no futuro:
- Vercel Blob Storage
- Supabase Storage
- AWS S3"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao criar commit!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Commit criado!`n" -ForegroundColor Green

# Verificar remote
$remote = git remote -v 2>$null
if (-not $remote) {
    Write-Host "⚠️  Nenhum remote configurado!" -ForegroundColor Yellow
    Write-Host "Configure: git remote add origin https://github.com/SEU-USUARIO/aptus.git`n" -ForegroundColor White
    exit 0
}

# Perguntar se quer fazer push
Write-Host "🚀 Deseja fazer push agora? (S/n): " -ForegroundColor Cyan -NoNewline
$response = Read-Host

if ($response -eq "" -or $response -eq "s" -or $response -eq "S") {
    Write-Host "`n📤 Fazendo push..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Push concluído!" -ForegroundColor Green
        Write-Host "`n🎉 Vercel iniciará deploy automático!" -ForegroundColor Green
        Write-Host "   Acompanhe: https://vercel.com/dashboard" -ForegroundColor Cyan
        Write-Host "`n⏱️  Aguarde ~2 minutos para deploy completar" -ForegroundColor Yellow
        Write-Host "   Depois teste criar recurso novamente!`n" -ForegroundColor White
    } else {
        Write-Host "`n❌ Erro ao fazer push!" -ForegroundColor Red
    }
} else {
    Write-Host "`n✅ Commit criado localmente!" -ForegroundColor Green
    Write-Host "Para push manual: git push origin main`n" -ForegroundColor White
}

Write-Host "📋 Próximo teste:" -ForegroundColor Cyan
Write-Host "   1. Aguarde deploy completar (~2 min)" -ForegroundColor White
Write-Host "   2. Acesse seu site" -ForegroundColor White
Write-Host "   3. Dashboard → Criar Recurso" -ForegroundColor White
Write-Host "   4. Upload 3 documentos" -ForegroundColor White
Write-Host "   5. Processar" -ForegroundColor White
Write-Host "   6. ✅ Deve funcionar sem erro 500!`n" -ForegroundColor Green

Write-Host "✨ Sistema agora funciona 100% em serverless!" -ForegroundColor Green
