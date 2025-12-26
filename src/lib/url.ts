import { RedirectType, redirect } from 'next/navigation'
import slugify from 'slugify'

/* HELPERS */

const toSlug = (value: string) =>
  slugify(value, { lower: true, strict: true, locale: 'en', trim: true })

export const getIdFromSlug = (slug: string): number | null => {
  const id = Number(slug.split('-')[0])
  return Number.isNaN(id) ? null : id
}

/* MOVIES */

export const getMovieSlug = (tmdbId: number, title: string | null) =>
  title ? `${tmdbId}-${toSlug(title)}` : `${tmdbId}`

export const getMovieUrl = (tmdbId: number, title: string | null) =>
  `/movie/${getMovieSlug(tmdbId, title)}`

export const selfHealMovieUrl = (slug: string, tmdbId: number, title: string | null) => {
  const correctSlug = getMovieSlug(tmdbId, title)
  if (slug !== correctSlug) {
    redirect(getMovieUrl(tmdbId, title), RedirectType.replace)
  }
}

/* COLLECTIONS */

export const getCollectionSlug = (tmdbId: number, name: string) => `${tmdbId}-${toSlug(name)}`

export const getCollectionUrl = (tmdbId: number, name: string) =>
  `/collection/${getCollectionSlug(tmdbId, name)}`

export const selfHealCollectionUrl = (slug: string, tmdbId: number, name: string) => {
  const correctSlug = getCollectionSlug(tmdbId, name)
  if (slug !== correctSlug) {
    redirect(getCollectionUrl(tmdbId, name), RedirectType.replace)
  }
}
