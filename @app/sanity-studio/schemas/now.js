export default {
  name: 'now',
  title: 'Now',
  type: 'document',
  fields: [
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
}
