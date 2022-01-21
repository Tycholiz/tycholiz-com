import styled from 'styled-components'
import { Paragraph, Text } from '../common'
import { formatDate } from '../../utils'

type Props = {
  comments: {
    _id: string
    publishedAt: string
    author: string
    body: string
  }[]
}

const Comment = styled.li`
	margin-bottom: 3em;
	list-style: none;
`

export const CommentList: React.FC<Props> = ({ comments = [] }: Props) => {
	return (
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
	)
}