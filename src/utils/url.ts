import slugify from "slugify";

import {
  TMDB_IMAGE_BASE_URL,
  TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL,
  TMDB_IMAGE_SIZE_POSTER_MEDIUM,
} from "@/lib/tmdb/constants";

function toSlug(value: string) {
  return slugify(value, {
    replacement: "-",
    // remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });
}

export function getBaseUrl() {
  const url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";
  return url.includes("http") ? url : `https://${url}`;
}

export function getMovieUrl(id: number, title: string) {
  return `/movie/${id}-${toSlug(title)}`;
}

export function getCollectionUrl(id: number, name: string) {
  return `/collection/${id}-${toSlug(name)}`;
}

export function getPosterImageUrl(poster_path: string | null) {
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_POSTER_MEDIUM}/${poster_path}`;
}

export function getBackdropImageUrl(backdrop_path: string) {
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZE_BACKDROP_ORIGINAL}/${backdrop_path}`;
}
