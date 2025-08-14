# =================================================================
# Estágio 1: O Construtor (Builder)
# Aqui nós instalamos tudo e construímos o site.
# =================================================================
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copia a planta. Se o lockfile não existir, não tem problema.
COPY package.json package-lock.json* ./

# 'npm install' é flexível. Ele vai criar o lockfile se não existir.
RUN npm ci --only=production

# Copia o resto do código fonte.
COPY . .

# Definir variáveis de ambiente para build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

# Constrói a versão final do site na pasta /app/dist.
RUN npm run build


# =================================================================
# Estágio 2: O Entregador (Server)
# Este é um contêiner limpo que só serve o site pronto.
# =================================================================
FROM node:20-alpine AS production
WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Instala APENAS a ferramenta que precisamos: o servidor 'serve'.
RUN npm install -g serve

# Copia o site pronto (a pasta 'dist') do estágio do Construtor.
COPY --from=builder /app/dist ./dist

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expõe a porta que o servidor vai usar.
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Comando final para iniciar o servidor.
# A flag '-s' é crucial para que o roteamento de páginas como /admin funcione.
CMD ["serve", "-s", "dist", "-l", "3000"]
