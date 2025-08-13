import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Session } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor'
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  isAdmin: boolean
  isEditor: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Configurar listener primeiro para capturar todos os eventos
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id)
        setSession(session)
        
        if (session?.user) {
          // Usar setTimeout para evitar deadlocks do Supabase
          setTimeout(() => {
            fetchUserProfile(session.user.id)
          }, 0)
        } else {
          setUser(null)
          setLoading(false)
        }
      }
    )

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id)
      setSession(session)
      if (session?.user) {
        setTimeout(() => {
          fetchUserProfile(session.user.id)
        }, 0)
      } else {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Tentando buscar perfil para userId:', userId)
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Erro ao buscar perfil do usuário:', error)
        throw error
      }
      console.log('Perfil encontrado:', data)
      setUser(data as User)
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: 'Erro inesperado ao fazer login' }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  const isAdmin = user?.role === 'admin'
  const isEditor = user?.role === 'editor' || isAdmin

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    isAdmin,
    isEditor,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}