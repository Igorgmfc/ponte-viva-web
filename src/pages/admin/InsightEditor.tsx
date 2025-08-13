import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayout from '@/components/admin/Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/integrations/supabase/client'

interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  cover_image?: string
  status: 'draft' | 'published'
  author_id: string
  created_at: string
  updated_at: string
  published_at?: string
}
import { useNavigate, useParams } from 'react-router-dom'
import { Save, Eye, ArrowLeft } from 'lucide-react'

const InsightEditor = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    cover_image: '',
    status: 'draft' as 'draft' | 'published'
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing && id) {
      fetchPost(id)
    }
  }, [id, isEditing])

  const fetchPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) throw error

      setFormData({
        title: data.title,
        summary: data.summary,
        content: data.content,
        cover_image: data.cover_image || '',
        status: data.status as 'draft' | 'published'
      })
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      alert('Erro ao carregar o insight.')
      navigate('/admin/insights')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      const postData = {
        ...formData,
        author_id: user.id,
        updated_at: new Date().toISOString(),
        ...(formData.status === 'published' && !isEditing ? {
          published_at: new Date().toISOString()
        } : {})
      }

      if (isEditing && id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...postData,
            created_at: new Date().toISOString()
          }])

        if (error) throw error
      }

      navigate('/admin/insights')
    } catch (error) {
      console.error('Erro ao salvar post:', error)
      alert('Erro ao salvar o insight. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (initialLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/insights')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Editar Insight' : 'Criar Novo Insight'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditing ? 'Atualize seu insight existente.' : 'Compartilhe uma nova reflexão ou aprendizado.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Digite o título do seu insight"
                  required
                />
              </div>

              <div>
                <Label htmlFor="summary">Resumo *</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Um breve resumo que aparecerá na listagem"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cover_image">URL da Imagem de Capa</Label>
                <Input
                  id="cover_image"
                  type="url"
                  value={formData.cover_image}
                  onChange={(e) => handleInputChange('cover_image', e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {formData.cover_image && (
                  <div className="mt-2">
                    <img
                      src={formData.cover_image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Escreva o conteúdo completo do seu insight aqui..."
                  rows={15}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Você pode usar Markdown para formatação (negrito, links, listas, etc.)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publicação</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'draft' | 'published') => 
                    handleInputChange('status', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Rascunhos não aparecem no site público
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                'Salvando...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Atualizar Insight' : 'Criar Insight'}
                </>
              )}
            </Button>

            {formData.status === 'published' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Aqui você pode implementar uma prévia do post
                  alert('Funcionalidade de prévia será implementada em breve!')
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Prévia
              </Button>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default InsightEditor