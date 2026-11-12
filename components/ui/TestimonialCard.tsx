import { Star } from 'lucide-react'
import { GoogleMark } from '@/components/ui/GoogleMark'

interface TestimonialCardProps {
  quote: string
  author: string
  rating?: number
}

export const TestimonialCard = ({ quote, author, rating = 5 }: TestimonialCardProps) => {
  return (
    <figure className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1" aria-label={`Hodnocení ${rating} z 5`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              strokeWidth={0}
              fill="currentColor"
              className={i < rating ? 'text-accent' : 'text-white/15'}
            />
          ))}
        </div>
        <GoogleMark size={16} className="opacity-90" />
      </div>

      <blockquote className="mt-6 flex-grow text-xl font-medium leading-snug tracking-[-0.02em] text-foreground md:text-2xl lg:text-[1.375rem] xl:text-2xl">
        „{quote}“
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-sm font-semibold text-foreground ring-1 ring-line-strong">
          {author.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold text-foreground">{author}</span>
          <span className="block text-sm text-muted">Recenze na Googlu</span>
        </span>
      </figcaption>
    </figure>
  )
}
