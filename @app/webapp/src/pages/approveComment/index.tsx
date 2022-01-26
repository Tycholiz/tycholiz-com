import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from "next/router";
import client from '../../../sanity-client'

const ApproveCommentPage: NextPage = () => {
  const { query } = useRouter()
  const [hasDocumentUpdated, setHasDocumentUpdated] = useState(false)
    console.log('query._id', query._id);

  useEffect(() => {
    async function approveComment() {
      
      try {
        await client.patch(query._id as string)
          .set({ isApproved: true })
          .commit()
          .then((updatedComment: any) => {
            console.log('updatedComment', updatedComment);
            setHasDocumentUpdated(true)
          })
          .catch((err: Error) => {
            console.error('Oh no, the update failed: ', err.message)
          })
        // await client.create({
        //   _type: 'comment',
        //   author: 'johnny mcgee',
        //   email: 'faker@faker.com',
        //   body: 'buddy, this ain\'t a real email',
        // })
      } catch (err) {
        console.error(err)
      }
    }
    if (query._id) {
      approveComment()
    }
  }, [query._id])


  return (
    <>
    {hasDocumentUpdated ?
      <h1>The comment has been approved</h1>
      :
      <h1>Wasn&apos;t able to approve comment. Check browser console.</h1>
    }
    </>
  )
}


export default ApproveCommentPage