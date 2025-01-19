export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      movies: {
        Row: {
          backdrop_path: string | null
          genre_ids: number[] | null
          imdb_id: string
          imdb_vote_count: number | null
          imdb_vote_mean: number | null
          overview: string | null
          poster_path: string | null
          title: string | null
          tmdb_id: number
          tmdb_vote_count: number | null
          tmdb_vote_mean: number | null
          year: number | null
        }
        Insert: {
          backdrop_path?: string | null
          genre_ids?: number[] | null
          imdb_id: string
          imdb_vote_count?: number | null
          imdb_vote_mean?: number | null
          overview?: string | null
          poster_path?: string | null
          title?: string | null
          tmdb_id: number
          tmdb_vote_count?: number | null
          tmdb_vote_mean?: number | null
          year?: number | null
        }
        Update: {
          backdrop_path?: string | null
          genre_ids?: number[] | null
          imdb_id?: string
          imdb_vote_count?: number | null
          imdb_vote_mean?: number | null
          overview?: string | null
          poster_path?: string | null
          title?: string | null
          tmdb_id?: number
          tmdb_vote_count?: number | null
          tmdb_vote_mean?: number | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_movies_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: true
            referencedRelation: "movies"
            referencedColumns: ["imdb_id"]
          },
          {
            foreignKeyName: "public_movies_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: true
            referencedRelation: "movies_with_rating_and_popularity"
            referencedColumns: ["imdb_id"]
          },
        ]
      }
      ratings: {
        Row: {
          created_at: string
          imdb_id: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          imdb_id: string
          updated_at?: string
          user_id?: string
          value: number
        }
        Update: {
          created_at?: string
          imdb_id?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_ratings_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["imdb_id"]
          },
          {
            foreignKeyName: "public_ratings_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: false
            referencedRelation: "movies_with_rating_and_popularity"
            referencedColumns: ["imdb_id"]
          },
        ]
      }
      watched: {
        Row: {
          date: string
          imdb_id: string
          user_id: string
        }
        Insert: {
          date: string
          imdb_id: string
          user_id?: string
        }
        Update: {
          date?: string
          imdb_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_watched_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["imdb_id"]
          },
          {
            foreignKeyName: "public_watched_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: false
            referencedRelation: "movies_with_rating_and_popularity"
            referencedColumns: ["imdb_id"]
          },
        ]
      }
    }
    Views: {
      movies_with_rating_and_popularity: {
        Row: {
          backdrop_path: string | null
          genre_ids: number[] | null
          imdb_id: string | null
          imdb_vote_count: number | null
          imdb_vote_mean: number | null
          last_rated: string | null
          overview: string | null
          popularity: number | null
          poster_path: string | null
          title: string | null
          tmdb_id: number | null
          tmdb_vote_count: number | null
          tmdb_vote_mean: number | null
          vote_count: number | null
          vote_mean: number | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_movies_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: true
            referencedRelation: "movies"
            referencedColumns: ["imdb_id"]
          },
          {
            foreignKeyName: "public_movies_imdb_id_fkey"
            columns: ["imdb_id"]
            isOneToOne: true
            referencedRelation: "movies_with_rating_and_popularity"
            referencedColumns: ["imdb_id"]
          },
        ]
      }
    }
    Functions: {
      get_rating_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          value: number
          count: number
        }[]
      }
      get_rating_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
          mean: number
          median: number
          std_dev: number
          variance: number
        }[]
      }
      get_user_rating_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          value: number
          count: number
        }[]
      }
      get_user_rating_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
          mean: number
          median: number
          std_dev: number
          variance: number
        }[]
      }
      search_movies: {
        Args: {
          title_query: string
        }
        Returns: {
          id: string
          title: string
          slug: string
          year: number
          runtime: number
          language: string
          mpa_rating: string
          description: string
          imdb_code: string
          imdb_rating: number
          imdb_votes: number
          yt_trailer_code: string
          poster: string
          genres: string[]
          average_rating: number
          user_rating: number
          directors: string[]
          writers: string[]
          actors: string[]
          countries: string[]
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
