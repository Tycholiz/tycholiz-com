import Link from 'next/link'
import styled from 'styled-components'
import { List, Paragraph, Anchor } from '../common'


type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
}

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`

const InnerWrapper = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.grayscale[6]};
  }
`

const Title = styled.span`
`

const Subtitle = styled.div`
  color: ${({ theme }) => theme.color.grayscale[2]};
  font-style: italic;
  margin-top: 0.3em;
`

const DateLabel = styled.div`
  float: right;
  font-size: 0.8em;
  color: ${({ theme }) => theme.color.grayscale[4]};

  @media (max-width: 700px) {
    display: none;
  }
`

export const PostList = ({
  posts = [],
}: Props) => {
  return (
    <Wrapper>
      {posts.map(
        ({ _id, title = '', subtitle = '', slug = '', _updatedAt = '' }) =>
          slug && (
            <li key={_id}>
              <InnerWrapper>
                <Link href="/posts/[slug]" as={`/posts/${slug.current}`} passHref>
                  <Anchor>
                    <DateLabel>{new Date(_updatedAt).toDateString()}</DateLabel>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                  </Anchor>
                </Link>{' '}
              </InnerWrapper>
            </li>
          )
      )}
    </Wrapper>
  )
}