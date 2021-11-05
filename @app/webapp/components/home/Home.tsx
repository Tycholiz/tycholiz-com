import styled from 'styled-components'
import { Paragraph, Heading } from '../common'
import { PostList } from '../posts/PostList'

type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
}

const HomeHeading = styled(Heading)`
  color: ${({ theme }) => theme.color.primary[0]};
`

const PostWrapper = styled.div``

export const Home: React.FC<Props> = ({ posts }) => {
  return (
      <>
        <HomeHeading>Me in 10 seconds</HomeHeading>
        <Paragraph>
          I am a musician, programmer, and lifelong learner from Canada.
        </Paragraph>

        <Paragraph>
          An obsessive generalist, my interests range from investing, to software
          development, to math and science, to logic and philosophy. A perpetual student
          in all of my worthwhile fields (link here), I obsess over gathering information
          that helps my worldview. See my Dendron second-brain.
        </Paragraph>

        <HomeHeading>What I&apos;m working on now</HomeHeading>
        <Paragraph>See my now page.</Paragraph>

        <HomeHeading>Let&apos;s get in touch</HomeHeading>
        <Paragraph>
          I love to make connections with people. Each of us is in a position
          to offer something valuable to another. Finding it is the key.
        </Paragraph>
        <Paragraph>
          If you think we should be in touch, then I look forward to talking
          with you! The best way to reach me is through email.
        </Paragraph>

        <HomeHeading>Latest articles</HomeHeading>

        <PostWrapper>
          <PostList posts={posts} />
        </PostWrapper>
      </>
  )
}