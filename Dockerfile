# =================================================================
# Estágio 1: O Construtor (Builder)
# Aqui nós instalamos tudo e construímos o site.
# =================================================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copia a planta. Se o lockfile não existir, não tem problema.
COPY package.json package-lock.json* ./

# 'npm install' é flexível. Ele vai criar o lockfile se não existir.
RUN npm install

# Copia o resto do código fonte.
COPY . .

# Constrói a versão final do site na pasta /app/dist.
RUN npm run build


# =================================================================
# Estágio 2: O Entregador (Server)
# Este é um contêiner limpo que só serve o site pronto.
# =================================================================
FROM node:18-alpine
WORKDIR /app

# Instala APENAS a ferramenta que precisamos: o servidor 'serve'.
RUN npm install -g serve

# Copia o site pronto (a pasta 'dist') do estágio do Construtor.
COPY --from=builder /app/dist ./dist

# Expõe a porta que o servidor vai usar.
EXPOSE 3000

# Comando final para iniciar o servidor.
# A flag '-s' é crucial para que o roteamento de páginas como /admin funcione.
CMD ["serve", "-s", "dist", "-l", "3000"]
