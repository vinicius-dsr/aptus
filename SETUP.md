# 🚀 Guia Rápido de Setup - Aptus

## 1️⃣ Instalar Dependências

```bash
npm install
```

Isso vai instalar todas as dependências do `package.json` e executar `prisma generate` automaticamente.

## 2️⃣ Configurar Banco de Dados PostgreSQL

### Opção A: PostgreSQL Local

```bash
# Instale o PostgreSQL no Windows
# Download: https://www.postgresql.org/download/windows/

# Depois de instalar, crie o banco:
psql -U postgres
CREATE DATABASE aptus;
\q
```

### Opção B: Usar Supabase (Grátis)

1. Acesse: https://supabase.com
2. Crie um projeto
3. Copie a connection string em `Settings > Database`
4. Use no `.env` (formato: `postgresql://postgres:[SENHA]@[HOST]:5432/postgres`)

### Opção C: Docker (Rápido)

```bash
docker run --name aptus-postgres -e POSTGRES_PASSWORD=senha123 -e POSTGRES_DB=aptus -p 5432:5432 -d postgres:15
```

## 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/aptus"

# NextAuth (gere um secret com: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cole-aqui-o-secret-gerado"

# OpenAI
OPENAI_API_KEY="sk-sua-chave-openai"

# Email (Gmail exemplo)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASSWORD="senha-de-app-do-gmail"
EMAIL_FROM="Aptus <seu-email@gmail.com>"
```

### 📧 Como obter senha de app do Gmail:

1. Vá em: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas"
3. Vá em "Senhas de app": https://myaccount.google.com/apppasswords
4. Crie uma senha para "Mail" / "Windows Computer"
5. Use essa senha no `EMAIL_PASSWORD`

### 🤖 Como obter API Key da OpenAI:

1. Acesse: https://platform.openai.com/api-keys
2. Crie uma nova chave
3. **IMPORTANTE**: Adicione créditos na conta (mínimo $5)
4. Cole no `OPENAI_API_KEY`

## 4️⃣ Criar Tabelas no Banco

```bash
npx prisma db push
```

Isso vai criar todas as tabelas necessárias.

## 5️⃣ Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

## ✅ Checklist de Configuração

- [ ] PostgreSQL rodando
- [ ] `.env` criado com todas as variáveis
- [ ] `npm install` executado
- [ ] `npx prisma db push` executado
- [ ] OpenAI API Key válida com créditos
- [ ] Credenciais de email configuradas
- [ ] Servidor rodando em `localhost:3000`

## 🧪 Testar a Aplicação

1. **Criar conta**: Vá em "Começar Agora"
2. **Login**: Entre com suas credenciais
3. **Upload**: Envie 3 documentos (CNH, CRLV, Multa)
4. **Aguarde**: O OCR e GPT-4 vão processar (30-60 segundos)
5. **Resultado**: Veja o recurso gerado
6. **Download**: Baixe o PDF
7. **Enviar**: Envie por email (teste com seu próprio email)

## 🐛 Problemas Comuns

### Erro: "Database connection failed"
- Verifique se o PostgreSQL está rodando
- Confirme a `DATABASE_URL` no `.env`
- Teste conexão: `npx prisma db push`

### Erro: "OpenAI API Error"
- Confirme que a API Key está correta
- Verifique se tem créditos disponíveis
- Veja logs em: https://platform.openai.com/usage

### Erro: "Email sending failed"
- Para Gmail, use senha de app (não senha normal)
- Confirme que 2FA está ativo
- Teste com outro provedor SMTP

### OCR não está funcionando bem
- Tesseract funciona melhor com imagens nítidas
- Use documentos em alta resolução
- Considere trocar por Google Vision API para melhor precisão

## 🎯 Pronto!

Sua aplicação está configurada e pronta para uso!

## 📚 Próximos Passos

- Explore o código em `src/`
- Personalize os templates de recursos
- Configure deploy na Vercel
- Veja o README.md para mais informações

## 🆘 Precisa de Ajuda?

- Abra uma issue no GitHub
- Consulte a documentação do Next.js: https://nextjs.org/docs
- Documentação Prisma: https://www.prisma.io/docs
