# 🔧 Troubleshooting - Problemas Comuns

## ❌ Erro: Cannot find module '.next\worker-script\node\index.js'

### Problema:
```
Error: Cannot find module 'C:\Users\vinicius\Projetos\aptus\.next\worker-script\node\index.js'
```

**Causa**: Tesseract.js (OCR) tentando usar workers do Next.js incorretamente.

### ✅ Solução Rápida:

```powershell
# Execute o script de correção
.\scripts\fix-tesseract.ps1
```

### ✅ Solução Manual:

```powershell
# 1. Pare o servidor
Ctrl+C

# 2. Limpe o cache
Remove-Item -Recurse -Force .next

# 3. Reinstale Tesseract
npm uninstall tesseract.js
npm install tesseract.js

# 4. Reinicie
npm run dev
```

---

## ❌ Erro: Prisma Client não gerado

### Problema:
```
Error: @prisma/client did not initialize yet
```

### ✅ Solução:

```bash
npx prisma generate
```

---

## ❌ Erro: Google AI Key inválida

### Problema:
```
Error: Invalid API key
```

### ✅ Solução:

1. Verifique o `.env`:
```env
GOOGLE_AI_KEY="AIzaSyAB2mxYwnuaEk5eYDJ7z3kon2c-17LOnt0"
```

2. Gere nova chave se necessário:
   - Acesse: https://aistudio.google.com/app/apikey
   - Crie nova chave
   - Cole no `.env`

---

## ❌ Erro: Database connection failed

### Problema:
```
Error: Can't reach database server
```

### ✅ Solução:

1. Verifique DATABASE_URL no `.env`
2. Teste conexão com Supabase
3. Verifique se o Supabase está online

---

## ❌ Erro: NEXTAUTH_SECRET missing

### Problema:
```
Error: Please define NEXTAUTH_SECRET
```

### ✅ Solução:

```powershell
.\scripts\generate-env.ps1
```

Ou gere manualmente:
```bash
openssl rand -base64 32
```

---

## ❌ Build falha em produção

### Problema:
```
Error: Module not found in production
```

### ✅ Solução:

1. Verifique todas as variáveis de ambiente
2. Execute build local:
```bash
npm run build
npm start
```

3. Se funcionar local, problema é no deploy

---

## 🐌 Sistema Lento / OCR Demora

### Problema:
OCR demora muito ou trava

### ✅ Solução:

1. **Primeira vez é normal** - Tesseract baixa dados (~50MB)
2. **Reduza tamanho das imagens** antes do upload
3. **Use imagens mais nítidas** para melhor resultado

---

## 📝 Logs Úteis

### Habilitar logs detalhados:

No `.env`, adicione:
```env
DEBUG=*
NODE_ENV=development
```

### Ver logs do Tesseract:

O console já mostra progresso:
```
OCR Progress: 0%
OCR Progress: 25%
OCR Progress: 50%
OCR Progress: 100%
```

---

## 🔄 Reset Completo

Se nada funcionar, reset completo:

```powershell
# 1. Limpar tudo
Remove-Item -Recurse -Force .next, node_modules

# 2. Reinstalar
npm install

# 3. Reconstruir banco
npx prisma generate
npx prisma migrate reset --force

# 4. Popular dados
npm run db:seed

# 5. Iniciar
npm run dev
```

---

## 📞 Ainda com problemas?

1. Verifique os logs no console
2. Veja a documentação:
   - `GOOGLE-AI.md` - IA
   - `SAAS.md` - Sistema
   - `MIGRATIONS.md` - Banco
3. Verifique issues do Tesseract: https://github.com/naptha/tesseract.js/issues

---

## ✅ Checklist de Verificação

Antes de reportar problema, verifique:

- [ ] `npm install` executado
- [ ] `.env` configurado corretamente
- [ ] `npx prisma generate` executado
- [ ] Migration aplicada (`setup-saas.ps1`)
- [ ] Porta 3000 livre
- [ ] Node.js versão 18+
- [ ] Cache limpo (`.next` removido)
- [ ] Servidor reiniciado

---

**Última atualização**: Outubro 2024
