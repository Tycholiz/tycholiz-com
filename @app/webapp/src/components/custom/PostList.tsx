import Link from 'next/link'
import styled from 'styled-components'
import { Anchor } from '../common'
import { Post } from '../../../@types/schema-types'
import { formatDate } from '../../utils'

type Props = {
  posts: Post[]
}

const Wrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`

const InnerWrapper = styled.div`
  padding: 1em 0.5em;
  margin: 1em -0.5em;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.grayscale[6]};
  }
`

const StyledAnchor = styled(Anchor)`
  text-decoration: none;
`

const Title = styled.span``

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

export const PostList = ({ posts = [] }: Props) => {
  return (
    <Wrapper>
      {posts.map(
        ({ _id, title = '', subtitle = '', slug = '', publishedAt = '' }) =>
          slug && (
            <li key={_id}>
              <Link href="/posts/[slug]" as={`/posts/${slug.current}`} passHref>
                <StyledAnchor>
                  <InnerWrapper>
                    <DateLabel>{formatDate.long(publishedAt)}</DateLabel>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                  </InnerWrapper>
                </StyledAnchor>
              </Link>{' '}
            </li>
          ),
      )}
    </Wrapper>
  )
}
