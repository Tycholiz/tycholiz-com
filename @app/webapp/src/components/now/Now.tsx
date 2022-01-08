import { Paragraph, Anchor } from '../common'


export const Now = () => {
  return (
    <>
    <Paragraph>
      In the past I have been known to take on too many projects at once. This
      of course was accompanied by the attendant graveyard of partially
      completed projects. To combat this tendency, I have imposed a hard limit
      of 2 projects at a time. Projects count as any endeavor that has a defined
      completion date, or set milestones (such as launching a business).
    </Paragraph>

    <Paragraph>
      The first project is to record a song written several
      years ago. I will find a way to link it to my website when it is ready. It
      is being produced by my friend <Anchor target="_blank" href="https://www.devbrow.com">Dev
      Brow</Anchor>, who does fantastic mixing and mastering work for me.
    </Paragraph>

    <Paragraph>
      Secondly, I am working on finishing off my personal website. My next goal
      is to get my publicly available Dendron Second Brain to stay up to date
      with my local one. Right now, deployments have to be made manually. From
      there I will try to write with some regularity. I still have not decided
      what I'd like to write about, but the subject matter will be something
      that feels natural to me.
    </Paragraph>
    </>
  )
}
