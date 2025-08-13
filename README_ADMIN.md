# Portal Administrativo - Estratégia Viva

## 🎯 Visão Geral

Este é o sistema administrativo completo da Estratégia Viva, permitindo gestão autônoma de todo o conteúdo do site e leads gerados.

## 🚀 Funcionalidades

### 1. Sistema de Autenticação
- Login seguro para equipe
- Dois níveis de permissão:
  - **Administrador**: Acesso total (conteúdo + contatos + equipe)
  - **Editor**: Apenas conteúdo (posts e páginas)

### 2. Gestão de Conteúdo (CMS)
- **Insights (Blog)**: Criar, editar e publicar posts
- **Páginas**: Editar conteúdo de páginas estáticas
- **Editor Rich Text**: Suporte a Markdown
- **Sistema de Rascunhos**: Salvar antes de publicar

### 3. CRM de Contatos
- **Caixa de Entrada**: Todos os contatos do formulário
- **Gestão de Status**: Novo → Contatado → Em Negociação → Arquivado
- **Anotações Internas**: Para acompanhamento da equipe
- **Acesso Restrito**: Apenas administradores

## 🔧 Configuração

### 1. Configurar Supabase
```bash
# 1. Crie um projeto no Supabase (https://supabase.com)
# 2. Execute a migração SQL em supabase/migrations/create_admin_system.sql
# 3. Configure as variáveis de ambiente
cp .env.example .env
```

### 2. Variáveis de Ambiente
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 3. Criar Primeiro Usuário Administrador
No SQL Editor do Supabase:
```sql
-- Primeiro, crie o usuário no Auth
-- Depois execute:
INSERT INTO admin_users (id, email, name, role)
VALUES (
  'uuid_do_usuario_criado_no_auth',
  'seu@email.com',
  'Seu Nome',
  'admin'
);
```

## 📱 Como Usar

### Acessar o Portal
- URL: `https://seusite.com/admin`
- Login com email e senha configurados no Supabase Auth

### Criar Conteúdo
1. **Novo Insight**: Admin → Insights → Criar Novo
2. **Editar Página**: Admin → Páginas → Selecionar página
3. **Gerenciar Contatos**: Admin → Contatos (apenas admins)

### Fluxo de Publicação
1. Criar como **Rascunho**
2. Revisar conteúdo
3. Alterar status para **Publicado**
4. Conteúdo aparece automaticamente no site público

## 🔒 Segurança

- **RLS (Row Level Security)** habilitado
- **Políticas específicas** por tipo de usuário
- **Autenticação via Supabase Auth**
- **Validação de permissões** em todas as operações

## 🌐 Integração com Site Público

### API Endpoints Disponíveis
- `GET /api/posts` - Posts publicados
- `GET /api/posts/:id` - Post específico
- `GET /api/pages/:slug` - Conteúdo de página
- `POST /api/contacts` - Enviar contato

### Formulário de Contato
O formulário público já está integrado e envia dados diretamente para o CRM.

## 📊 Estrutura do Banco

### Tabelas Principais
- `admin_users` - Usuários do sistema
- `blog_posts` - Posts do blog (Insights)
- `pages` - Páginas estáticas
- `contacts` - Contatos recebidos

### Relacionamentos
- Posts → Usuários (autor)
- Páginas → Usuários (última edição)
- Contatos → Status e anotações

## 🎨 Interface

- **Design Responsivo**: Funciona em desktop e mobile
- **Navegação Intuitiva**: Sidebar com acesso rápido
- **Dashboard**: Visão geral das métricas
- **Formulários Simples**: Fácil de usar como escrever email

## 🔄 Próximos Passos

1. **Configurar Supabase** seguindo as instruções
2. **Criar primeiro usuário admin**
3. **Testar todas as funcionalidades**
4. **Convidar equipe** (se necessário)
5. **Começar a criar conteúdo**

## 📞 Suporte

Para dúvidas sobre configuração ou uso:
- Documentação do Supabase: https://supabase.com/docs
- Este sistema foi desenvolvido especificamente para a Estratégia Viva

---

**🎉 Seu portal administrativo está pronto para uso!**