import Head from 'next/head'
import groq from 'groq'
import client from '../../../sanity-client'
import { PostList } from '../../components/custom'
import { DefaultTemplate } from '../../components/templates'
import { Header, Heading } from '../../components/common'
import { Post } from '../../../@types/schema-types'

export type Props = {
  posts: Post[]
  toggleDarkMode: any
  isDarkMode: boolean
}

const BrowsePostsPage = (props: Props) => {
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
        <Heading colored={true}>Thoughts on...</Heading>
        <PostList {...props} />
      </DefaultTemplate>
    </>
  )
}

const query = groq`
  *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
`

BrowsePostsPage.getInitialProps = async () => ({
  posts: await client.fetch(query),
})

export default BrowsePostsPage
