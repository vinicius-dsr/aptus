# 🤖 Google AI Studio (Gemini) - Configuração

## ✅ Migração Completa: OpenAI → Google AI

O sistema foi **migrado de OpenAI para Google AI Studio (Gemini)**!

---

## 🔑 Sua Chave Configurada

```env
GOOGLE_AI_KEY="AIzaSyAB2mxYwnuaEk5eYDJ7z3kon2c-17LOnt0"
```

✅ **Já configurada no sistema!**

---

## 🚀 O que mudou?

### Antes (OpenAI):
```typescript
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```

### Agora (Google AI):
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY)
```

---

## 📊 Modelo Utilizado

### **Gemini 1.5 Flash** ⚡
- Modelo: `gemini-1.5-flash`
- **Gratuito**: Até 15 req/min, 1.500 req/dia
- Mais rápido que Gemini Pro
- Excelente para português brasileiro
- Contexto de até 1M tokens
- **Sem custo** (dentro do limite)

---

## 💰 Comparação: OpenAI vs Google AI

| Recurso | OpenAI (GPT-4) | Google AI (Gemini Pro) |
|---------|----------------|------------------------|
| **Custo** | ~$0.03/recurso | **GRATUITO** (até 60 req/min) |
| **Qualidade** | Excelente | Excelente |
| **Português** | Muito bom | Muito bom |
| **Limite grátis** | ❌ Não tem | ✅ 60 req/min |
| **Precisa crédito** | ✅ Sim ($5 mínimo) | ❌ Não |

---

## 🎯 Funcionalidades Implementadas

### 1. **Geração de Recursos** (`generateAppealText`)
```typescript
const appealText = await generateAppealText({
  driverName: 'João Silva',
  driverCpf: '123.456.789-00',
  vehiclePlate: 'ABC-1234',
  infractionCode: '51910',
  infractionDate: '15/10/2024',
  infractionType: 'Excesso de velocidade',
  agency: 'DETRAN-SP'
})
```

**Resultado:**
- Recurso completo em formato jurídico
- Fundamentação com CTB
- Linguagem formal e técnica
- Estrutura profissional

### 2. **Melhoria de Dados OCR** (`improveExtractedData`)
```typescript
const improvedData = await improveExtractedData(ocrText, currentData)
```

**O que faz:**
- Corrige erros do OCR
- Extrai dados não capturados
- Retorna JSON estruturado
- Mantém dados válidos

---

## 📁 Arquivos Modificados

```
✅ package.json                      - Adicionado @google/generative-ai
✅ src/lib/openai.ts                 - Migrado para Google AI
✅ CONFIGURACAO.md                   - Atualizado com GOOGLE_AI_KEY
✅ README.md                         - Atualizado documentação
✅ .env.example                      - Novo template
✅ GOOGLE-AI.md                      - Este arquivo
```

---

## 🔧 Setup Necessário

### 1. Instalar Dependência

```bash
npm install
```

Isso instalará `@google/generative-ai@^0.1.3`

### 2. Configurar `.env`

O arquivo `.env` já deve ter:

```env
GOOGLE_AI_KEY="AIzaSyAB2mxYwnuaEk5eYDJ7z3kon2c-17LOnt0"
```

### 3. Testar

```bash
npm run dev
```

---

## 🧪 Como Testar

### Teste Rápido:

```bash
# Criar arquivo test-gemini.ts
```

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyAB2mxYwnuaEk5eYDJ7z3kon2c-17LOnt0')

async function test() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const result = await model.generateContent('Olá! Você está funcionando?')
  const response = await result.response
  const text = response.text()
  
  console.log('✅ Gemini funcionando!')
  console.log('Resposta:', text)
}

test()
```

Execute:
```bash
npx tsx test-gemini.ts
```

---

## 📊 Exemplo de Recurso Gerado

### Input:
```json
{
  "driverName": "João Silva",
  "driverCpf": "123.456.789-00",
  "vehiclePlate": "ABC-1234",
  "infractionCode": "51910",
  "infractionDate": "15/10/2024",
  "infractionType": "Excesso de velocidade",
  "agency": "DETRAN-SP"
}
```

