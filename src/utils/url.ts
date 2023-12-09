import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from "@/lib/tmdb/constants";
import { slugifyTitle } from "./slugify";

export function getBaseUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";
  url = url.includes("http") ? url : `https://${url}`;
  return url;
}

export function getMovieUrl(id: number, title: string) {
  return `/movie/${id}-${slugifyTitle(title)}`;
}

export function getCollectionUrl(id: number, name: string) {
  return `/collection/${id}-${slugifyTitle(name)}`;
}

export function getPosterImageUrl(poster_path: string | null) {
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}/${poster_path}`;
}

export function getBackdropImageUrl(backdrop_path: string) {
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}/${backdrop_path}`;
}
