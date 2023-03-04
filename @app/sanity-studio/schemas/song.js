export default {
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'writer',
      title: 'Written By',
      type: 'string',
    },
    {
      name: 'producer',
      title: 'Produced By',
      type: 'string',
    },
    {
      name: 'yearWritten',
      title: 'Year Written',
      type: 'number',
    },
    {
      name: 'yearRecorded',
      title: 'Year Recorded',
      type: 'number',
    },
    {
      name: 'audioFileUrl',
      title: 'Audio File URL',
      type: 'file',
    },
    {
      name: 'songArtUrl',
      title: 'Song Art URL',
      type: 'image',
    },
    {
      name: 'lyrics',
      title: 'Lyrics',
      type: 'string',
    },
  ],
}
