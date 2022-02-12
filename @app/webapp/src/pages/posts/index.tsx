import Head from 'next/head'
import client from '../../../sanity-client'
import { PostList } from '../../components/custom'
import { DefaultTemplate } from '../../components/templates'
import { Header, Heading } from '../../components/common'
import { Post } from '../../../@types/schema-types'
import { getAllPostsQuery } from '../../queries'

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

BrowsePostsPage.getInitialProps = async () => ({
  posts: await client.fetch(getAllPostsQuery),
})

export default BrowsePostsPage
