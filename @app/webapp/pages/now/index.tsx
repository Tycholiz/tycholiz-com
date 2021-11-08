import type { NextPage } from 'next'
import Head from 'next/head'
import { Now } from '../../components/now'
import { DefaultTemplate } from '../../components/templates'
import { Header } from '../../components/common'

type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
}

const NowPage: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz &bull; What I&apos;m doing now</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header />}
        // footer={<Footer />}
      >
        <Now />
      </DefaultTemplate>
    </>
  )
}

export default NowPage
