import type { NextPage } from 'next'
import Head from 'next/head'
import groq from 'groq'
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import client from '../../../sanity-client'
import { DefaultTemplate } from '../../components/templates'
import { MusicList } from '../../components/music'
import { Header } from '../../components/common'

type Props = {
  songs: {
    title: string
    songUrl: string
    asset: any
  }[]
  toggleDarkMode: any
  isDarkMode: boolean
}

const MusicPage: NextPage<Props> = (props: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Music of Kyle Tycholiz" />
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
	*[_type == "song"]{
    _id,
    title,
    asset->{url}
  }
`

MusicPage.getInitialProps = async () => ({
    songs: await client.fetch(query)
})

export default MusicPage