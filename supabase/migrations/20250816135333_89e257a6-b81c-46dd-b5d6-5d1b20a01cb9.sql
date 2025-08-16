-- Permitir leitura pública de posts publicados
CREATE POLICY "Posts publicados são públicos" 
ON public.blog_posts 
FOR SELECT 
USING (status = 'published');