export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      agent_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agent_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_runs: {
        Row: {
          agent_profile: string
          created_at: string
          id: string
          latency_ms: number | null
          metadata: Json | null
          model: string | null
          provider: string | null
          request_id: string
          session_id: string
          status: string
        }
        Insert: {
          agent_profile: string
          created_at?: string
          id?: string
          latency_ms?: number | null
          metadata?: Json | null
          model?: string | null
          provider?: string | null
          request_id: string
          session_id: string
          status: string
        }
        Update: {
          agent_profile?: string
          created_at?: string
          id?: string
          latency_ms?: number | null
          metadata?: Json | null
          model?: string | null
          provider?: string | null
          request_id?: string
          session_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agent_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_sessions: {
        Row: {
          agent_profile: string
          client_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          agent_profile: string
          client_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          agent_profile?: string
          client_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_config_audit: {
        Row: {
          config_version: number
          created_at: string
          fields_changed: string[]
          id: string
          new_values: Json | null
          previous_values: Json | null
          updated_by: string
        }
        Insert: {
          config_version: number
          created_at?: string
          fields_changed: string[]
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          updated_by: string
        }
        Update: {
          config_version?: number
          created_at?: string
          fields_changed?: string[]
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          updated_by?: string
        }
        Relationships: []
      }
      ai_runtime_config: {
        Row: {
          active_agent_profile: string
          anthropic_enhancement_model: string
          anthropic_fallback_model: string
          anthropic_judge_model: string
          anthropic_primary_model: string
          budget_policy: string
          chat_use_enhancement: boolean
          chat_use_fallback: boolean
          chat_use_judge: boolean
          daily_budget_usd: number | null
          embedding_dim: number
          embeddings_model: string
          embeddings_provider: string
          enabled: boolean
          enhancement_timeout_ms: number
          fallback_enabled: boolean
          fallback_timeout_ms: number
          id: string
          judge_timeout_ms: number
          max_tokens: number
          monthly_budget_usd: number | null
          openrouter_enhancement_model: string
          openrouter_fallback_model: string
          openrouter_judge_model: string
          openrouter_primary_model: string
          primary_model: string
          primary_provider: string
          primary_timeout_ms: number
          primary_weight: number
          routing_mode: string
          secondary_model: string
          secondary_provider: string
          secondary_weight: number | null
          temperature: number
          top_p: number
          updated_at: string
          updated_by: string
          version: number
        }
        Insert: {
          active_agent_profile?: string
          anthropic_enhancement_model?: string
          anthropic_fallback_model?: string
          anthropic_judge_model?: string
          anthropic_primary_model?: string
          budget_policy?: string
          chat_use_enhancement?: boolean
          chat_use_fallback?: boolean
          chat_use_judge?: boolean
          daily_budget_usd?: number | null
          embedding_dim?: number
          embeddings_model?: string
          embeddings_provider?: string
          enabled?: boolean
          enhancement_timeout_ms?: number
          fallback_enabled?: boolean
          fallback_timeout_ms?: number
          id?: string
          judge_timeout_ms?: number
          max_tokens?: number
          monthly_budget_usd?: number | null
          openrouter_enhancement_model?: string
          openrouter_fallback_model?: string
          openrouter_judge_model?: string
          openrouter_primary_model?: string
          primary_model?: string
          primary_provider?: string
          primary_timeout_ms?: number
          primary_weight?: number
          routing_mode?: string
          secondary_model?: string
          secondary_provider?: string
          secondary_weight?: number | null
          temperature?: number
          top_p?: number
          updated_at?: string
          updated_by?: string
          version?: number
        }
        Update: {
          active_agent_profile?: string
          anthropic_enhancement_model?: string
          anthropic_fallback_model?: string
          anthropic_judge_model?: string
          anthropic_primary_model?: string
          budget_policy?: string
          chat_use_enhancement?: boolean
          chat_use_fallback?: boolean
          chat_use_judge?: boolean
          daily_budget_usd?: number | null
          embedding_dim?: number
          embeddings_model?: string
          embeddings_provider?: string
          enabled?: boolean
          enhancement_timeout_ms?: number
          fallback_enabled?: boolean
          fallback_timeout_ms?: number
          id?: string
          judge_timeout_ms?: number
          max_tokens?: number
          monthly_budget_usd?: number | null
          openrouter_enhancement_model?: string
          openrouter_fallback_model?: string
          openrouter_judge_model?: string
          openrouter_primary_model?: string
          primary_model?: string
          primary_provider?: string
          primary_timeout_ms?: number
          primary_weight?: number
          routing_mode?: string
          secondary_model?: string
          secondary_provider?: string
          secondary_weight?: number | null
          temperature?: number
          top_p?: number
          updated_at?: string
          updated_by?: string
          version?: number
        }
        Relationships: []
      }
      ai_usage_events: {
        Row: {
          agent_profile: string
          cached_tokens: number
          cost_type: string | null
          cost_usd: number | null
          created_at: string
          error_type: string | null
          fallback_used: boolean
          id: string
          input_tokens: number
          latency_ms: number | null
          model: string
          output_tokens: number
          provider: string
          request_id: string
          session_id: string | null
          status: string
          ttft_ms: number | null
        }
        Insert: {
          agent_profile: string
          cached_tokens?: number
          cost_type?: string | null
          cost_usd?: number | null
          created_at?: string
          error_type?: string | null
          fallback_used?: boolean
          id?: string
          input_tokens?: number
          latency_ms?: number | null
          model: string
          output_tokens?: number
          provider: string
          request_id?: string
          session_id?: string | null
          status: string
          ttft_ms?: number | null
        }
        Update: {
          agent_profile?: string
          cached_tokens?: number
          cost_type?: string | null
          cost_usd?: number | null
          created_at?: string
          error_type?: string | null
          fallback_used?: boolean
          id?: string
          input_tokens?: number
          latency_ms?: number | null
          model?: string
          output_tokens?: number
          provider?: string
          request_id?: string
          session_id?: string | null
          status?: string
          ttft_ms?: number | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          orden: number | null
          slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          orden?: number | null
          slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          orden?: number | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category_id: string | null
          content: string | null
          cover_image_path: string | null
          created_at: string
          excerpt: string | null
          featured: boolean
          id: string
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["blog_status"]
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_path?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["blog_status"]
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          cover_image_path?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["blog_status"]
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: string
          messages: Json
          name: string | null
          phone: string | null
          session_id: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          phone?: string | null
          session_id: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          messages?: Json
          name?: string | null
          phone?: string | null
          session_id?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          name: string
          organization_id: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name: string
          organization_id: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name?: string
          organization_id?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_chunks: {
        Row: {
          chunk_index: number
          client_id: string | null
          content: string
          created_at: string
          document_id: string
          embedding: string | null
          id: string
          metadata: Json | null
          organization_id: string | null
          token_count: number | null
        }
        Insert: {
          chunk_index: number
          client_id?: string | null
          content: string
          created_at?: string
          document_id: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          token_count?: number | null
        }
        Update: {
          chunk_index?: number
          client_id?: string | null
          content?: string
          created_at?: string
          document_id?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_chunks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "knowledge_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_chunks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_documents: {
        Row: {
          client_id: string | null
          created_at: string
          embedding_dim: number
          embedding_model: string
          id: string
          metadata: Json | null
          mime_type: string | null
          organization_id: string | null
          source_type: string
          source_url: string | null
          status: Database["public"]["Enums"]["knowledge_status"]
          storage_path: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          embedding_dim?: number
          embedding_model?: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id?: string | null
          source_type: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["knowledge_status"]
          storage_path?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          embedding_dim?: number
          embedding_model?: string
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id?: string | null
          source_type?: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["knowledge_status"]
          storage_path?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string
          concern: string | null
          created_at: string
          details: Json | null
          email: string
          id: string
          name: string
          source: string | null
          user_agent: string | null
          website: string | null
        }
        Insert: {
          company: string
          concern?: string | null
          created_at?: string
          details?: Json | null
          email: string
          id?: string
          name: string
          source?: string | null
          user_agent?: string | null
          website?: string | null
        }
        Update: {
          company?: string
          concern?: string | null
          created_at?: string
          details?: Json | null
          email?: string
          id?: string
          name?: string
          source?: string | null
          user_agent?: string | null
          website?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      postulacion_eventos: {
        Row: {
          created_at: string
          estado_anterior:
            | Database["public"]["Enums"]["postulacion_estado"]
            | null
          estado_nuevo: Database["public"]["Enums"]["postulacion_estado"] | null
          id: string
          nota: string | null
          postulacion_id: string
          tipo: string
        }
        Insert: {
          created_at?: string
          estado_anterior?:
            | Database["public"]["Enums"]["postulacion_estado"]
            | null
          estado_nuevo?:
            | Database["public"]["Enums"]["postulacion_estado"]
            | null
          id?: string
          nota?: string | null
          postulacion_id: string
          tipo: string
        }
        Update: {
          created_at?: string
          estado_anterior?:
            | Database["public"]["Enums"]["postulacion_estado"]
            | null
          estado_nuevo?:
            | Database["public"]["Enums"]["postulacion_estado"]
            | null
          id?: string
          nota?: string | null
          postulacion_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "postulacion_eventos_postulacion_id_fkey"
            columns: ["postulacion_id"]
            isOneToOne: false
            referencedRelation: "postulaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      postulaciones: {
        Row: {
          consent_at: string | null
          created_at: string
          cv_path: string | null
          email: string
          estado: Database["public"]["Enums"]["postulacion_estado"]
          id: string
          mensaje: string | null
          nombre: string
          notas_internas: string | null
          portafolio_url: string | null
          source: string | null
          telefono: string | null
          tipo: Database["public"]["Enums"]["postulacion_tipo"]
          updated_at: string
          vacante_id: string | null
        }
        Insert: {
          consent_at?: string | null
          created_at?: string
          cv_path?: string | null
          email: string
          estado?: Database["public"]["Enums"]["postulacion_estado"]
          id?: string
          mensaje?: string | null
          nombre: string
          notas_internas?: string | null
          portafolio_url?: string | null
          source?: string | null
          telefono?: string | null
          tipo: Database["public"]["Enums"]["postulacion_tipo"]
          updated_at?: string
          vacante_id?: string | null
        }
        Update: {
          consent_at?: string | null
          created_at?: string
          cv_path?: string | null
          email?: string
          estado?: Database["public"]["Enums"]["postulacion_estado"]
          id?: string
          mensaje?: string | null
          nombre?: string
          notas_internas?: string | null
          portafolio_url?: string | null
          source?: string | null
          telefono?: string | null
          tipo?: Database["public"]["Enums"]["postulacion_tipo"]
          updated_at?: string
          vacante_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postulaciones_vacante_id_fkey"
            columns: ["vacante_id"]
            isOneToOne: false
            referencedRelation: "vacantes"
            referencedColumns: ["id"]
          },
        ]
      }
      vacantes: {
        Row: {
          area: string
          created_at: string
          descripcion: string | null
          destacada: boolean
          estado: Database["public"]["Enums"]["vacante_estado"]
          fecha_cierre: string | null
          fecha_publicacion: string | null
          id: string
          modalidad: string | null
          orden: number | null
          requisitos: string | null
          responsabilidades: string | null
          slug: string
          titulo: string
          ubicacion: string | null
          updated_at: string
        }
        Insert: {
          area: string
          created_at?: string
          descripcion?: string | null
          destacada?: boolean
          estado?: Database["public"]["Enums"]["vacante_estado"]
          fecha_cierre?: string | null
          fecha_publicacion?: string | null
          id?: string
          modalidad?: string | null
          orden?: number | null
          requisitos?: string | null
          responsabilidades?: string | null
          slug: string
          titulo: string
          ubicacion?: string | null
          updated_at?: string
        }
        Update: {
          area?: string
          created_at?: string
          descripcion?: string | null
          destacada?: boolean
          estado?: Database["public"]["Enums"]["vacante_estado"]
          fecha_cierre?: string | null
          fecha_publicacion?: string | null
          id?: string
          modalidad?: string | null
          orden?: number | null
          requisitos?: string | null
          responsabilidades?: string | null
          slug?: string
          titulo?: string
          ubicacion?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_knowledge_chunks: {
        Args: {
          client_filter?: string
          match_count?: number
          match_threshold?: number
          organization_filter?: string
          query_embedding: string
        }
        Returns: {
          chunk_id: string
          content: string
          document_id: string
          metadata: Json
          similarity: number
        }[]
      }
    }
    Enums: {
      blog_status: "draft" | "published" | "archived"
      knowledge_status: "pending" | "processing" | "ready" | "failed"
      postulacion_estado:
        | "nueva"
        | "revision"
        | "contactado"
        | "entrevista"
        | "descartado"
        | "seleccionado"
      postulacion_tipo: "candidato" | "servicio"
      vacante_estado: "borrador" | "activa" | "cerrada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      blog_status: ["draft", "published", "archived"],
      knowledge_status: ["pending", "processing", "ready", "failed"],
      postulacion_estado: [
        "nueva",
        "revision",
        "contactado",
        "entrevista",
        "descartado",
        "seleccionado",
      ],
      postulacion_tipo: ["candidato", "servicio"],
      vacante_estado: ["borrador", "activa", "cerrada"],
    },
  },
} as const
