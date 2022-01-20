import groq from 'groq'

const postFields = `
  _id,
  title,
  subtitle,
  body,
	publishedAt,
`
const commentFields = `
  _id,
  _createdAt,
  author,
  body,
	isApproved,
`

export const getPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
		${postFields}
		'comments': *[ _type == "comment" && post._ref == ^._id && isApproved == true] {
			${commentFields}
		}
	}
`