// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mailjet from 'node-mailjet'
import generateApproveCommentTemplate from '../../static/generateApproveCommentTemplate'
import { withSentry } from "@sentry/nextjs"

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
 * Sends an email to the website owner, giving the option to approve a comment
 * @param req 
 * @param res 
 */
function sendCommentApprovalEmail(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  // TODO: can this be a POST instead?
  // if (req.method === 'POST') {
  const request = mailjetClient.post('send').request({
    Messages: [
      {
        From: {
          Email: process.env.PERSONAL_EMAIL,
          Name: 'Kyle',
        },
        To: [
          {
            Email: process.env.PUBLIC_EMAIL,
            Name: 'Kyle',
          },
        ],
        Subject: `New comment from ${req.body.author} on kyletycholiz.com`,
        TextPart: 'CommentApprovalEmail',
        HTMLPart: generateApproveCommentTemplate(req.body),
        CustomID: 'CommentApprovalEmail',
      },
    ],
  })
  request
    .then((result) => {
      console.log(JSON.stringify(result.body, null, 2))
    })
    .catch((err) => {
      console.error(err.statusCode)
      return res.status(500).json({ message: 'couldn\'t send approve comment email', err })
    })

  res.status(200).json({ message: 'CommentApprovalEmail has been sent!' })
}

export default withSentry(sendCommentApprovalEmail)