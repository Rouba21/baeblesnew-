export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          release_date: string | null
          series_id: string | null
          series_name: string | null
          series_position: number | null
          subgenres: string[] | null
          title: string
          tropes: string[] | null
        }
        Insert: {
          author: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          release_date?: string | null
          series_id?: string | null
          series_name?: string | null
          series_position?: number | null
          subgenres?: string[] | null
          title: string
          tropes?: string[] | null
        }
        Update: {
          author?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          release_date?: string | null
          series_id?: string | null
          series_name?: string | null
          series_position?: number | null
          subgenres?: string[] | null
          title?: string
          tropes?: string[] | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          book_id: string | null
          content: string
          created_at: string
          id: string
          parent_id: string | null
          thread_id: string
        }
        Insert: {
          author_id: string
          book_id?: string | null
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          thread_id: string
        }
        Update: {
          author_id?: string
          book_id?: string | null
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_id: string
          avatar_url: string | null
          created_at: string
          fantasy_name: string
          favorite_authors: string[] | null
          favorite_books: string[] | null
          favorite_subgenres: string[] | null
          favorite_tropes: string[] | null
          followers_count: number
          following_count: number
          gender: string
          id: string
          intentions: string[] | null
          is_advertiser: boolean
          onboarding_completed: boolean
          privacy_reco: boolean
          privacy_series: boolean
          privacy_tbr: boolean
          privacy_threads: boolean
          race: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_id?: string
          avatar_url?: string | null
          created_at?: string
          fantasy_name?: string
          favorite_authors?: string[] | null
          favorite_books?: string[] | null
          favorite_subgenres?: string[] | null
          favorite_tropes?: string[] | null
          followers_count?: number
          following_count?: number
          gender?: string
          id?: string
          intentions?: string[] | null
          is_advertiser?: boolean
          onboarding_completed?: boolean
          privacy_reco?: boolean
          privacy_series?: boolean
          privacy_tbr?: boolean
          privacy_threads?: boolean
          race?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_id?: string
          avatar_url?: string | null
          created_at?: string
          fantasy_name?: string
          favorite_authors?: string[] | null
          favorite_books?: string[] | null
          favorite_subgenres?: string[] | null
          favorite_tropes?: string[] | null
          followers_count?: number
          following_count?: number
          gender?: string
          id?: string
          intentions?: string[] | null
          is_advertiser?: boolean
          onboarding_completed?: boolean
          privacy_reco?: boolean
          privacy_series?: boolean
          privacy_tbr?: boolean
          privacy_threads?: boolean
          race?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendation_requests: {
        Row: {
          author_id: string
          content: string
          created_at: string
          has_spoilers: boolean
          id: string
          is_mature: boolean
          responses_count: number
          subgenre: string | null
          tropes: string[] | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          has_spoilers?: boolean
          id?: string
          is_mature?: boolean
          responses_count?: number
          subgenre?: string | null
          tropes?: string[] | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          has_spoilers?: boolean
          id?: string
          is_mature?: boolean
          responses_count?: number
          subgenre?: string | null
          tropes?: string[] | null
        }
        Relationships: []
      }
      recommendation_responses: {
        Row: {
          author_id: string
          book_id: string
          created_at: string
          id: string
          reason: string | null
          request_id: string
        }
        Insert: {
          author_id: string
          book_id: string
          created_at?: string
          id?: string
          reason?: string | null
          request_id: string
        }
        Update: {
          author_id?: string
          book_id?: string
          created_at?: string
          id?: string
          reason?: string | null
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_responses_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_responses_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "recommendation_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      room_memberships: {
        Row: {
          id: string
          joined_at: string
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_memberships_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_mature: boolean
          members_count: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_mature?: boolean
          members_count?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_mature?: boolean
          members_count?: number
          name?: string
        }
        Relationships: []
      }
      saved_threads: {
        Row: {
          id: string
          saved_at: string
          thread_id: string
          user_id: string
        }
        Insert: {
          id?: string
          saved_at?: string
          thread_id: string
          user_id: string
        }
        Update: {
          id?: string
          saved_at?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_threads_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      series_follows: {
        Row: {
          created_at: string
          id: string
          series_id: string
          series_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          series_id: string
          series_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          series_id?: string
          series_name?: string
          user_id?: string
        }
        Relationships: []
      }
      tbr_books: {
        Row: {
          added_at: string
          book_id: string
          id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          book_id: string
          id?: string
          user_id: string
        }
        Update: {
          added_at?: string
          book_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tbr_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          author_id: string
          book_id: string | null
          comments_count: number
          content: string
          created_at: string
          has_spoilers: boolean
          id: string
          is_mature: boolean
          room_id: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          author_id: string
          book_id?: string | null
          comments_count?: number
          content: string
          created_at?: string
          has_spoilers?: boolean
          id?: string
          is_mature?: boolean
          room_id: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          book_id?: string | null
          comments_count?: number
          content?: string
          created_at?: string
          has_spoilers?: boolean
          id?: string
          is_mature?: boolean
          room_id?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "threads_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
