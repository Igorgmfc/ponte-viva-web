import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor'
  created_at: string
  updated_at: string
}

export interface BlogPost {
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

export interface Page {
  id: string
  slug: string
  title: string
  content: string
  updated_at: string
  updated_by: string
}

export interface Contact {
  id: string
  name: string
  email: string
  organization?: string
  message: string
  status: 'novo' | 'contatado' | 'em_negociacao' | 'arquivado'
  notes?: string
  created_at: string
  updated_at: string
}