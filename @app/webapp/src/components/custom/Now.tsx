import { Paragraph, Anchor, Text } from '../common'

export const Now = () => {
  return (
    <>
      <Text small>Last updated: Jan 20, 2022</Text>
      <Paragraph>
        In the past I have been known to take on too many projects at once. This of course was
        accompanied by the attendant graveyard of partially completed projects. To combat this
        tendency, I have imposed a hard limit of 2 projects at a time. Projects count as any
        endeavor that has a defined completion date, or set milestones (such as launching a
        business).
      </Paragraph>

      <Paragraph>
        The first project is to record a song written several years ago. I will link
        it to my website when it is ready. It is being produced by my friend{' '}
        <Anchor target="_blank" href="https://www.devbrow.com">
          Dev Brow
        </Anchor>
        , who does fantastic mixing and mastering work for me.
      </Paragraph>

      <Paragraph>
        Secondly, I am working on finishing off my personal website. I have set
        up automatic syncing of my Second Brain, meaning what&apos;s published will
        lag by no more than a day from what&apos;s on my machine. The site also has
        music now, and will soon have comments finished.
      </Paragraph>
    </>
  )
}
