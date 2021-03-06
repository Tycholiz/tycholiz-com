import styled from 'styled-components'
import { Heading, Text } from '@components/common'
import { useState, SyntheticEvent  } from 'react'

type Props = {
  postId: string
}

const Container = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
`

const Label = styled.label`
  line-height: 1.8;
`

const Input = styled.input`
  display: block;
  margin-bottom: 0.4em;
`

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 10em;
  margin-bottom: 0.6em;
`

/* TODO: Upon 200 OK from api call to Sanity, we should replace the form with a Success message in UI */
export const CommentForm: React.FC<Props> = ({ postId }: Props) => {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const [hasSubmittedComment, setHasSubmittedComment] = useState(false)

  const resetCommentForm = () => {
    setAuthor('')
    setEmail('')
    setCommentBody('')
  }

  const handleSubmitComment = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      if (!author || !email || !commentBody) {
        window.alert('Please enter all the fields')
        return
      }
      await fetch('/api/createUnapprovedComment', {
        method: 'POST',
        body: JSON.stringify({
          _id: postId,
          author,
          email,
          body: commentBody,
        }),
        /* @ts-ignore */
        type: 'application/json',
      })
      resetCommentForm()
      setHasSubmittedComment(true)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Container>
      {hasSubmittedComment ? (
        <Text colored={true}>Thank you for submitting a comment</Text>
      ) : (
        <>
          <Heading>Your thoughts?</Heading>
          <form method="post">
            <Label>
              Your name
              <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Label>
            <Label>
              Your email <Text small>(PRIVATE FOR MY EYES ONLY)</Text>
              <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Label>
            <Label>
              Comment
              <Textarea value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            </Label>
            <button onClick={handleSubmitComment}>Submit</button>
          </form>
        </>
      )}
    </Container>
  )
}
