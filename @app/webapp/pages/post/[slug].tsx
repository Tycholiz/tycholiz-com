import groq from 'groq'
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

const Post = ({
  title = 'Missing title',
  name = 'Missing name',
  categories,
  authorImage,
}: Props) => {
  console.log(authorImage);
  
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
    </article>
  )
}

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image
}`

Post.getInitialProps = async function(context: any) {
  // default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return await client.fetch(query, { slug })
}

export default Post
