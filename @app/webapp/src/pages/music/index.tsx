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
    writer: string
    producer: string
    yearWritten: number
    yearRecorded: number
    asset: {
      url: string
    }
  }[]
  toggleDarkMode: () => null
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
	*[_type == "song"] | order(yearRecorded desc, yearWritten desc) {
    _id,
    title,
    writer,
    producer,
    yearWritten,
    yearRecorded,
    asset->{url}
  }
`

export async function getStaticProps() {
  return {
    props: {
      songs: await client.fetch(query),
    },
  }
}

export default MusicPage
