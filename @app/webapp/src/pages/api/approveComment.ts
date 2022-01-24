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

export default async function approveComment(req: NextApiRequest, res: NextApiResponse<Response>) {
	const { _id, author, email, body }: CommentRequestBody = JSON.parse(req.body)
	try {
		await client.create({
			_type: 'comment',
			author: 'johnny mcgee',
			email: 'faker@faker.com',
			body: 'buddy, this ain\'t a real email',
		})
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: `Couldn't submit comment`, err })
	}
    
	return res.status(200).json({ message: 'Comment approved' })
}
