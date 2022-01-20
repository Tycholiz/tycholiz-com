import styled from 'styled-components'
import Link from 'next/link'
import { Paragraph, Heading } from '../common'
import { PostList } from './PostList'
import { Anchor } from '../common'
import constants from '../../constants'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import { NextApiResponse } from 'next'

type Props = {
	postId: string
}

/* Upon 200 OK from api call to Sanity, we should replace the form with a Success message in UI */
export const CommentForm: React.FC<Props> = ({ postId }) => {
	const [author, setAuthor] = useState('')
	const [email, setEmail] = useState('')
	const [commentBody, setCommentBody] = useState('')

	const handleSubmitComment = async (e: SyntheticEvent) => {
		e.preventDefault()
		try {
				/* @ts-ignore */
			await fetch('/api/createComment', {
				method: 'POST',
				body: JSON.stringify({
					_id: postId,
					author,
					email,
					body: commentBody,
				}),
				/* @ts-ignore */
				type: 'application/json'
			})
		} catch(err) {
			console.error(err)
		}
	}
  return (
		<form method="post">
			<label>your name
				<input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
			</label>
			<label>your email (private for my eyes only)
				<input type="text" value={email} onChange={e => setEmail(e.target.value)} />
			</label>
			<label>comment
				<input type="text" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
			</label>
			<button onClick={handleSubmitComment}>Save</button>
		</form>
  )
}
