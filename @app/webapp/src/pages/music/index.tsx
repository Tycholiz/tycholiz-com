import type { NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import client from '../../../sanity-client'
import { DefaultTemplate } from '../../components/templates'
import { MusicList } from '../../components/music'
import { Header } from '../../components/common'

type Props = {
  songs: {
    _id: string
    title: string
    asset: {
      url: string
    }
  }[]
  toggleDarkMode: any
  isDarkMode: boolean
}

const MusicPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Music of Kyle Tycholiz</title>
        <meta name="description" content="Music of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={props.toggleDarkMode} isDarkMode={props.isDarkMode} />}
      >
        <MusicList songs={props.songs} />
      </DefaultTemplate>
    </>
  )
}

const query = groq`
	*[_type == "song"]{
    _id,
    title,
    asset->{url}
  }
`

export async function getStaticProps() {
  return {
    props: {
      songs: await client.fetch(query)
    },
  }
}

export default MusicPage