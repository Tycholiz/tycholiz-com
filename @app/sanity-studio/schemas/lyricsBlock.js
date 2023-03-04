export default {
  type: 'object',
  name: 'lyricsBlock',
  title: 'Lyrics Block',
  fields: [
    {
      type: 'array',
      name: 'lyrics',
      of: [{ type: 'lyrics' }],
      validation: (Rule) => Rule.required(),
    },
  ],
}
