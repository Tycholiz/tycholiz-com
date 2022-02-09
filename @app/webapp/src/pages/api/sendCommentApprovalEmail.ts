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
            // TODO: put these emails into an env file so they aren't exposed to github
            "Email": "tycholiz22@hotmail.com",
            "Name": "Kyle"
          },
          "To": [
            {
              "Email": "tycholizkyle@gmail.com",
              "Name": "Kyle"
            },
            {
              "Email": "tycholiz@hotmail.com",
              "Name": "Kyle"
            }
          ],
          "Subject": "New comment on kyletycholiz.com",
          "TextPart": "My first Mailjet email",
          "HTMLPart": generateApproveCommentTemplate(req.body),
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
  request
    .then((result) => {
      console.log(JSON.stringify(result.body, null, 2))
    })
    .catch((err) => {
      console.log(err.statusCode)
    })

  res.status(200).json({ message: 'CommentApprovalEmail has been sent!' })
}
