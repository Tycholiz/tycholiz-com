export default {
	name: 'comment',
	type: 'document',
	title: 'Comment',
	fields: [
		{
			title: 'Author',
			name: 'author',
			type: 'string',
		},
		{
      title: 'Email',
			name: 'email',
			type: 'string',
		},
		{
      title: 'Comment body',
			name: 'body',
			type: 'text',
			// TODO: should this be text or block content?
		},
		{
			title: 'Approved',
			name: 'isApproved',
			type: 'boolean',
			description: "Comments won't show on the site without approval"
		},
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
		{
      title: 'Post',
			name: 'post',
			type: 'reference',
			to: [
				{ type: 'post' }
			]
		},
		{
      title: 'Reply',
			name: 'reply',
			type: 'reference',
			to: [
				{ type: 'comment' }
			]
		}
	],
	// preview: {
	// 	select: {
	// 		name: 'author',
	// 		comment: 'body',
	// 		post: 'post.title'
	// 	},
	// 	prepare({ author, body, post }) {
	// 		return {
	// 			title: `${author} on ${post}`,
	// 			subtitle: body
	// 		}
	// 	}
	// }
}