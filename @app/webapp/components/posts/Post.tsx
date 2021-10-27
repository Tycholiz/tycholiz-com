import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import client from '../../sanity-client'

type Props = {
  title: string
  name: string
  categories: any[]
  authorImage: string
  body: any[]
}

function urlFor (source: SanityImageSource) {
  return imageUrlBuilder(client).image(source)
}

export const Post = ({
  title = 'Missing title',
  name = 'Missing name',
  categories,
  authorImage,
  body = [],
}: Props) => {
  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}
      {authorImage && (
        <div>
          <img
            src={urlFor(authorImage)
              .width(50)
              .url()}
          />
        </div>
      )}
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        {...client.config()}
      />
    </article>

  )
}