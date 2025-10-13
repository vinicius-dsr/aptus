# Script para configurar banco de dados com migrations
# Execute com: .\scripts\setup-database.ps1

Write-Host "🗄️ Configuração do Banco de Dados - Supabase" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Verificar se .env existe
if (-not (Test-Path ".env")) {
    Write-Host "❌ Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "Execute primeiro: .\scripts\generate-env.ps1" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Escolha o método de configuração:`n" -ForegroundColor Yellow
Write-Host "1️⃣ - Migration (RECOMENDADO para Supabase)" -ForegroundColor White
Write-Host "     Cria arquivos de migration rastreáveis" -ForegroundColor Gray
Write-Host "     Ideal para produção e versionamento`n" -ForegroundColor Gray

Write-Host "2️⃣ - Push (Desenvolvimento rápido)" -ForegroundColor White
Write-Host "     Sincroniza schema diretamente" -ForegroundColor Gray
Write-Host "     Mais rápido, sem histórico de migrations`n" -ForegroundColor Gray

$opcao = Read-Host "Digite 1 ou 2"

if ($opcao -eq "1") {
    Write-Host "`n📦 Criando primeira migration..." -ForegroundColor Cyan
    
    # Criar migration inicial
    Write-Host "`nCriando migration 'init'..." -ForegroundColor Yellow
    npx prisma migrate dev --name init
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Migration criada e aplicada com sucesso!" -ForegroundColor Green
        Write-Host "✅ Prisma Client gerado automaticamente" -ForegroundColor Green
        
        Write-Host "`n📁 Arquivos criados:" -ForegroundColor Cyan
        Write-Host "   prisma/migrations/[timestamp]_init/" -ForegroundColor White
        Write-Host "   - migration.sql (SQL gerado)" -ForegroundColor Gray
        
        Write-Host "`n💡 Próximos passos:" -ForegroundColor Cyan
        Write-Host "   1. Execute: npm run db:seed (criar admin)" -ForegroundColor White
        Write-Host "   2. Execute: npm run dev (iniciar servidor)" -ForegroundColor White
    } else {
        Write-Host "❌ Erro ao criar migration!" -ForegroundColor Red
        Write-Host "`n🔍 Possíveis causas:" -ForegroundColor Yellow
        Write-Host "   - Verifique a DATABASE_URL no .env" -ForegroundColor White
        Write-Host "   - Confirme que o Supabase está acessível" -ForegroundColor White
        Write-Host "   - Verifique sua conexão com internet" -ForegroundColor White
        exit 1
    }
    
} elseif ($opcao -eq "2") {
    Write-Host "`n📤 Fazendo push do schema..." -ForegroundColor Cyan
    
    npx prisma db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Schema sincronizado com sucesso!" -ForegroundColor Green
        
        Write-Host "`n🔧 Gerando Prisma Client..." -ForegroundColor Yellow
        npx prisma generate
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Prisma Client gerado" -ForegroundColor Green
            
            Write-Host "`n💡 Próximos passos:" -ForegroundColor Cyan
            Write-Host "   1. Execute: npm run db:seed (criar admin)" -ForegroundColor White
            Write-Host "   2. Execute: npm run dev (iniciar servidor)" -ForegroundColor White
        }
    } else {
        Write-Host "❌ Erro ao fazer push do schema!" -ForegroundColor Red
        exit 1
    }
    
} else {
    Write-Host "❌ Opção inválida!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✨ Banco de dados configurado!" -ForegroundColor Green
