import client from '../../../sanity-client'
import { NextApiRequest, NextApiResponse } from 'next'

interface CommentRequestBody {
	_id: string
	author: string
	email: string
	body: string
	post: {
		_type: 'reference'
		_ref: string
	}
}

interface Response {
	message: string
	err?: any
}

export default async function createComment(req: NextApiRequest, res: NextApiResponse<Response>) {
	const { _id, author, email, body, post }: CommentRequestBody = JSON.parse(req.body)
	try {
		await client.create({
			_type: 'comment',
			author,
			email,
			body,
			post: {
				_type: 'reference',
				_ref: _id,
			},
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: `Couldn't submit comment`, err })
	}
	return res.status(200).json({ message: 'Comment submitted' })
}