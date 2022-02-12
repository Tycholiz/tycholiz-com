import type { NextPage } from 'next'
import Head from 'next/head'
import client from '../../sanity-client'
import { DefaultTemplate } from '../components/templates'
import { Home } from '../components/custom'
import { Header } from '../components/common'
import { Post } from '../../@types/schema-types'
import { getLatestPostsQuery } from '../queries'

type Props = {
  posts: Post[]
  toggleDarkMode?: any
  isDarkMode?: boolean
}

const HomePage: NextPage<Props> = ({ posts, toggleDarkMode, isDarkMode = false }: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
        // footer={<Footer />}
      >
        <Home posts={posts} />
      </DefaultTemplate>
    </>
  )
}


HomePage.getInitialProps = async () => ({
  posts: await client.fetch(getLatestPostsQuery),
})

export default HomePage
