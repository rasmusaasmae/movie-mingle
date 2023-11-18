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
