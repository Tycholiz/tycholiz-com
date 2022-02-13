import { NextPageContext } from 'next'
import Head from 'next/head'
import client from '../../../sanity-client'
import { Post } from '@components/custom'
import { DefaultTemplate } from '@components/templates'
import { Header } from '@components/common'
import { getPostQuery } from '@queries'
import { Post as IPost } from '../../../@types/schema-types'

type Props = {
  post: IPost
  toggleDarkMode: any
  isDarkMode: boolean
}

const PostPage = ({ toggleDarkMode, isDarkMode, post }: Props) => {
  return (
    <>
      <Head>
        <title>Kyle Tycholiz &bull; {post.title}</title>
        <meta name="description" content="Personal website of Kyle Tycholiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultTemplate
        header={<Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
      >
        <Post post={post} />
      </DefaultTemplate>
    </>
  )
}

PostPage.getInitialProps = async function (context: NextPageContext) {
  /* default the slug so that it doesn't return "undefined" */
  const { slug = '' } = context.query
  return {
    post: await client.fetch(getPostQuery, { slug })
  }
}

export default PostPage
