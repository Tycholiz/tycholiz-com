import type { NextPage } from 'next'
import Head from 'next/head'
import client from '../../../sanity-client'
import { DefaultTemplate } from '@components/templates'
import { MusicList } from '@components/custom'
import { Header } from '@components/common'
import { getSongsQuery } from '@queries'
import { Song } from '@types'

type Props = {
  songs: Song[]
  toggleDarkMode: () => null
  isDarkMode: boolean
}

const MusicPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz &bull; Music</title>
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

export async function getStaticProps() {
  return {
    props: {
      songs: await client.fetch(getSongsQuery),
    },
  }
}

export default MusicPage
