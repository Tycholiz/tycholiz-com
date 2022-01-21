import Image from 'next/image'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../sanity-client'
import { Paragraph, Heading, Label } from '../common'
import { CommentForm, CommentList } from '../custom'
import { BlockProps, ImageProps } from '../../../@types/custom-types'
import { formatDate } from '../../utils'

type Props = {
  post: {
    _id: string
    title: string
    subtitle: string
    body: any[]
    publishedAt: string
    comments: {
      _id: string
      publishedAt: string
      author: string
      body: string
      isApproved: boolean
    }[]
  }
}

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source)
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
    image: (props: ImageProps) => {
      return (
        <ImageWrapper>
          <Image
            src={urlFor(props.node.asset._ref).width(650).url()}
            alt={props.node.alt}
            width={650}
            height={350}
          />
        </ImageWrapper>
      )
    },
  },
}

const Subtitle = styled(Heading)`
  margin-bottom: 3em;
`

const ImageWrapper = styled.figure`
  margin: 3em 0 0 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    margin: 3em 2em 0;
  }

  & img {
    width: 100%;
  }
`

export const Post = ({ post }: Props) => {
  return (
    <article>
      <Heading>{post.title}</Heading>
      <Subtitle Heading level={3}>
        {post.subtitle}
      </Subtitle>
      <Label>{formatDate(post.publishedAt)}</Label>
      <BlockContent blocks={post.body} serializers={serializers} {...client.config()} />
      <CommentForm postId={post._id} />
      <CommentList comments={post.comments} />
    </article>
  )
}
