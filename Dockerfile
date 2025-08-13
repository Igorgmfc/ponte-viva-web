# Dockerfile para hospedagem em VPS com Coolify

# Estágio 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar arquivos de dependências e instalar TUDO (dev também)
COPY package*.json ./
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Construir a aplicação (agora o 'vite' existe aqui)
RUN npm run build

# Estágio 2: Produção
FROM node:18-alpine
WORKDIR /app

# Copiar apenas os arquivos de dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Instalar o servidor web estático
RUN npm install -g serve

# Copiar os arquivos construídos do estágio anterior
COPY --from=builder /app/dist ./dist

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
