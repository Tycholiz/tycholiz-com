import type { NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import client from '../../sanity-client'
import { DefaultTemplate } from '../components/templates'
import { Home } from '../components/custom'
import { Header } from '../components/common'

type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
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

const query = groq`
  *[_type == "post" && publishedAt < now()][0..5] | order(publishedAt desc)
`

HomePage.getInitialProps = async () => ({
  posts: await client.fetch(query),
})

export default HomePage
