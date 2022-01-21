type Props = {
  comments: {
    _id: string
    publishedAt: string
    author: string
    body: string
  }[]
}

export const CommentList = ({ comments = [] }: Props) => {
	return (
		<>
			<h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">Comments:</h2>
			<ul>
				{comments?.map(({ _id, _createdAt, author, body }) => (
					<li key={_id} className="mb-5">
						<hr className="mb-5" />
						<p>{author}</p>
						<p>{body}</p>
						<hr className="mt-5 mb-5" />
					</li>
				))}
			</ul>
		</>
	)
}