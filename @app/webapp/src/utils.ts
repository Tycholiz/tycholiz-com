export const formatDate = {
  long: (date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  short: (date: string) => new Date(date).toISOString().replace(/T.*/,'').split('-').join('-')
}
