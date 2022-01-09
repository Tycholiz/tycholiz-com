import type { NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import client from '../../../sanity-client'
import { DefaultTemplate } from '../../components/templates'
import { MusicList } from '../../components/music'
import { Header } from '../../components/common'

type Props = {
  songs: {
    title: string
    _id: string
		_sanityAsset: string
    _createdAt: string
    _updatedAt: string
		_rev: string
		_type: string
  }[]
  toggleDarkMode: any
  isDarkMode: boolean
}

const MusicPage: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={props.toggleDarkMode} isDarkMode={props.isDarkMode} />}
        // footer={<Footer />}
      >
        <MusicList songs={props.songs} />
      </DefaultTemplate>
    </>
  )
}

const query = groq`
	*[_type == "song"]
`

MusicPage.getInitialProps = async () => ({
	songs: await client.fetch(query)
})

export default MusicPage