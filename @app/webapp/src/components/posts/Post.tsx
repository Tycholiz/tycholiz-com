import Image from 'next/image'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../sanity-client'
import { Paragraph, Heading } from '../common'
import { BlockProps, ImageProps } from '../../../@types/custom-types'

type Props = {
  title: string
  subtitle?: string
  name: string
  categories: any[]
  body: any[]
}

function urlFor (source: SanityImageSource) {
  return imageUrlBuilder(client).image(source)
}

const serializers = {
  types: {
    block: (props: BlockProps) => {
      const { style = "normal" } = props.node;

      if (/^h\d/.test(style)) {
        const level: number = parseInt(style.replace(/[^\d]/g, ""))
        
        return <Heading level={level}>{props.children}</Heading>
      }
      return <Paragraph>{props.children}</Paragraph>
    },
    image: (props: ImageProps) => {
      return (
        <ImageWrapper>
          <Image
            src={urlFor(props.node.asset._ref)
              .width(450)
              .url()}
            alt={props.node.alt}
          />
        </ImageWrapper>
      )
    }
  }
}

const Subtitle = styled(Heading)`
  margin-bottom: 3em;
`

const ImageWrapper = styled.figure`
  margin-top: 3em;
  & img {
    width: 100%;
  }
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
        serializers={serializers}
        {...client.config()}
      />
    </article>
  )
}