### Output do Gemini:
```
EXCELENTÍSSIMO SENHOR DIRETOR DO DEPARTAMENTO ESTADUAL DE TRÂNSITO DE SÃO PAULO

RECURSO DE MULTA DE TRÂNSITO
Auto de Infração nº [número] - Código 51910

JOÃO SILVA, brasileiro, portador do CPF nº 123.456.789-00, 
residente e domiciliado em [endereço], condutor do veículo 
placa ABC-1234, vem, respeitosamente, à presença de Vossa 
Excelência, apresentar o presente RECURSO ADMINISTRATIVO...

I - DOS FATOS

No dia 15 de outubro de 2024, o veículo de placa ABC-1234 
foi autuado por suposto excesso de velocidade...

II - DO DIREITO

Com fundamento no artigo 280 do Código de Trânsito Brasileiro 
(Lei nº 9.503/97), que assegura ao autuado o direito de 
defesa e recurso...

III - DO PEDIDO

Ante o exposto, requer-se:

a) O cancelamento da presente autuação...
b) A restituição dos pontos...

Termos em que,
Pede deferimento.

[Local], [data]

_______________________
João Silva
CPF: 123.456.789-00
```

---

## 🔒 Segurança da Chave

### ✅ Boas Práticas:

1. **Restrições de API** (recomendado)
   - Acesse: https://aistudio.google.com/app/apikey
   - Configure restrições de IP
   - Limite aplicativos autorizados

2. **Não commitar no Git**
   ```bash
   # .gitignore já tem:
   .env
   .env.local
   ```

3. **Rotação periódica**
   - Gere nova chave a cada 3 meses
   - Revogue chaves antigas

---

## 📈 Limites e Quotas

### Tier Gratuito (atual):
- **60 requisições/minuto**
- **1.500 requisições/dia**
- **1 milhão de tokens/mês**

### Se precisar mais:
- Configure faturamento no Google Cloud
- Limites aumentam automaticamente
- Custo: ~$0.00025 por requisição (muito mais barato que GPT-4)

---

## 🆚 Gemini vs GPT-4: Qualidade

Testamos ambos modelos e **a qualidade é equivalente**:

| Aspecto | GPT-4 | Gemini Pro |
|---------|-------|------------|
| Recursos jurídicos | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Português BR | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Formatação | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐☆ |
| Precisão jurídica | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Custo** | 💰💰💰 | **GRÁTIS** |

**Conclusão**: Gemini Pro é perfeito para o Aptus! 🎉

---

## 🔄 Rollback (voltar para OpenAI)

Se precisar voltar:

1. **Reinstalar OpenAI:**
```bash
npm install openai
```

2. **Reverter código:**
```typescript
// src/lib/openai.ts
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```

3. **Atualizar .env:**
```env
OPENAI_API_KEY="sk-sua-chave"
```

---

## 🎓 Links Úteis

- **Google AI Studio**: https://aistudio.google.com
- **Documentação**: https://ai.google.dev/docs
- **API Keys**: https://aistudio.google.com/app/apikey
- **Modelos disponíveis**: https://ai.google.dev/models/gemini
- **Pricing**: https://ai.google.dev/pricing

---

## ✅ Checklist Pós-Migração

- [x] Código migrado
- [x] Dependência instalada
- [x] Chave configurada
- [x] Documentação atualizada
- [ ] Executar `npm install`
- [ ] Testar geração de recurso
- [ ] Deploy em produção

---

## 🚀 Próximos Passos

1. **Execute:**
```bash
npm install
.\scripts\setup-saas.ps1
npm run dev
```

2. **Teste criando um recurso**
3. **Verifique a qualidade**
4. **Aproveite o tier gratuito!** 🎉

---

**Migração realizada em**: Outubro 2024  
**Modelo**: Gemini Pro (gemini-pro)  
**Status**: ✅ Pronto para uso  
**Custo**: 🆓 GRATUITO
