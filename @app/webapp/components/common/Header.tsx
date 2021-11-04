import Link from 'next/link'
import styled from 'styled-components'
import { List, Heading, HorizontalRule } from '.'


const InnerWrapper = styled.nav`
  padding: 0.4em 2em;
`

const NavList = styled(List)`
  display: flex;
  padding-left: 0;

  & li {
    padding-right: 1em;
  }
`

export const Header = () => {
  return (
      <InnerWrapper>
        <Link href="/" as={`/`}>
          <Heading>Kyle Tycholiz</Heading>
        </Link>
        <HorizontalRule />
        <NavList>
          <li>
            <Link href="/posts" as={`/posts`}>
              <a>THOUGHTS</a>
            </Link>
          </li>
          <li>
            <Link href="https://tycholiz.github.io/Digital-Garden/" as={`https://tycholiz.github.io/Digital-Garden/`}>
              <a>SECOND BRAIN</a>
            </Link>
          </li>
          <li>NOW</li>
        </NavList>
      </InnerWrapper>
  )
}