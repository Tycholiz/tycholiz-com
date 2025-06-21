import sanityClient from '@sanity/client'

// Explicit configuration with better environment variable handling
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN || '',
  apiVersion: '2021-10-26',
}

// Debug logging for build process
if (process.env.NODE_ENV !== 'production') {
  console.log('Sanity config:', {
    projectId: config.projectId ? 'Set' : 'Missing',
    dataset: config.dataset,
    hasToken: !!config.token,
  })
}

// Validate required fields
if (!config.projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export default sanityClient(config)
