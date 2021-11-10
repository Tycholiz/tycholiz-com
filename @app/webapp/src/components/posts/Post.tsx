import BlockContent from '@sanity/block-content-to-react'
import client from '../../../sanity-client'
import { Paragraph, Heading } from '../common'

type Props = {
  title: string
  name: string
  categories: any[]
  authorImage: string
  body: any[]
}

export const Post = ({
  title = 'Missing title',
  name = 'Missing name',
  categories,
  body = [],
}: Props) => {
  return (
    <article>
      <Heading>{title}</Heading>
      <Paragraph>By {name}</Paragraph>
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        {...client.config()}
      />
    </article>
  )
}