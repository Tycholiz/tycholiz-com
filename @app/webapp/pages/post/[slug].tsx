import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import groq from 'groq'

import client from '../../sanity-client'

type Props = {
  title: string
  name: string
  categories: any[]
  body: any[]
}

const Post = ({
  title = 'Missing title',
  name = 'Missing name',
  categories,
}: Props) => {
  console.log(title);
  console.log(name);
  
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
    </article>
  )
}

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
  title,
  "name": author->name,
  "categories": categories[]->title
}`

Post.getInitialProps = async function(context: any) {
  // default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return await client.fetch(query, { slug })
}

export default Post
