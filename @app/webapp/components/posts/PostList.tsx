import Link from 'next/link'
import styled from 'styled-components'
import { List, Paragraph } from '../common'


type Props = {
  posts: {
    _id: string
    title: string
    subtitle: string
    slug: any
    _updatedAt: string
  }[]
}

const InnerWrapper = styled.div``

export const PostList = ({
  posts = [],
}: Props) => {
  return (
    <List>
      {posts.map(
        ({ _id, title = '', subtitle = '', slug = '', _updatedAt = '' }) =>
          slug && (
            <li key={_id}>
              <InnerWrapper>
                <Link href="/posts/[slug]" as={`/posts/${slug.current}`}>
                  <a>
                    <Paragraph>{title}</Paragraph>
                    <Paragraph>{subtitle}</Paragraph>
                  </a>
                </Link>{' '}
                ({new Date(_updatedAt).toDateString()})
              </InnerWrapper>
            </li>
          )
      )}
    </List>
  )
}