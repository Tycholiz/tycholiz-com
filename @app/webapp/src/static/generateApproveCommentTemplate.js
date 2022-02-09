/*
	Template for email that allows us to accept/reject the comment.
*/

export default (data) => `
	<h2>New comment from ${data.author} (${data.email}), on post </h2>
	<p>${data.body}</p>
	<a href="https://kyletycholiz.com/api/approveComment?_id=${data._id}">Approve comment</a>
`