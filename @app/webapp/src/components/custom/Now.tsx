import { Paragraph, Anchor, Text, Heading } from '@components/common'
import BlockContent from '@sanity/block-content-to-react'
import { BlockProps } from '@types'
import client from '../../../sanity-client'

type Props = {
  nowPageData: {
    body: any[]
    lastUpdated: string
  }
}

type ILink = {
  _key: string
  _type: 'link'
  href: string
}

const serializers = {
  types: {
    block: (props: BlockProps) => {
      const { style = 'normal' } = props.node

      if (/^h\d/.test(style)) {
        const level: number = parseInt(style.replace(/[^\d]/g, ''))

        return <Heading level={level}>{props.children}</Heading>
      }
      return <Paragraph>{props.children}</Paragraph>
    },
  },
  marks: {
    link: ({ mark, children }: { mark: ILink; children: React.ReactNode }) => {
      const { href } = mark
      return (
        <Anchor href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </Anchor>
      )
    },
  },
}

export const Now = ({ nowPageData }: Props) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  /* @ts-ignore */
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    new Date(nowPageData.lastUpdated),
  )

  return (
    <section>
      <Text small>Last updated: {formattedDate}</Text>
      <BlockContent blocks={nowPageData.body} serializers={serializers} {...client.config()} />
    </section>
  )
}
