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
          background_image: string | null
          background_image_original: string | null
          created_at: string
          description_full: string | null
          description_intro: string | null
          genres: string[]
          id: string
          imdb_code: string
          imdb_rating: number | null
          language: string
          large_cover_image: string | null
          medium_cover_image: string | null
          mpa_rating: string
          runtime: number
          search: unknown | null
          slug: string
          small_cover_image: string | null
          title: string
          title_english: string
          title_long: string
          year: number
          yt_trailer_code: string | null
          yts_download_count: number | null
          yts_id: number
          yts_like_count: number | null
          yts_url: string
        }
        Insert: {
          background_image?: string | null
          background_image_original?: string | null
          created_at?: string
          description_full?: string | null
          description_intro?: string | null
          genres?: string[]
          id?: string
          imdb_code: string
          imdb_rating?: number | null
          language: string
          large_cover_image?: string | null
          medium_cover_image?: string | null
          mpa_rating: string
          runtime: number
          search?: unknown | null
          slug: string
          small_cover_image?: string | null
          title: string
          title_english: string
          title_long: string
          year: number
          yt_trailer_code?: string | null
          yts_download_count?: number | null
          yts_id: number
          yts_like_count?: number | null
          yts_url: string
        }
        Update: {
          background_image?: string | null
          background_image_original?: string | null
          created_at?: string
          description_full?: string | null
          description_intro?: string | null
          genres?: string[]
          id?: string
          imdb_code?: string
          imdb_rating?: number | null
          language?: string
          large_cover_image?: string | null
          medium_cover_image?: string | null
          mpa_rating?: string
          runtime?: number
          search?: unknown | null
          slug?: string
          small_cover_image?: string | null
          title?: string
          title_english?: string
          title_long?: string
          year?: number
          yt_trailer_code?: string | null
          yts_download_count?: number | null
          yts_id?: number
          yts_like_count?: number | null
          yts_url?: string
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
          id: string
          magnet_url: string
          movie_id: string
          quality: string
          type: string
          yts_url: string | null
        }
        Insert: {
          hash: string
          id?: string
          magnet_url: string
          movie_id: string
          quality: string
          type: string
          yts_url?: string | null
        }
        Update: {
          hash?: string
          id?: string
          magnet_url?: string
          movie_id?: string
          quality?: string
          type?: string
          yts_url?: string | null
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
          average_rating: number | null
          background_image: string | null
          background_image_original: string | null
          created_at: string | null
          description_full: string | null
          description_intro: string | null
          genres: string[] | null
          id: string | null
          imdb_code: string | null
          imdb_rating: number | null
          language: string | null
          large_cover_image: string | null
          medium_cover_image: string | null
          mpa_rating: string | null
          runtime: number | null
          search: unknown | null
          slug: string | null
          small_cover_image: string | null
          title: string | null
          title_english: string | null
          title_long: string | null
          user_rating: number | null
          year: number | null
          yt_trailer_code: string | null
          yts_download_count: number | null
          yts_id: number | null
          yts_like_count: number | null
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
          title_english: string
          year: number
          runtime: number
          language: string
          mpa_rating: string
          description: string
          imdb_code: string
          imdb_rating: number
          background_image: string
          small_cover_image: string
          medium_cover_image: string
          large_cover_image: string
          genres: string[]
          average_rating: number
          user_rating: number
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
