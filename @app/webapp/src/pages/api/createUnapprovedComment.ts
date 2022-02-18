import client from '../../../sanity-client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry, captureException } from "@sentry/nextjs"

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

/**
 * Creates an unapproved comment in the Sanity datastore. Comments will not be visible to the public until they are approved. 
 * @param req 
 * @param res 
 */
async function createUnapprovedComment(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { _id, author, email, body }: CommentRequestBody = JSON.parse(req.body)

  try {
    if (!author) throw new Error('Author is required')
    if (!email) throw new Error('Email is required')
    if (!body) throw new Error('Body is required')

    await client.create({
      _type: 'comment',
      author,
      email,
      body,
      isApproved: false,
      post: {
        _type: 'reference',
        _ref: _id,
      },
    })
  } catch (err) {
    captureException(err)
    return res.status(500).json({ message: `Couldn't submit comment`, err })
  }
  return res.status(200).json({ message: 'Comment submitted' })
}

export default withSentry(createUnapprovedComment)