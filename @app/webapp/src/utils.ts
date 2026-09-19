export const formatDate = {
  long: (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  short: (date: string) => new Date(date).toISOString().replace(/T.*/, '').split('-').join('-'),
}

/**
 * Ask the Sanity image CDN for an asset at (roughly) the size it is actually
 * displayed at, instead of shipping the full-resolution upload. Song art is
 * rendered at 48-100px but the raw asset URL can be several MB, and those
 * downloads compete with audio requests on the same connection.
 *
 * URLs that aren't Sanity CDN assets are passed through untouched.
 */
export const sanityImageUrl = (url: string, { height }: { height: number }): string => {
  if (!url || !url.startsWith('https://cdn.sanity.io/')) return url
  const separator = url.includes('?') ? '&' : '?'
  // 2x for high-density displays.
  return `${url}${separator}h=${height * 2}&fit=max&auto=format`
}
