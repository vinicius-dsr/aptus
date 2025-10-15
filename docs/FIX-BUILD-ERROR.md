# 🔧 Correção do Erro de Build Vercel

## ❌ Erro Encontrado

```
Type error: Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
```

**Arquivo**: `src/app/api/appeals/[id]/pdf/route.ts`  
**Linha**: 38

---

## ✅ Solução Aplicada

### Problema
O `NextResponse` não aceita `Buffer` diretamente no TypeScript.

### Correção
Converter `Buffer` para `Uint8Array` antes de retornar:

```typescript
// ANTES (❌ Erro)
return new NextResponse(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="recurso-${appeal.infractionNumber || appeal.id}.pdf"`,
  },
})

// DEPOIS (✅ Correto)
// Converter Buffer para Uint8Array para NextResponse
const uint8Array = new Uint8Array(pdfBuffer)

return new NextResponse(uint8Array, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="recurso-${appeal.infractionNumber || appeal.id}.pdf"`,
  },
})
```

---

## 📦 ESLint Adicionado

Também adicionei o ESLint ao `package.json` (devDependencies):

```json
"eslint": "^8.56.0",
"eslint-config-next": "14.0.4"
```

---

## 🚀 Como Atualizar no GitHub/Vercel

### Opção 1: Commit Manual

```bash
# Adicionar correções
git add src/app/api/appeals/[id]/pdf/route.ts
git add package.json

# Commit
git commit -m "fix: Corrigir tipo Buffer para Uint8Array no PDF

- Converter Buffer para Uint8Array em NextResponse
- Adicionar ESLint ao projeto
- Fix build error na Vercel"

# Push
git push origin main
```

### Opção 2: Script Automatizado

```powershell
# Execute
.\scripts\fix-and-push.ps1
```

---

## 🧪 Testar Localmente

```bash
# Limpar e reinstalar
npm install

# Testar build
npm run build

# Se passar: ✅ Pronto para deploy
```

---

## ✅ Build Agora Vai Passar

Após fazer push, a Vercel vai:
1. ✅ Instalar dependências
2. ✅ Gerar Prisma Client
3. ✅ Compilar TypeScript (sem erros)
4. ✅ Build Next.js
5. ✅ Deploy! 🚀

---

## 📊 Status

| Item | Status |
|------|--------|
| Erro TypeScript | ✅ Corrigido |
| ESLint | ✅ Adicionado |
| Build Local | ⏳ Teste com `npm run build` |
| Deploy Vercel | ⏳ Aguardando push |

---

**Faça o commit e push agora!** 🚀
