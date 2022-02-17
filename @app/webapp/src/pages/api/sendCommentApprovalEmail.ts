// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mailjet from 'node-mailjet'
import generateApproveCommentTemplate from '../../static/generateApproveCommentTemplate'


const mailjetClient = mailjet.connect(`${process.env.MAILJET_API_KEY}`, `${process.env.MAILJET_API_SECRET}`, {version: 'v3.1'})

type Response = {
  message: string
}

export default function sendCommentApprovalEmail(req: NextApiRequest, res: NextApiResponse<Response>) {

  // TODO: can this be a POST instead?
  // if (req.method === 'POST') {
  const request = mailjetClient
    .post("send")
    .request({
      "Messages": [
        {
          "From": {
            "Email": process.env.PERSONAL_EMAIL,
            "Name": "Kyle"
          },
          "To": [
            {
              "Email": process.env.PUBLIC_EMAIL,
              "Name": "Kyle"
            },
          ],
          "Subject": `New comment from ${req.body.author} on kyletycholiz.com`,
          "TextPart": "CommentApprovalEmail",
          "HTMLPart": generateApproveCommentTemplate(req.body),
          "CustomID": "CommentApprovalEmail"
        }
      ]
    })
  // TODO set up logrocket or sentry to capture these logs
  request
    .then((result) => {
      console.log(JSON.stringify(result.body, null, 2))
    })
    .catch((err) => {
      console.log(err.statusCode)
    })

  res.status(200).json({ message: 'CommentApprovalEmail has been sent!' })
}
