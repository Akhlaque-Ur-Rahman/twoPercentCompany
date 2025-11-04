import { Metadata } from 'next'
import { PropertyData } from '@/data/PropertyData'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const plot = PropertyData.find((p) => p.slug === slug && p.type === 'plot')

  if (!plot) {
    return {
      title: 'Plot Not Found',
    }
  }

  const title = plot.title
  const description = plot.longDescription || plot.description
  const imageUrl = plot.image

  return {
    title,
    description,
    keywords: [
      plot.title,
      'plot for sale',
      'land for sale',
      plot.address,
      ...plot.tags.map(tag => tag.label)
    ],
    openGraph: {
      title: `${title} | 2% Company`,
      description,
      url: `https://www.2percentcompany.in/plots/${slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/plots/${slug}`,
    },
  }
}

export default function PlotDetailLayout({ children }: Props) {
  return <>{children}</>
}
