import styled from 'styled-components'
import Link from 'next/link'
import { Paragraph, Heading } from '../common'
import { PostList } from './PostList'
import { Anchor } from '../common'
import constants from '../../constants'
import { Post } from '../../../@types/schema-types'

type Props = {
  posts: Post[]
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostWrapper = styled.div``

export const Home: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Heading colored={true}>Me in 10 seconds</Heading>
      <Paragraph>I am a musician, programmer, and lifelong learner from Canada.</Paragraph>

      <Paragraph>
        An obsessive generalist, my interests range from investing, to software development, to math
        and science, to logic and philosophy. A perpetual student in all of my worthwhile fields, I
        obsess over gathering information that helps my worldview. See my Dendron{' '}
        <Anchor href={constants.dendronTechUrl}>second-brain</Anchor>.
      </Paragraph>

      <Heading colored={true}>What I&apos;m working on now</Heading>
      <Paragraph>
        See my{' '}
        <Link href="/now" as={`/now`} passHref={true}>
          <Anchor>now page</Anchor>
        </Link>
        .
      </Paragraph>

      <Heading colored={true}>Let&apos;s get in touch</Heading>
      <Paragraph>
        I love to make connections with people. Each of us is in a position to offer something
        valuable to another. Finding it is the key.
      </Paragraph>
      <Paragraph>
        If you think we should be in touch, then I look forward to talking with you! The best way to
        reach me is through email.
      </Paragraph>

      <Row>
        <Heading colored={true}>Latest articles</Heading>
        <Link href="/posts" as={`/posts`} passHref={true}>
          <Anchor>see all</Anchor>
        </Link>
      </Row>

      <PostWrapper>
        <PostList posts={posts} />
      </PostWrapper>
    </>
  )
}
