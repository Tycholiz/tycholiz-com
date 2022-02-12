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
  publishedAt,
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

export const getLatestPostsQuery = groq`
  *[_type == "post" && publishedAt < now()][0..5] | order(publishedAt desc)
`


export const getAllPostsQuery = groq`
  *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
`

export const getSongsQuery = groq`
	*[_type == "song"] | order(yearRecorded desc, yearWritten desc) {
    _id,
    title,
    writer,
    producer,
    yearWritten,
    yearRecorded,
    asset->{url}
  }
`