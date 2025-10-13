# ✅ Checklist Pré-Deploy - Revisão Completa

## 🔒 Segurança

### Arquivos Sensíveis
- [x] `.env` está no `.gitignore` ✅
- [x] `.env.example` criado e atualizado ✅
- [x] Sem credenciais hardcoded no código ✅
- [x] `/public/uploads` no `.gitignore` ✅
- [x] Migrations no `.gitignore` ✅

### Variáveis de Ambiente
- [x] `DATABASE_URL` - Banco de dados
- [x] `DIRECT_URL` - Para migrations
- [x] `NEXTAUTH_URL` - URL do app
- [x] `NEXTAUTH_SECRET` - Secret forte
- [x] `GOOGLE_AI_KEY` - Chave Gemini
- [ ] `EMAIL_*` - Configurações SMTP (opcional)

### Senhas Padrão
- [ ] ⚠️ **TROCAR** admin@aptus.com / admin123 após deploy
- [ ] ⚠️ **TROCAR** demo@aptus.com / demo123 após deploy

---

## 📦 Dependências

### Package.json
- [x] `@google/generative-ai` v0.24.1 ✅
- [x] `next` v14.0.4 ✅
- [x] `@prisma/client` v5.7.1 ✅
- [x] `tesseract.js` v6.0.1 ✅
- [x] Script `postinstall` para Prisma ✅
- [x] Script `build` atualizado ✅

### Verificar Build Local
```bash
npm run build
```
- [ ] Build passou sem erros críticos
- [ ] Avisos de Tesseract (OK - esperado)

---

## 🗄️ Banco de Dados

### Prisma
- [x] Schema atualizado com SaaS ✅
- [x] Migrations criadas ✅
- [x] Seed configurado ✅

### Em Produção
- [ ] Supabase criado
- [ ] DATABASE_URL configurado
- [ ] Migrations aplicadas: `npx prisma migrate deploy`
- [ ] Seed executado: `npx prisma db seed`
- [ ] Admin criado

---

## 🤖 Google AI (Gemini)

### Configuração
- [x] Modelo: `gemini-2.5-flash` ✅
- [x] SDK: `@google/generative-ai` v0.24.1 ✅
- [x] Código atualizado ✅

### Chave API
- [ ] Chave válida gerada em https://aistudio.google.com/app/apikey
- [ ] Testada localmente
- [ ] Adicionada na Vercel

---

## 🎨 Frontend

### Páginas Críticas
- [x] `/` - Landing page ✅
- [x] `/auth/login` - Login ✅
- [x] `/auth/register` - Cadastro ✅
- [x] `/plans` - Planos ✅
- [x] `/dashboard` - Dashboard usuário ✅
- [x] `/admin` - Dashboard admin ✅
- [x] `/admin/users` - Gerenciar usuários ✅

### Teste Manual
- [ ] Login funciona
- [ ] Registro funciona
- [ ] Seleção de planos funciona
- [ ] Dashboard carrega
- [ ] Admin acessível

---

## 🔧 APIs

### Endpoints Críticos
- [x] `POST /api/appeals/create` - Criar recurso ✅
- [x] `GET /api/appeals` - Listar recursos ✅
- [x] `GET /api/plans` - Listar planos ✅
- [x] `GET /api/subscription` - Ver assinatura ✅
- [x] `POST /api/subscription/change` - Trocar plano ✅
- [x] `GET /api/admin/stats` - Estatísticas ✅
- [x] `GET /api/admin/users` - Listar usuários ✅

### Tratamento de Erros
- [x] OCR com fallback ✅
- [x] Google AI com try/catch ✅
- [x] Banco com error handling ✅

---

## 📊 Sistema SaaS

### Modelos
- [x] `Plan` - 4 planos criados ✅
- [x] `Subscription` - Controle de assinaturas ✅
- [x] `User.isActive` - Ativar/desativar ✅

### Funcionalidades
- [x] Limites por plano ✅
- [x] Contadores de uso ✅
- [x] Renovação mensal automática ✅
- [x] Dashboard admin completo ✅

---

## 🐛 Issues Conhecidos

### 1. OCR não funciona
**Status**: ✅ OK - Tem fallback  
**Impacto**: Baixo - Usuário digita manualmente  
**Solução futura**: Google Vision API

### 2. Console.logs em produção
**Status**: ⚠️ Revisar  
**Impacto**: Baixo - Só logs de debug  
**Solução**: Remover ou usar variável de ambiente

---

## 📝 Documentação

### Criada
- [x] `README.md` - Visão geral ✅
- [x] `DEPLOY.md` - Guia de deploy ✅
- [x] `SAAS.md` - Sistema SaaS ✅
- [x] `GOOGLE-AI.md` - Integração Gemini ✅
- [x] `ADMIN.md` - Sistema admin ✅
- [x] `.env.example` - Template de variáveis ✅
- [x] `PRE-DEPLOY-CHECKLIST.md` - Este arquivo ✅

### Para Criar (Opcional)
- [ ] `CONTRIBUTING.md` - Como contribuir
- [ ] `CHANGELOG.md` - Histórico de mudanças
- [ ] `API.md` - Documentação das APIs

---

## 🧪 Testes

### Locais (Antes de Deploy)
```bash
# 1. Build
npm run build

# 2. Rodar produção localmente
npm start

# 3. Testar
- [ ] Login
- [ ] Criar recurso
- [ ] Download PDF
- [ ] Admin dashboard
```

### Produção (Após Deploy)
```
1. Acessar URL da Vercel
2. Cadastrar novo usuário
3. Escolher plano
4. Criar recurso
5. Verificar se Gemini gera
6. Download PDF
7. Admin login
8. Gerenciar usuários
```

---

## 🚀 Deploy

### GitHub
```bash
git init
git add .
git commit -m "feat: Sistema SaaS completo"
git remote add origin https://github.com/SEU-USUARIO/aptus.git
git push -u origin main
```

### Vercel
1. Importar repositório
2. Configurar variáveis de ambiente
3. Deploy
4. Testar

---

## ⚠️ ATENÇÃO - Antes de Tornar Público

### Remover/Alterar
- [ ] Senhas padrão (admin123, demo123)
- [ ] Chaves API de exemplo
- [ ] Credenciais de banco de desenvolvimento

### Adicionar
- [ ] LICENSE (MIT recomendado)
- [ ] CONTRIBUTING.md (se open source)
- [ ] Code of Conduct (se open source)

### Verificar
- [ ] Sem dados sensíveis commitados
- [ ] `.env` NÃO está no Git
- [ ] Histórico do Git limpo

---

## 📋 Comando Final - Revisar Tudo

```bash
# 1. Testar build
npm run build

# 2. Verificar .env não está no git
git status

# 3. Ver o que será commitado
git diff

# 4. Commit
git add .
git commit -m "feat: Sistema pronto para deploy"

# 5. Push
git push origin main
```

---

## ✅ Pronto para Deploy?

### Checklist Mínimo
- [ ] Build local passou
- [ ] `.env` no `.gitignore`
- [ ] `.env.example` criado
- [ ] Sem credenciais hardcoded
- [ ] Supabase configurado
- [ ] Google AI funcionando
- [ ] Documentação básica OK

### Se TODOS marcados ✅:
**PODE FAZER DEPLOY!** 🚀

---

## 🎯 Após Deploy

1. Testar site em produção
2. Trocar senhas padrão
3. Monitorar erros (Vercel Logs)
4. Configurar domínio customizado (opcional)
5. Adicionar analytics (opcional)

---

**Boa sorte com o deploy!** 🎉
