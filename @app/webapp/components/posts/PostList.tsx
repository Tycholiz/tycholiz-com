import Link from 'next/link'
import groq from 'groq'
import client from '../../sanity-client'


type Props = {
  posts: {
    _id: string
    title: string
    slug: any
    _updatedAt: string
  }[]
}

export const PostList = ({
  posts = [],
}: Props) => {
  return (
    <div>
      <h1>Thoughts...</h1>
      {posts.map(
        ({ _id, title = '', slug = '', _updatedAt = '' }) =>
          slug && (
            <li key={_id}>
              <Link href="/posts/[slug]" as={`/posts/${slug.current}`}>
                <a>{title}</a>
              </Link>{' '}
              ({new Date(_updatedAt).toDateString()})
            </li>
          )
      )}
    </div>
  )
}