import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPosterImageUrl } from '@/utils/url'

type PosterImageProps = React.HTMLProps<HTMLDivElement> & {
  title: string
  poster_path: string | null
}

function PosterImage(props: PosterImageProps) {
  const { title, poster_path, className, ...rest } = props

  return (
    <div className={cn('relative aspect-[2/3] h-64', className)} {...rest}>
      {poster_path !== null ? (
        <Image
          alt={`Poster of ${title}`}
          src={getPosterImageUrl(poster_path)}
          fill
          className="object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <ImageIcon className="h-8 w-8 opacity-50" />
        </div>
      )}
    </div>
  )
}

export { PosterImage }
