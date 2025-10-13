# Script para corrigir e fazer push do fix
# Execute: .\scripts\fix-and-push.ps1

Write-Host "🔧 Aplicando correção do erro de build..." -ForegroundColor Cyan
Write-Host "=========================================`n" -ForegroundColor Cyan

# Verificar se está em um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Não é um repositório Git!" -ForegroundColor Red
    Write-Host "Execute primeiro: git init" -ForegroundColor Yellow
    exit 1
}

# Testar build local
Write-Host "🧪 Testando build local..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou localmente!" -ForegroundColor Red
    Write-Host "Verifique os erros acima antes de fazer push." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Build passou localmente!`n" -ForegroundColor Green

# Adicionar arquivos corrigidos
Write-Host "📦 Adicionando arquivos corrigidos..." -ForegroundColor Yellow
git add src/app/api/appeals/[id]/pdf/route.ts
git add package.json
git add .eslintrc.json

# Commit
Write-Host "📝 Criando commit..." -ForegroundColor Yellow
git commit -m "fix: Corrigir tipo Buffer para Uint8Array no PDF

- Converter Buffer para Uint8Array em NextResponse
- Adicionar ESLint e eslint-config-next ao projeto
- Fix build error na Vercel (TypeScript type error)

Resolve erro:
Type error: Argument of type 'Buffer<ArrayBufferLike>' is not 
assignable to parameter of type 'BodyInit | null | undefined'"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Nada para commitar ou erro no commit" -ForegroundColor Yellow
    git status
    exit 0
}

Write-Host "✅ Commit criado!`n" -ForegroundColor Green

# Verificar se tem remote configurado
$remote = git remote -v 2>$null
if (-not $remote) {
    Write-Host "⚠️  Nenhum remote configurado!" -ForegroundColor Yellow
    Write-Host "Configure o remote primeiro:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/SEU-USUARIO/aptus.git`n" -ForegroundColor Cyan
    exit 0
}

# Perguntar se quer fazer push
Write-Host "🚀 Deseja fazer push agora? (S/n): " -ForegroundColor Cyan -NoNewline
$response = Read-Host

if ($response -eq "" -or $response -eq "s" -or $response -eq "S") {
    Write-Host "`n📤 Fazendo push..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Push concluído com sucesso!" -ForegroundColor Green
        Write-Host "`n🎉 Vercel vai iniciar novo deploy automaticamente!" -ForegroundColor Green
        Write-Host "   Acompanhe em: https://vercel.com/dashboard`n" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Erro ao fazer push!" -ForegroundColor Red
        Write-Host "Tente manualmente: git push origin main`n" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n✅ Commit criado localmente!" -ForegroundColor Green
    Write-Host "Para fazer push manualmente:" -ForegroundColor Cyan
    Write-Host "   git push origin main`n" -ForegroundColor White
}

Write-Host "📋 Status:" -ForegroundColor Cyan
git status
