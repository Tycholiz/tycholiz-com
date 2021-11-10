import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../../sanity-client'
import { Paragraph, Heading } from '../common'

type Props = {
  title: string
  subtitle?: string
  name: string
  categories: any[]
  body: any[]
}

const Subtitle = styled(Heading)`
  margin-bottom: 3em;
`

export const Post = ({
  title = 'Missing title',
  subtitle,
  body = [],
}: Props) => {
  
  return (
    <article>
      <Heading>{title}</Heading>
      <Subtitle Heading level={3}>{subtitle}</Subtitle>
      <BlockContent
        blocks={body}
        imageOptions={{ w: 320, h: 240, fit: 'max' }}
        {...client.config()}
      />
    </article>
  )
}