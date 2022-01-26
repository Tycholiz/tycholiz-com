import client from '../../../sanity-client'
import { NextApiRequest, NextApiResponse } from 'next'


interface Response {
  message: string
  err?: any
}

export default async function createComment(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { _id } = req.query
  
  try {
    await client.patch(_id as string)
      .set({ isApproved: true })
      .commit()
      .then((updatedComment: any) => {
        console.log('updatedComment', updatedComment);
      })
      .catch((err: Error) => {
        console.error('Oh no, the update failed: ', err.message)
      })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: `Couldn't approve comment`, err })
  }
  return res.status(200).json({ message: 'Comment submitted' })
}