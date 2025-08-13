import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayout from '@/components/admin/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'
import { 
  FileText, 
  Mail, 
  Users, 
  Eye,
  TrendingUp,
  Clock
} from 'lucide-react'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalContacts: number
  newContacts: number
  totalUsers: number
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalContacts: 0,
    newContacts: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Buscar estatísticas dos posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('status')

      // Buscar estatísticas dos contatos
      const { data: contacts } = await supabase
        .from('contacts')
        .select('status')

      // Buscar estatísticas dos usuários (apenas para admin)
      let users = []
      if (isAdmin) {
        const { data: usersData } = await supabase
          .from('admin_users')
          .select('id')
        users = usersData || []
      }

      const totalPosts = posts?.length || 0
      const publishedPosts = posts?.filter(p => p.status === 'published').length || 0
      const draftPosts = posts?.filter(p => p.status === 'draft').length || 0
      
      const totalContacts = contacts?.length || 0
      const newContacts = contacts?.filter(c => c.status === 'novo').length || 0

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalContacts,
        newContacts,
        totalUsers: users.length,
      })
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Aqui está um resumo da sua operação digital.
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Insights
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedPosts} publicados, {stats.draftPosts} rascunhos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contatos Recebidos
              </CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.newContacts} novos para revisar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Insights Publicados
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedPosts}</div>
              <p className="text-xs text-muted-foreground">
                Visíveis no site público
              </p>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Membros da Equipe
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Usuários ativos no sistema
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="/admin/insights/new"
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Criar Novo Insight</div>
                <div className="text-sm text-gray-600">
                  Compartilhe uma nova reflexão ou aprendizado
                </div>
              </a>
              
              <a
                href="/admin/contacts"
                className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Revisar Contatos</div>
                <div className="text-sm text-gray-600">
                  {stats.newContacts} novos contatos aguardando
                </div>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Sistema funcionando perfeitamente. Todas as funcionalidades estão operacionais.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard