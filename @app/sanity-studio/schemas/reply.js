export default {
	name: 'reply',
	title: 'Reply',
	type: 'document',
	fields: [
		{
			title: 'Reply body',
			name: 'body',
			type: 'text',
		},
		{
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
		},
	],
}
