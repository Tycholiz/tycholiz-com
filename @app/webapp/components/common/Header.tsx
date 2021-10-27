import Link from 'next/link'
import styled from 'styled-components'


// this was formerly a Block component (from arc-react)
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const Header = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <ul>
            <li>
              <Link href="/" as={`/`}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/posts" as={`/posts`}>
                <a>Thoughts</a>
              </Link>
            </li>
            <li>blog</li>
            <li>podcast</li>
            <li>what I'm working on</li>
        </ul>
      </InnerWrapper>
    </Wrapper>
  )
}