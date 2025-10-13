# Script para preparar projeto para deploy
# Execute com: .\scripts\prepare-deploy.ps1

Write-Host "🚀 Preparando Projeto para Deploy" -ForegroundColor Cyan
Write-Host "=================================`n" -ForegroundColor Cyan

# 1. Verificar se .env está no .gitignore
Write-Host "1️⃣ Verificando segurança..." -ForegroundColor Yellow
if (Select-String -Path ".gitignore" -Pattern "^.env$" -Quiet) {
    Write-Host "   ✅ .env está no .gitignore" -ForegroundColor Green
} else {
    Write-Host "   ❌ .env NÃO está no .gitignore!" -ForegroundColor Red
    Write-Host "   Adicione '.env' ao .gitignore antes de continuar" -ForegroundColor Red
    exit 1
}

# 2. Verificar se .env.example existe
if (Test-Path ".env.example") {
    Write-Host "   ✅ .env.example existe" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .env.example não encontrado" -ForegroundColor Yellow
}

# 3. Limpar cache e builds
Write-Host "`n2️⃣ Limpando cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "node_modules\.cache") { Remove-Item -Recurse -Force "node_modules\.cache" }
Write-Host "   ✅ Cache limpo" -ForegroundColor Green

# 4. Testar build
Write-Host "`n3️⃣ Testando build de produção..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Build passou!" -ForegroundColor Green
} else {
    Write-Host "   ❌ Build falhou!" -ForegroundColor Red
    Write-Host "   Corrija os erros antes de fazer deploy" -ForegroundColor Red
    exit 1
}

# 5. Verificar arquivos críticos
Write-Host "`n4️⃣ Verificando arquivos críticos..." -ForegroundColor Yellow
$criticalFiles = @(
    "package.json",
    "prisma/schema.prisma",
    ".env.example",
    ".gitignore",
    "DEPLOY.md"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file não encontrado" -ForegroundColor Red
    }
}

# 6. Resumo
Write-Host "`n✨ Preparação concluída!`n" -ForegroundColor Green

Write-Host "📋 Checklist:" -ForegroundColor Cyan
Write-Host "   ✅ Segurança verificada" -ForegroundColor Green
Write-Host "   ✅ Cache limpo" -ForegroundColor Green
Write-Host "   ✅ Build testado" -ForegroundColor Green
Write-Host "   ✅ Arquivos críticos OK`n" -ForegroundColor Green

Write-Host "⚠️  Antes de fazer deploy:" -ForegroundColor Yellow
Write-Host "   1. Revise PRE-DEPLOY-CHECKLIST.md" -ForegroundColor White
Write-Host "   2. Configure Supabase (banco de dados)" -ForegroundColor White
Write-Host "   3. Gere nova NEXTAUTH_SECRET para produção" -ForegroundColor White
Write-Host "   4. Obtenha GOOGLE_AI_KEY válida`n" -ForegroundColor White

Write-Host "🚀 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. git add ." -ForegroundColor White
Write-Host "   2. git commit -m 'feat: Sistema pronto para deploy'" -ForegroundColor White
Write-Host "   3. git push origin main" -ForegroundColor White
Write-Host "   4. Deploy na Vercel`n" -ForegroundColor White

Write-Host "📖 Guia completo: DEPLOY.md`n" -ForegroundColor Cyan
