# ✅ Correção: Remover Markdown do PDF

## ❌ Problema

O PDF gerado mostrava caracteres markdown como:
- `###` (títulos)
- `**texto**` (negrito)
- `*texto*` (itálico)
- `> quote` (citações)
- `- item` (listas)
- E outros símbolos markdown

---

## ✅ Solução Implementada

### 1. **Função de Limpeza de Markdown**

Criada função `cleanMarkdown()` que remove todos os símbolos:

```typescript
function cleanMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')        // Remove ###
    .replace(/\*\*(.+?)\*\*/g, '$1')    // Remove **bold**
    .replace(/\*(.+?)\*/g, '$1')        // Remove *italic*
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')  // Remove [links](url)
    .replace(/^>\s+/gm, '')             // Remove > quotes
    .replace(/^[-*+]\s+/gm, '')         // Remove - listas
    // ... e mais
}
```

### 2. **Aplicação no PDF**

```typescript
// ANTES ❌
addText(data.appealText, 11)

// AGORA ✅
const cleanedText = cleanMarkdown(data.appealText)
addText(cleanedText, 11)
```

### 3. **Instrução para Gemini**

Atualizado prompt para pedir texto puro:

```
NÃO USE FORMATAÇÃO MARKDOWN (sem ###, **, *, >, etc.)
- Apenas texto puro formatado
```

---

## 📁 Arquivo Modificado

```
✅ src/lib/pdf.ts
   - Função cleanMarkdown() adicionada
   - Limpeza aplicada antes de gerar PDF

✅ src/lib/openai.ts
   - Instrução explícita: não usar markdown
   - Prompt atualizado para texto puro
```

---

## 🎯 Resultado

### Antes (❌)
```
### RECURSO ADMINISTRATIVO

**RECORRENTE:**
- Nome: João da Silva
- CPF: 123.456.789-00

> Art. 280 do CTB...

**III. DOS PEDIDOS**
```

### Agora (✅)
```
RECURSO ADMINISTRATIVO

RECORRENTE:
Nome: João da Silva
CPF: 123.456.789-00

Art. 280 do CTB...

III. DOS PEDIDOS
```

---

## 🧪 Como Testar

### 1. Criar Recurso
```
1. Dashboard → Criar Recurso
2. Upload documentos
3. Aguardar processamento
```

### 2. Baixar PDF
```
1. Ver recurso criado
2. Clicar "Baixar PDF"
3. Abrir PDF
```

### 3. Verificar
```
✅ Sem símbolos ### no título
✅ Sem ** em volta do texto
✅ Sem * para itálico
✅ Sem > para citações
✅ Sem - para listas
✅ Texto limpo e profissional
```

---

## 🔍 Símbolos Removidos

| Markdown | Exemplo | Resultado |
|----------|---------|-----------|
| `###` | `### Título` | `Título` |
| `**bold**` | `**texto**` | `texto` |
| `*italic*` | `*texto*` | `texto` |
| ``` `code` ``` | `` `código` `` | `código` |
| `> quote` | `> citação` | `citação` |
| `- lista` | `- item` | `item` |
| `[link](url)` | `[texto](url)` | `texto` |
| `1. lista` | `1. item` | `item` |
| `---` | `---` | *(removido)* |

---

## 💡 Dupla Proteção

### 1ª Camada: Gemini
```
Instrução no prompt:
"NÃO USE FORMATAÇÃO MARKDOWN"
```

### 2ª Camada: Função cleanMarkdown()
```typescript
// Remove markdown mesmo se Gemini incluir
const cleanedText = cleanMarkdown(data.appealText)
```

**Resultado:** PDF sempre limpo! ✅

---

## 🚀 Deploy

```bash
# 1. Commit
git add .
git commit -m "fix: Remover markdown do PDF gerado

- Adicionar função cleanMarkdown() para limpar símbolos
- Aplicar limpeza antes de gerar PDF
- Instruir Gemini a não usar formatação markdown
- Garantir PDF limpo e profissional"

# 2. Push
git push origin main

# 3. Aguardar deploy (2 min)
```

---

## 📊 Testes Recomendados

### Cenário 1: Novo Recurso
```
1. Criar recurso após deploy
2. Gemini gera texto SEM markdown
3. PDF sai limpo
✅ Esperado: Sem símbolos
```

### Cenário 2: Recurso Antigo
```
1. Recurso criado ANTES do fix
2. Tem markdown no appealText (banco)
3. Baixar PDF
✅ Esperado: cleanMarkdown() remove símbolos
```

### Cenário 3: Texto Complexo
```
Texto com:
- ### Títulos
- **Negrito**
- *Itálico*
- > Citações
- [Links](url)
- Listas

✅ Esperado: Tudo removido no PDF
```

---

## 🔧 Técnico

### Regex Utilizados

```typescript
// Headers
/^#{1,6}\s+/gm

// Bold
/\*\*(.+?)\*\*/g

// Italic  
/\*(.+?)\*/g

// Links
/\[([^\]]+)\]\([^\)]+\)/g

// Quotes
/^>\s+/gm

// Listas
/^[-*+]\s+/gm
/^\d+\.\s+/gm
```

### Ordem de Remoção

1. Bold/Italic (mais específico primeiro)
2. Links e imagens
3. Código
4. Títulos
5. Quotes
6. Listas
7. Linhas horizontais
8. Limpeza final

---

## ✅ Status

| Item | Status |
|------|--------|
| Função cleanMarkdown() | ✅ Implementada |
| Aplicação no PDF | ✅ Implementada |
| Instrução Gemini | ✅ Atualizada |
| Testes locais | ⏳ Pendente |
| Deploy | ⏳ Pendente |

---

## 🎉 Resultado Final

**PDF gerado:**
- ✅ Texto limpo e profissional
- ✅ Sem símbolos markdown
- ✅ Formatação apropriada para documento jurídico
- ✅ Pronto para impressão/envio

---

**Execute o deploy e teste baixando um PDF!** 🚀

**Recursos novos e antigos terão PDFs limpos!**
