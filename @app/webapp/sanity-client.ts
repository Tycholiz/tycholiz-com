import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '3tpd6ok4',
  dataset: 'production',
  useCdn: true
})