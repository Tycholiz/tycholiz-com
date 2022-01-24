export default (data) => `
	<h2>New comment from ${data.author} (${data.email})</h2>
	<p>${data.body}</p>
	<a href="https://kyletycholiz.com/api/approveComment">Approve comment</a>
`

// https://3tpd6ok4.api.sanity.io/v2021-06-07/data/mutate/production