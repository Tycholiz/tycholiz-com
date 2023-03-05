import Head from 'next/head'
import client from '../../../sanity-client'
import { Now } from '@components/custom'
import { DefaultTemplate } from '@components/templates'
import { Header } from '@components/common'
import { getNowQuery } from '@queries'

type Props = {
  nowPageData: {
    body: any[]
    lastUpdated: string
  }
  toggleDarkMode: any
  isDarkMode: boolean
}

const NowPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz &bull; Now</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={props.toggleDarkMode} isDarkMode={props.isDarkMode} />}
        // footer={<Footer />}
      >
        <Now nowPageData={props.nowPageData} />
      </DefaultTemplate>
    </>
  )
}

NowPage.getInitialProps = async function () {
  return {
    nowPageData: await client.fetch(getNowQuery),
  }
}

export default NowPage
