# Dockerfile para hospedagem em VPS com Coolify
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Instalar servidor web estático
RUN npm install -g serve

# Expor porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist", "-l", "3000"]