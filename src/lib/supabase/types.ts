export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      movies_metadata: {
        Row: {
          actors: string[] | null;
          countries: string[] | null;
          created_at: string;
          description: string | null;
          directors: string[] | null;
          genres: string[] | null;
          id: string;
          imdb_code: string;
          imdb_rating: number | null;
          imdb_votes: number | null;
          language: string | null;
          mpa_rating: string | null;
          poster: string | null;
          runtime: number;
          search: unknown | null;
          slug: string;
          title: string;
          writers: string[] | null;
          year: number;
          yt_trailer_code: string | null;
          yts_id: number | null;
          yts_url: string | null;
        };
        Insert: {
          actors?: string[] | null;
          countries?: string[] | null;
          created_at?: string;
          description?: string | null;
          directors?: string[] | null;
          genres?: string[] | null;
          id?: string;
          imdb_code: string;
          imdb_rating?: number | null;
          imdb_votes?: number | null;
          language?: string | null;
          mpa_rating?: string | null;
          poster?: string | null;
          runtime: number;
          search?: unknown | null;
          slug: string;
          title: string;
          writers?: string[] | null;
          year: number;
          yt_trailer_code?: string | null;
          yts_id?: number | null;
          yts_url?: string | null;
        };
        Update: {
          actors?: string[] | null;
          countries?: string[] | null;
          created_at?: string;
          description?: string | null;
          directors?: string[] | null;
          genres?: string[] | null;
          id?: string;
          imdb_code?: string;
          imdb_rating?: number | null;
          imdb_votes?: number | null;
          language?: string | null;
          mpa_rating?: string | null;
          poster?: string | null;
          runtime?: number;
          search?: unknown | null;
          slug?: string;
          title?: string;
          writers?: string[] | null;
          year?: number;
          yt_trailer_code?: string | null;
          yts_id?: number | null;
          yts_url?: string | null;
        };
        Relationships: [];
      };
      ratings: {
        Row: {
          created_at: string;
          imdb_id: string;
          updated_at: string;
          user_id: string;
          value: number | null;
        };
        Insert: {
          created_at?: string;
          imdb_id: string;
          updated_at?: string;
          user_id?: string;
          value?: number | null;
        };
        Update: {
          created_at?: string;
          imdb_id?: string;
          updated_at?: string;
          user_id?: string;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      torrents: {
        Row: {
          hash: string;
          imdb_id: string;
          magnet: string;
          quality: string;
          size_bytes: number;
          source: string;
          type: string;
        };
        Insert: {
          hash: string;
          imdb_id: string;
          magnet: string;
          quality: string;
          size_bytes: number;
          source: string;
          type: string;
        };
        Update: {
          hash?: string;
          imdb_id?: string;
          magnet?: string;
          quality?: string;
          size_bytes?: number;
          source?: string;
          type?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_average_rating: {
        Args: {
          imdb_id: string;
        };
        Returns: {
          average_rating: number;
          rating_count: number;
        }[];
      };
      get_popular_movies: {
        Args: Record<PropertyKey, never>;
        Returns: {
          imdb_id: string;
        }[];
      };
      search_movies: {
        Args: {
          title_query: string;
        };
        Returns: {
          id: string;
          title: string;
          slug: string;
          year: number;
          runtime: number;
          language: string;
          mpa_rating: string;
          description: string;
          imdb_code: string;
          imdb_rating: number;
          imdb_votes: number;
          yt_trailer_code: string;
          poster: string;
          genres: string[];
          average_rating: number;
          user_rating: number;
          directors: string[];
          writers: string[];
          actors: string[];
          countries: string[];
        }[];
      };
    };
    Enums: {
      type: "movie" | "series";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
