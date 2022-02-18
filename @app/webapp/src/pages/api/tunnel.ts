import { withSentry, captureException } from '@sentry/nextjs'
import * as url from 'url'

// Change host appropriately if you run your own Sentry instance.
const sentryHost = 'sentry.io'

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
const knownProjectIds = ['cf705c58f228']

async function handler(req: any, res: any) {
  try {
    const envelope = req.body
    const pieces = envelope.split('\n')

    const header = JSON.parse(pieces[0])

    const { host, path } = url.parse(header.dsn)
    // TODO: try this for non-deprecated url module
    // const { host, pathname } = new URL(header.dsn)
    if (host !== sentryHost) {
      throw new Error(`invalid host: ${host}`)
    }

    if (!path) throw new Error('invalid dsn')
    const projectId = path.endsWith('/') ? path.slice(0, -1) : path
    if (!knownProjectIds.includes(projectId)) {
      throw new Error(`invalid project id: ${projectId}`)
    }

    const myUrl = `https://${sentryHost}/api/${projectId}/envelope/`
    const response = await fetch(myUrl, {
      method: 'POST',
      body: envelope,
    })
    return response.json()
  } catch (e) {
    captureException(e)
    return res.status(400).json({ status: 'invalid request' })
  }
}

export default withSentry(handler)
