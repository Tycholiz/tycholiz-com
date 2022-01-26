import styled from 'styled-components'
import { Paragraph, Text } from '../common'
import { formatDate } from '../../utils'
import { Comment as IComment } from '../../../@types/schema-types'

type Props = {
  comments: IComment[]
}

const Comment = styled.li`
    margin-bottom: 3em;
    list-style: none;
`

export const CommentList: React.FC<Props> = ({ comments = [] }: Props) => {
  return (
    <>
      {!!comments.length &&
        <>
          <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">Comments:</h2>
          <ul>
            {comments?.map(({ _id, publishedAt, author, body }) => (
              <Comment key={_id}>
                <Text>{author} </Text>
                <Text>({formatDate(publishedAt)})</Text>
                <Paragraph>{body}</Paragraph>
              </Comment>
            ))}
          </ul>
        </>
      }
    </>
  )
}