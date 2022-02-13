import styled from 'styled-components'
import { Paragraph, Text } from '@components/common'
import { formatDate } from '@utils'
import { Comment as IComment, Reply as IReply } from '../../../@types/schema-types'

type Props = {
  comments: IComment[]
}

const Comment = styled.li`
  margin-bottom: 3em;
  list-style: none;
`

const ReplyWrapper = styled.div`
  margin-left: 1em;
  margin-top: 0.3em;
  padding: 0.4em;
  background-color: ${({ theme }) => theme.color.grayscale[6]};
  border-radius: 2px;
`

const Reply: React.FC<{ data: IReply }> = ({ data }) => {
  return (
    <ReplyWrapper>
      <p>{data.body}</p>
    </ReplyWrapper>
  )
}

export const CommentList: React.FC<Props> = ({ comments = [] }: Props) => {
  // TODO remove those classes below
  return (
    <>
      {!!comments.length &&
        <>
          <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">Comments:</h2>
          <ul>
            {comments?.map(({ _id, _createdAt, author, body, reply }) => (
              <Comment key={_id}>
                <Text>{author} </Text>
                <Text>({formatDate.short(_createdAt)})</Text>
                <Paragraph>{body}</Paragraph>
                {reply && <Reply data={reply} />}
              </Comment>
            ))}
          </ul>
        </>
      }
    </>
  )
}