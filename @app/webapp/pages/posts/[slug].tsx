import groq from 'groq'
import client from '../../sanity-client'
import { Post } from '../../components/posts'

type Props = {
  title: string
  name: string
  categories: any[]
  authorImage: string
  body: any[]
}


const PostPage = (props: Props) => {
  return (
    <Post {...props} />
  )
}

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

PostPage.getInitialProps = async function(context: any) {
  // default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return await client.fetch(query, { slug })
}

export default PostPage
