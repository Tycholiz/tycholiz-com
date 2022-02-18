// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mailjet from 'node-mailjet'
import { generateEmailContents } from '../../static/generateEmailContents'
import { withSentry, captureException } from "@sentry/nextjs"

const mailjetClient = mailjet.connect(
  `${process.env.MAILJET_API_KEY}`,
  `${process.env.MAILJET_API_SECRET}`,
  { version: 'v3.1' },
)

type Response = {
  message: string
  err?: any
}

/**
 * Sends an email to the website owner, giving the option to approve a comment. 
 * 
 * This should be triggered by a webhook.
 * @param req 
 * @param res 
 */
function sendCommentApprovalEmail(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  // TODO: can this be a POST instead?
  // if (req.method === 'POST') {
  mailjetClient
    .post('send')
    .request({
      Messages: generateEmailContents(req.body),
    })
    .then((result) => {
      console.log(JSON.stringify(result.body, null, 2))
    })
    .catch((err) => {
      captureException(err)
      return res.status(500).json({ message: 'couldn\'t send approve comment email', err })
    })

  res.status(200).json({ message: 'CommentApprovalEmail has been sent!' })
}

export default withSentry(sendCommentApprovalEmail)