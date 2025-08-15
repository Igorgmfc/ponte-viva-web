-- Add missing columns to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS tags text[],
ADD COLUMN IF NOT EXISTS author text;

-- Create unique index for slug
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);

-- Update existing record with missing data
UPDATE blog_posts 
SET 
  slug = CASE 
    WHEN title ILIKE '%diagnóstico%' THEN 'diagnostico-dna-organizacional'
    ELSE lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
  END,
  category = 'Transformação Organizacional',
  author = 'Estratégia Viva',
  tags = ARRAY['DNA Organizacional', 'Diagnóstico', 'Transformação', 'Cultura Organizacional']
WHERE slug IS NULL;