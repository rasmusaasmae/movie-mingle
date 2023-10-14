export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      movies_metadata: {
        Row: {
          actors: string[] | null
          countries: string[] | null
          created_at: string
          description: string | null
          directors: string[] | null
          genres: string[]
          id: string
          imdb_code: string
          imdb_rating: number | null
          language: string
          mpa_rating: string
          poster: string | null
          runtime: number
          search: unknown | null
          slug: string
          title: string
          writers: string[] | null
          year: number
          yt_trailer_code: string | null
          yts_id: number | null
          yts_url: string | null
        }
        Insert: {
          actors?: string[] | null
          countries?: string[] | null
          created_at?: string
          description?: string | null
          directors?: string[] | null
          genres?: string[]
          id?: string
          imdb_code: string
          imdb_rating?: number | null
          language: string
          mpa_rating: string
          poster?: string | null
          runtime: number
          search?: unknown | null
          slug: string
          title: string
          writers?: string[] | null
          year: number
          yt_trailer_code?: string | null
          yts_id?: number | null
          yts_url?: string | null
        }
        Update: {
          actors?: string[] | null
          countries?: string[] | null
          created_at?: string
          description?: string | null
          directors?: string[] | null
          genres?: string[]
          id?: string
          imdb_code?: string
          imdb_rating?: number | null
          language?: string
          mpa_rating?: string
          poster?: string | null
          runtime?: number
          search?: unknown | null
          slug?: string
          title?: string
          writers?: string[] | null
          year?: number
          yt_trailer_code?: string | null
          yts_id?: number | null
          yts_url?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string
          movie_id: string
          rating: number
          user_id: string
        }
        Insert: {
          created_at?: string
          movie_id: string
          rating: number
          user_id?: string
        }
        Update: {
          created_at?: string
          movie_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      torrents: {
        Row: {
          hash: string
          magnet: string
          movie_id: string
          quality: string
          size_bytes: number
          source: string
          type: string
        }
        Insert: {
          hash: string
          magnet: string
          movie_id: string
          quality: string
          size_bytes: number
          source: string
          type: string
        }
        Update: {
          hash?: string
          magnet?: string
          movie_id?: string
          quality?: string
          size_bytes?: number
          source?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "torrents_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "torrents_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      average_ratings: {
        Row: {
          average_rating: number | null
          movie_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies"
            referencedColumns: ["id"]
          }
        ]
      }
      movies: {
        Row: {
          actors: string[] | null
          average_rating: number | null
          countries: string[] | null
          created_at: string | null
          description: string | null
          directors: string[] | null
          genres: string[] | null
          id: string | null
          imdb_code: string | null
          imdb_rating: number | null
          language: string | null
          mpa_rating: string | null
          poster: string | null
          runtime: number | null
          search: unknown | null
          slug: string | null
          title: string | null
          user_rating: number | null
          writers: string[] | null
          year: number | null
          yt_trailer_code: string | null
          yts_id: number | null
          yts_url: string | null
        }
        Relationships: []
      }
      user_ratings: {
        Row: {
          movie_id: string | null
          user_rating: number | null
        }
        Insert: {
          movie_id?: string | null
          user_rating?: number | null
        }
        Update: {
          movie_id?: string | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_movie_id_fkey"
            columns: ["movie_id"]
            referencedRelation: "movies"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
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
      type: "movie" | "series"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
