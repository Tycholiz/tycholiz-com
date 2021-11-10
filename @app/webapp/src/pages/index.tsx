import type { NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import client from '../../sanity-client'
import { Home } from '../components/home'
import { DefaultTemplate } from '../components/templates'
import { Header } from '../components/common'

type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
}

const HomePage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header />}
        // footer={<Footer />}
      >
        <Home {...props} />
      </DefaultTemplate>
    </>
  )
}

const query = groq`
  *[_type == "post" && publishedAt < now()][0..5] | order(publishedAt desc)
`

HomePage.getInitialProps = async () => ({
  posts: await client.fetch(query)
})

export default HomePage
