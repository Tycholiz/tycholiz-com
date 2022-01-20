import styled from 'styled-components'
import Link from 'next/link'
import { Paragraph, Heading } from '../common'
import { PostList } from './PostList'
import { Anchor } from '../common'
import constants from '../../constants'
import { SyntheticEvent } from 'react'

type Props = {
  posts: {
    _id: string
    title: string
    subtitle?: string
    slug: any
    _updatedAt: string
  }[]
}

export const CommentForm: React.FC<Props> = ({ posts }) => {
	const handleSubmitComment = (e: SyntheticEvent) => {
		e.preventDefault()
	}
  return (
		<form method="post">
			<label>your name
				<input type="text" />
			</label>
			<label>your email (private for my eyes only)
				<input type="text" />
			</label>
			<label>comment
				<input type="text" />
			</label>
			<button onClick={handleSubmitComment}>Save</button>
		</form>
  )
}
