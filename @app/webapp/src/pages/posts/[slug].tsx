import Head from 'next/head'
import groq from 'groq'
import client from '../../../sanity-client'
import { Post } from '../../components/posts'
import { DefaultTemplate } from '../../components/templates'
import { Header } from '../../components/common'

type Props = {
  title: string
  name: string
  categories: any[]
  authorImage: string
  body: any[]
  toggleDarkMode: any
  isDarkMode: boolean
}


const PostPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={props.toggleDarkMode} isDarkMode={props.isDarkMode} />}
      >
        <Post {...props} />
      </DefaultTemplate>
    </>
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
