import Link from 'next/link'
import { List } from '../common/List'


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
    <List>
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
    </List>
  )
}