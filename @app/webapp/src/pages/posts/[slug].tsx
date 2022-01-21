import Head from 'next/head'
import groq from 'groq'
import client from '../../../sanity-client'
import { Post } from '../../components/custom'
import { DefaultTemplate } from '../../components/templates'
import { Header } from '../../components/common'
import { getPostQuery } from '../../queries'

type Props = {
  post: {
    _id: string
    title: string
    subtitle: string
    body: any[]
    publishedAt: string
    comments: {
      _id: string
      publishedAt: string
      author: string
      body: string
      isApproved: boolean
    }[]
  }
  toggleDarkMode: any
  isDarkMode: boolean
}

const PostPage = ({ toggleDarkMode, isDarkMode, ...props }: Props) => {
  console.log(props);

  return (
    <>
      <Head>
        <title>Kyle Tycholiz</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
      >
        <Post {...props} />
      </DefaultTemplate>
    </>
  )
}

// TODO: get date added
PostPage.getInitialProps = async function (context: any) {
  // default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return {
    post: await client.fetch(getPostQuery, { slug })
  }
}

export default PostPage
