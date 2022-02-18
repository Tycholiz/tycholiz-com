/** 
	Generate the template for email that allows website owner to accept/reject the comment.
*/
const generateApproveCommentTemplate = (data) => `
	<h2>New comment from ${data.author} (${data.email}), on post </h2>
	<p>${data.body}</p>
	<a href="https://kyletycholiz.com/api/approveComment?_id=${data._id}">Approve comment</a>
`

export const generateEmailContents = (data) => [{
	From: {
		Email: process.env.PERSONAL_EMAIL,
		Name: 'Kyle',
	},
	To: [
		{
			Email: process.env.PUBLIC_EMAIL,
			Name: 'Kyle',
		},
	],
	Subject: `New comment from ${data.author} on kyletycholiz.com`,
	TextPart: 'CommentApprovalEmail',
	HTMLPart: generateApproveCommentTemplate(data),
	CustomID: 'CommentApprovalEmail',
}]
