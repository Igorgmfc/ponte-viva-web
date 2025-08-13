import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayout from '@/components/admin/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase, BlogPost } from '@/lib/supabase'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const AdminInsights = () => {
  const { isEditor } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          admin_users!blog_posts_author_id_fkey(name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este insight?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Erro ao excluir post:', error)
      alert('Erro ao excluir o insight. Tente novamente.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Publicado</Badge>
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Insights (Blog)
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie o conteúdo do seu ateliê de ideias.
            </p>
          </div>
          
          {isEditor && (
            <Button asChild>
              <Link to="/admin/insights/new">
                <Plus className="w-4 h-4 mr-2" />
                Criar Novo Insight
              </Link>
            </Button>
          )}
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">Nenhum insight criado ainda</h3>
                <p className="text-sm">
                  Comece criando seu primeiro insight para compartilhar conhecimento.
                </p>
              </div>
              {isEditor && (
                <Button asChild>
                  <Link to="/admin/insights/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Insight
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        {getStatusBadge(post.status)}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {post.summary}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {(post as any).admin_users?.name || 'Autor desconhecido'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(post.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        {post.published_at && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Publicado em {format(new Date(post.published_at), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-24 h-16 object-cover rounded ml-4"
                      />
                    )}
                  </div>
                </CardHeader>
                
                {isEditor && (
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/insights/edit/${post.id}`}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminInsights