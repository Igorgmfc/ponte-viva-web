import { supabase } from '@/integrations/supabase/client'

// API para o site público consumir
export const publicAPI = {
  // Buscar posts publicados para o blog público
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        summary,
        content,
        cover_image,
        published_at,
        admin_users!blog_posts_author_id_fkey(name)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Buscar um post específico
  async getPost(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        summary,
        content,
        cover_image,
        published_at,
        admin_users!blog_posts_author_id_fkey(name)
      `)
      .eq('id', id)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data
  },

  // Buscar conteúdo de páginas
  async getPage(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('title, content, updated_at')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  // Enviar contato (formulário público)
  async submitContact(contactData: {
    name: string
    email: string
    organization?: string
    message: string
  }) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        ...contactData,
        status: 'novo',
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Função para integrar com o formulário de contato existente
export const handleContactSubmit = async (formData: FormData) => {
  const contactData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    organization: formData.get('organization') as string || undefined,
    message: formData.get('message') as string,
  }

  try {
    await publicAPI.submitContact(contactData)
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar contato:', error)
    return { success: false, error: 'Erro ao enviar mensagem. Tente novamente.' }
  }
}