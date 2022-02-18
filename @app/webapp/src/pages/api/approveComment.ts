import client from '../../../sanity-client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry, captureException } from "@sentry/nextjs"

interface Response {
  message: string
  err?: any
}

/**
 * Approves the comment so that it may be shown on the site.
 * @param req 
 * @param res 
 */
async function approveComment(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { _id } = req.query

  try {
    await client
      .patch(_id as string)
      .set({ isApproved: true })
      .commit()
      .then((updatedComment: any) => {
        console.log('updatedComment', updatedComment)
      })
      .catch((err: Error) => {
        throw new Error(err.message)
      })
  } catch (err) {
    captureException(err)
    return res.status(500).json({ message: `Couldn't approve comment`, err })
  }
  return res.status(200).json({ message: 'You have approved the comment' })
}

export default withSentry(approveComment)