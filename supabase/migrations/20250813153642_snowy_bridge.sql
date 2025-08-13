/*
  # Sistema Administrativo Estratégia Viva

  1. Tabelas Principais
    - `admin_users` - Usuários do sistema administrativo
    - `blog_posts` - Posts do blog (Insights)
    - `pages` - Páginas estáticas editáveis
    - `contacts` - Contatos recebidos pelo formulário

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas específicas para cada tipo de usuário
    - Autenticação via Supabase Auth

  3. Funcionalidades
    - Sistema de permissões (admin/editor)
    - Gestão de conteúdo completa
    - CRM básico para contatos
*/

-- Tabela de usuários administrativos
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor')) DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de posts do blog (Insights)
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  cover_image text,
  status text NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  author_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Tabela de páginas estáticas
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  message text NOT NULL,
  status text NOT NULL CHECK (status IN ('novo', 'contatado', 'em_negociacao', 'arquivado')) DEFAULT 'novo',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Políticas para admin_users
CREATE POLICY "Admins podem ver todos os usuários"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin'
    )
  );

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins podem gerenciar usuários"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin'
    )
  );

-- Políticas para blog_posts
CREATE POLICY "Editores podem ver todos os posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editores podem criar posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editores podem atualizar posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editores podem deletar posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

-- Políticas para pages
CREATE POLICY "Editores podem ver páginas"
  ON pages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editores podem gerenciar páginas"
  ON pages
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role IN ('admin', 'editor')
    )
  );

-- Políticas para contacts
CREATE POLICY "Apenas admins podem ver contatos"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin'
    )
  );

CREATE POLICY "Apenas admins podem gerenciar contatos"
  ON contacts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au 
      WHERE au.id = auth.uid() AND au.role = 'admin'
    )
  );

-- Permitir inserção de contatos via formulário público (sem autenticação)
CREATE POLICY "Permitir inserção pública de contatos"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Inserir páginas padrão
INSERT INTO pages (slug, title, content, updated_at) VALUES
  ('filosofia', 'Nossa Filosofia', 'Conteúdo da página de filosofia...', now()),
  ('jornadas', 'As Jornadas', 'Conteúdo da página de jornadas...', now()),
  ('estudo-de-caso', 'Estudo de Caso', 'Conteúdo do estudo de caso...', now())
ON CONFLICT (slug) DO NOTHING;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para definir published_at quando status muda para published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_blog_posts_published_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION set_published_at();