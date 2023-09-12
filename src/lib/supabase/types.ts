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
      movies: {
        Row: {
          background_image: string | null;
          background_image_original: string | null;
          created_at: string;
          description_full: string | null;
          description_intro: string | null;
          id: string;
          imdb_code: string;
          imdb_rating: number | null;
          language: string;
          large_cover_image: string | null;
          medium_cover_image: string | null;
          mpa_rating: string;
          runtime: number;
          slug: string;
          small_cover_image: string | null;
          title: string;
          title_english: string;
          title_long: string;
          year: number;
          yt_trailer_code: string | null;
          yts_download_count: number | null;
          yts_id: number;
          yts_like_count: number | null;
          yts_url: string;
        };
        Insert: {
          background_image?: string | null;
          background_image_original?: string | null;
          created_at?: string;
          description_full?: string | null;
          description_intro?: string | null;
          id?: string;
          imdb_code: string;
          imdb_rating?: number | null;
          language: string;
          large_cover_image?: string | null;
          medium_cover_image?: string | null;
          mpa_rating: string;
          runtime: number;
          slug: string;
          small_cover_image?: string | null;
          title: string;
          title_english: string;
          title_long: string;
          year: number;
          yt_trailer_code?: string | null;
          yts_download_count?: number | null;
          yts_id: number;
          yts_like_count?: number | null;
          yts_url: string;
        };
        Update: {
          background_image?: string | null;
          background_image_original?: string | null;
          created_at?: string;
          description_full?: string | null;
          description_intro?: string | null;
          id?: string;
          imdb_code?: string;
          imdb_rating?: number | null;
          language?: string;
          large_cover_image?: string | null;
          medium_cover_image?: string | null;
          mpa_rating?: string;
          runtime?: number;
          slug?: string;
          small_cover_image?: string | null;
          title?: string;
          title_english?: string;
          title_long?: string;
          year?: number;
          yt_trailer_code?: string | null;
          yts_download_count?: number | null;
          yts_id?: number;
          yts_like_count?: number | null;
          yts_url?: string;
        };
        Relationships: [];
      };
      ratings: {
        Row: {
          created_at: string;
          movie_id: string;
          rating: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          movie_id: string;
          rating: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          movie_id?: string;
          rating?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_movie_id_fkey";
            columns: ["movie_id"];
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ratings_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      torrents: {
        Row: {
          hash: string;
          id: string;
          magnet_url: string;
          movie_id: string;
          quality: string;
          type: string;
          yts_url: string | null;
        };
        Insert: {
          hash: string;
          id?: string;
          magnet_url: string;
          movie_id: string;
          quality: string;
          type: string;
          yts_url?: string | null;
        };
        Update: {
          hash?: string;
          id?: string;
          magnet_url?: string;
          movie_id?: string;
          quality?: string;
          type?: string;
          yts_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "torrents_movie_id_fkey";
            columns: ["movie_id"];
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      search_movies: {
        Args: {
          title_query: string;
        };
        Returns: {
          background_image: string | null;
          background_image_original: string | null;
          created_at: string;
          description_full: string | null;
          description_intro: string | null;
          id: string;
          imdb_code: string;
          imdb_rating: number | null;
          language: string;
          large_cover_image: string | null;
          medium_cover_image: string | null;
          mpa_rating: string;
          runtime: number;
          slug: string;
          small_cover_image: string | null;
          title: string;
          title_english: string;
          title_long: string;
          year: number;
          yt_trailer_code: string | null;
          yts_download_count: number | null;
          yts_id: number;
          yts_like_count: number | null;
          yts_url: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
