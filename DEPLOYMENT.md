# Deployment Guide - Estratégia Viva

## Coolify Deployment

Este projeto está configurado para deployment automático no Coolify. Siga os passos abaixo:

### 1. Configuração no Coolify

1. **Criar novo projeto** no Coolify
2. **Conectar repositório Git**
3. **Configurar variáveis de ambiente**:
   ```
   VITE_SUPABASE_URL=https://pfxwsqfobdewcbwjkmfg.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeHdzcWZvYmRld2Nid2prbWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwOTk4NzksImV4cCI6MjA3MDY3NTg3OX0.JOuQvgZhkL3dne5BIaywydif71NvO9bXfXtyUNwYiFI
   NODE_ENV=production
   ```

### 2. Configuração de Build

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: `3000`
- **Health Check**: `http://localhost:3000`

### 3. Configuração do Supabase

Certifique-se de que as migrações foram executadas:

1. Acesse o Supabase Dashboard
2. Vá para SQL Editor
3. Execute as migrações em `supabase/migrations/`
4. Crie o primeiro usuário admin:

```sql
-- Primeiro, crie o usuário no Auth do Supabase
-- Depois execute:
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'uuid_do_usuario_criado_no_auth',
  'admin@estrategiaviva.com.br',
  'Administrador',
  'admin'
);
```

### 4. Verificações Pós-Deploy

1. **Site público**: Verifique se todas as páginas carregam
2. **Admin login**: Teste o login em `/admin/login`
3. **Formulário de contato**: Teste o envio de mensagens
4. **Health check**: Verifique `https://seudominio.com/health`

### 5. Monitoramento

O projeto inclui:
- **Health checks** automáticos
- **Logs estruturados**
- **Métricas de performance**

### 6. Troubleshooting

#### Erro de Build
```bash
# Verificar logs de build
docker logs <container_id>

# Testar build local
npm run build
```

#### Erro de Conexão Supabase
- Verificar variáveis de ambiente
- Confirmar que as migrações foram executadas
- Testar conexão no console do navegador

#### Erro 404 em Rotas
- Confirmar que o servidor está configurado para SPA
- Verificar se o `serve -s` está sendo usado

## Estrutura de Arquivos

```
/
├── Dockerfile              # Container configuration
├── docker-compose.yml      # Local development
├── coolify.yml             # Coolify configuration
├── nginx.conf              # Alternative nginx config
├── .dockerignore           # Docker ignore rules
├── .env.production         # Production environment
└── DEPLOYMENT.md           # This file
```

## Recursos Adicionais

- [Coolify Documentation](https://coolify.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Production Build](https://vitejs.dev/guide/build.html)