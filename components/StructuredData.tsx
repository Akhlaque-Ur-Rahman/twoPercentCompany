import React from 'react'

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
}

export function OrganizationSchema({
  name = '2% Company',
  url = 'https://www.2percentcompany.in/',
  logo = 'https://www.2percentcompany.in/images/logo.png',
  description = 'Best Website for Property and Plot Purchase in Patna'
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface PropertySchemaProps {
  name: string
  description: string
  image: string
  address: string
  price: string
  url: string
}

export function PropertySchema({
  name,
  description,
  image,
  address,
  price,
  url,
}: PropertySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url,
    },
    brand: {
      '@type': 'Brand',
      name: '2% Company',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebPageSchemaProps {
  name: string
  description: string
  url: string
}

export function WebPageSchema({ name, description, url }: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: '2% Company',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
