export default {
  type: 'object',
  name: 'lyrics',
  title: 'Lyrics',
  fields: [
    {
      type: 'text',
      title: 'Text',
      name: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
}
