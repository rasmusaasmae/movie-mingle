'use client'

import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/tailwind'
import { useState } from 'react'

type PosterImageProps = React.HTMLProps<HTMLDivElement> & {
  title?: string | null
  posterUrl?: string | null
}

export const PosterImage = (props: PosterImageProps) => {
  const { title, posterUrl, className, ...rest } = props
  const [hasError, setHasError] = useState(false)

  const showFallback = !posterUrl || hasError

  return (
    <div className={cn('relative aspect-2/3 h-64', className)} {...rest}>
      {!showFallback ? (
        <Image
          alt={title ? `Poster of ${title}` : 'Poster'}
          src={posterUrl}
          fill
          sizes="(max-width: 768px) 50vw, 256px"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded bg-muted">
          <ImageIcon className="h-8 w-8 opacity-50" />
        </div>
      )}
    </div>
  )
}
