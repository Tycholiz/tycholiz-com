import styled from 'styled-components'
import { Paragraph } from '../common'
import { Paragraph } from '../common'
import { Paragraph } from '../common'

const Wrapper = styled.div`
  margin-left: 2em;
  margin-right: 2em;
`

export const Home = () => {
  return (
      <Wrapper>
        <h2>Me in 10 seconds</h2>
        <Paragraph>I am a musician, programmer, and lifelong learner from Canada.</Paragraph>

        <Paragraph>An obsessive generalist, my interests range from investing, to software
        development, to math and science, to logic and philosophy. A perpetual student
        in all of my worthwhile fields (link here), I obsess over gathering information
        that helps my worldview. See my Dendron second-brain.</Paragraph>

        <h2>What I'm working on now</h2>
        <Paragraph>See my now page.</Paragraph>

        <h2>Let's get in touch</h2>
        <Paragraph>I love to make connections with people. Each of us is in a position
        to offer something valuable to another. Finding it is the key.</Paragraph>
        <Paragraph>If you think we should be in touch, then I look forward to talking
        with you! The best way to reach me is through email.</Paragraph>

        <h2>Latest articles</h2>
      </Wrapper>
  )
}