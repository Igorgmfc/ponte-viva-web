import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AdminLayout from '@/components/admin/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { supabase, Contact } from '@/lib/supabase'
import { 
  Mail, 
  Calendar,
  Building2,
  MessageSquare,
  Eye,
  Save
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const AdminContacts = () => {
  const { isAdmin } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<Contact['status']>('novo')

  // Verificar se o usuário tem permissão para ver contatos
  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Restrito
          </h1>
          <p className="text-gray-600">
            Apenas administradores podem visualizar os contatos.
          </p>
        </div>
      </AdminLayout>
    )
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Erro ao buscar contatos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
    setNotes(contact.notes || '')
    setStatus(contact.status)
  }

  const handleUpdateContact = async () => {
    if (!selectedContact) return

    try {
      const { error } = await supabase
        .from('contacts')
        .update({
          status,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedContact.id)

      if (error) throw error

      // Atualizar a lista local
      setContacts(contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, status, notes, updated_at: new Date().toISOString() }
          : contact
      ))

      setSelectedContact(null)
    } catch (error) {
      console.error('Erro ao atualizar contato:', error)
      alert('Erro ao atualizar o contato. Tente novamente.')
    }
  }

  const getStatusBadge = (status: Contact['status']) => {
    const statusConfig = {
      novo: { label: 'Novo', variant: 'default' as const },
      contatado: { label: 'Contatado', variant: 'secondary' as const },
      em_negociacao: { label: 'Em Negociação', variant: 'default' as const },
      arquivado: { label: 'Arquivado', variant: 'outline' as const }
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusCount = (status: Contact['status']) => {
    return contacts.filter(contact => contact.status === status).length
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
            Caixa de Entrada de Contatos
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie todos os contatos recebidos pelo site.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{getStatusCount('novo')}</div>
              <p className="text-xs text-muted-foreground">Novos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{getStatusCount('contatado')}</div>
              <p className="text-xs text-muted-foreground">Contatados</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{getStatusCount('em_negociacao')}</div>
              <p className="text-xs text-muted-foreground">Em Negociação</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{getStatusCount('arquivado')}</div>
              <p className="text-xs text-muted-foreground">Arquivados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Contatos */}
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">Nenhum contato recebido ainda</h3>
              <p className="text-sm text-gray-600">
                Os contatos enviados pelo formulário do site aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        {getStatusBadge(contact.status)}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="hover:text-primary">
                            {contact.email}
                          </a>
                        </div>
                        
                        {contact.organization && (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {contact.organization}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(contact.created_at), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR })}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactClick(contact)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Contato</DialogTitle>
                        </DialogHeader>
                        
                        {selectedContact && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Nome</label>
                                <p className="text-sm text-gray-700">{selectedContact.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">E-mail</label>
                                <p className="text-sm text-gray-700">{selectedContact.email}</p>
                              </div>
                            </div>
                            
                            {selectedContact.organization && (
                              <div>
                                <label className="text-sm font-medium">Organização</label>
                                <p className="text-sm text-gray-700">{selectedContact.organization}</p>
                              </div>
                            )}
                            
                            <div>
                              <label className="text-sm font-medium">Mensagem</label>
                              <div className="bg-gray-50 p-3 rounded-md text-sm">
                                {selectedContact.message}
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Status</label>
                              <Select value={status} onValueChange={(value: Contact['status']) => setStatus(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="novo">Novo</SelectItem>
                                  <SelectItem value="contatado">Contatado</SelectItem>
                                  <SelectItem value="em_negociacao">Em Negociação</SelectItem>
                                  <SelectItem value="arquivado">Arquivado</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Anotações Internas</label>
                              <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Adicione suas anotações sobre este contato..."
                                rows={4}
                              />
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button onClick={handleUpdateContact}>
                                <Save className="w-4 h-4 mr-2" />
                                Salvar Alterações
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminContacts