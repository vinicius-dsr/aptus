# 🔧 Correção: Extração de Dados

## ❌ Problema Identificado

A IA estava tendo dificuldade de usar os dados do perfil do usuário no recurso gerado, mostrando "[Não informado]" mesmo quando os dados existiam.

---

## ✅ Correções Implementadas

### 1. **Logs Detalhados**
Agora mostra exatamente quais dados estão sendo usados:

```typescript
console.log('📊 Dados combinados para o recurso:', {
  driverName: completeData.driverName,
  driverCpf: completeData.driverCpf,
  driverPhone: completeData.driverPhone,
  driverAddress: completeData.driverAddress,
  vehiclePlate: completeData.vehiclePlate,
  infractionNumber: completeData.infractionNumber,
})
```

### 2. **Prioridade dos Dados**
```typescript
// 1º: Dados extraídos dos documentos
...extractedData

// 2º: Dados do perfil SOBRESCREVEM (mais confiáveis)
driverName: user?.name       // Do perfil
driverCpf: user?.cpf          // Do perfil
driverPhone: user?.phone      // Do perfil
driverAddress: user?.address  // Do perfil
driverEmail: user?.email      // Do perfil
```

### 3. **Prompt Melhorado**
- ✅ Usa dados reais sem adicionar "[Não informado]"
- ✅ Só inclui dados que existem
- ✅ Instrução explícita: "USE EXATAMENTE COMO ESTÃO"
- ✅ Omite campos vazios ao invés de marcar como "não informado"

---

## 🧪 Como Testar

### 1. Ver Logs na Vercel

```
1. Vercel → Functions → /api/appeals/create
2. Criar recurso
3. Ver logs:
   - 📊 Dados combinados para o recurso
   - 🤖 Gerando recurso com Gemini usando dados
```

**Procure por:**
```
📊 Dados combinados para o recurso: {
  driverName: 'João da Silva',        ← Deve aparecer
  driverCpf: '123.456.789-00',        ← Deve aparecer
  driverPhone: '(11) 98765-4321',     ← Deve aparecer
  driverAddress: 'Rua X, 123...',     ← Deve aparecer
  vehiclePlate: 'ABC-1234',           ← Gemini extraiu
  infractionNumber: 'T012345'         ← Gemini extraiu
}
```

### 2. Verificar Dados no Perfil

**IMPORTANTE:** Usuário DEVE ter dados preenchidos!

```
1. Login
2. Clicar no nome (menu superior)
3. Verificar campos:
   ✅ Nome Completo
   ✅ CPF
   ✅ Telefone
   ✅ Endereço ← OBRIGATÓRIO!
4. Se vazio, preencher e salvar
```

### 3. Criar Recurso

```
1. Dashboard → Criar Recurso
2. Upload 3 documentos
3. Aguardar processamento
4. Ver recurso gerado
5. Verificar se dados aparecem completos
```

---

## 🎯 Checklist de Diagnóstico

### Se dados não aparecem:

**1. Verificar perfil do usuário**
```
[ ] Nome preenchido?
[ ] CPF preenchido?
[ ] Telefone preenchido?
[ ] Endereço preenchido? ← CRÍTICO
```

**2. Verificar logs da API**
```
[ ] "📊 Dados combinados" aparece?
[ ] Dados estão corretos nos logs?
[ ] "🤖 Gerando recurso" aparece?
```

**3. Verificar banco de dados**
```bash
npx prisma studio

# Tabela User
# Verificar se user tem:
# - name
# - cpf
# - phone
# - address ← Campo pode não existir ainda!
```

**4. Migration do campo `address`**
```bash
# Se address não existe:
npx prisma migrate deploy
```

---

## 📋 Exemplo Completo

### Dados no Perfil
```
Nome: João da Silva Santos
CPF: 123.456.789-00
Telefone: (11) 98765-4321
Endereço: Rua das Flores, 123 - Centro, São Paulo/SP, CEP 01234-567
Email: joao@email.com
```

### Dados Extraídos (Gemini Vision)
```
Placa: ABC-1234
RENAVAM: 12345678901
Nº Auto: T012345678
Data: 15/10/2024
Código: 574-20
Órgão: DETRAN/SP
```

### Resultado no Recurso
```
RECORRENTE:
Nome Completo: João da Silva Santos       ← Do perfil
CPF: 123.456.789-00                       ← Do perfil
Endereço: Rua das Flores, 123 - Centro... ← Do perfil
Telefone: (11) 98765-4321                 ← Do perfil
E-mail: joao@email.com                    ← Do perfil

VEÍCULO:
Placa: ABC-1234                           ← Gemini Vision
RENAVAM: 12345678901                      ← Gemini Vision

INFRAÇÃO:
Nº Auto: T012345678                       ← Gemini Vision
Data: 15/10/2024                          ← Gemini Vision
Código: 574-20                            ← Gemini Vision
Órgão: DETRAN/SP                          ← Gemini Vision
```

---

## 🚀 Deploy

### 1. Commit

```bash
git add .
git commit -m "fix: Corrigir extração e uso de dados do perfil no recurso

- Adicionar logs detalhados para debug
- Garantir prioridade dos dados do perfil
- Melhorar prompt Gemini para não adicionar '[Não informado]'
- Usar dados reais sem placeholders"

git push origin main
```

### 2. Aguardar Deploy (2 min)

### 3. Testar

```
1. Verificar perfil completo
2. Criar recurso
3. Ver logs na Vercel
4. Verificar recurso gerado
```

---

## ⚠️ Ações Necessárias

### Para o Usuário

**ANTES de criar recurso:**
```
1. Ir para /dashboard/profile
2. Preencher TODOS os campos:
   - Nome completo ✅
   - CPF ✅
   - Telefone ✅
   - Endereço ✅ ← CRÍTICO!
3. Salvar alterações
4. Agora criar recurso
```

### Para o Sistema

**Se campo `address` não existe:**
```bash
# 1. Verificar schema.prisma
# Deve ter: address String?

# 2. Aplicar migration
npx prisma migrate deploy

# 3. Reiniciar aplicação
```

---

## 🔍 Debug Rápido

### Comando para testar localmente

```bash
# Ver dados do usuário
curl http://localhost:3000/api/user/profile \
  -H "Cookie: next-auth.session-token=..."

# Criar recurso e ver logs
# (fazer upload pelo frontend)
# Ver console do terminal
```

### Logs Esperados

```
✅ Analisando documentos com Gemini Vision...
✅ Gemini Vision concluído com sucesso!
✅ 📊 Dados combinados para o recurso: { driverName: 'João...', ... }
✅ 🤖 Gerando recurso com Gemini usando dados: { ... }
✅ Appeal created: clxxx...
```

---

## 💡 Explicação Técnica

### Fluxo de Dados

```
1. User faz login
   └─> Session tem user.id

2. Upload documentos
   └─> API busca dados do User (name, cpf, phone, address, email)
   └─> Gemini Vision extrai dados dos docs (placa, renavam, etc)

3. Combinar dados
   └─> extractedData (documentos)
   └─> Sobrescreve com user data (perfil)
   └─> completeData = { ...extracted, ...user }

4. Gerar recurso
   └─> Passa completeData para Gemini
   └─> Prompt usa dados reais (não adiciona placeholders)
   └─> Recurso gerado com todos os dados

5. Salvar
   └─> Appeal no banco com appealText
   └─> Status COMPLETED
```

### Por Que Estava Falhando

**Antes:**
```typescript
// Prompt tinha fallbacks genéricos
Nome: ${data.driverName || '[Nome não informado]'}

// Gemini via e copiava literalmente
"Nome: [Nome não informado]"  ❌
```

**Agora:**
```typescript
// Só inclui se existir
${data.driverName ? `Nome: ${data.driverName}` : ''}

// Gemini recebe apenas dados reais
"Nome: João da Silva Santos"  ✅
```

---

## ✅ Resultado Esperado

Após correção:

```
✅ Dados do perfil aparecem SEMPRE
✅ Gemini não inventa "[Não informado]"
✅ Campos vazios são omitidos (não marcados)
✅ Logs mostram exatamente o que foi enviado
✅ Recurso sai completo e profissional
```

---

**Execute o deploy e teste!** 🚀

**Certifique-se que o perfil está completo antes de criar recursos!**
