import groq from 'groq'
import client from '../../sanity-client'
import { PostList } from '../../components/posts'

export type Props = {
  posts: {
    _id: string
    title: string
    slug: any
    _updatedAt: string
  }[]
}

const BrowsePostsPage = (props: Props) => {
  return (
    <PostList {...props} />
  )
}

const query = groq`
  *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
`

BrowsePostsPage.getInitialProps = async () => ({
  posts: await client.fetch(query)
})

export default BrowsePostsPage