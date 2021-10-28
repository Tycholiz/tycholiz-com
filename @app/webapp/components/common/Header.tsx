import Link from 'next/link'
import styled from 'styled-components'
import { MenuButton } from '.'
import { theme } from '../../styles/theme'


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
  width: 100%;
  background-color: tomato;
`

const Heading = styled.h1`
`

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;

  & li {
    padding-left: 1em;
  }

  @media screen and (max-width: ${theme.mobile}) {
    display: none;
  }
`

const HamburgerWrapper = styled.div`
  @media screen and (min-width: ${theme.mobile}) {
    display: none;
  }
`

export const Header = () => {

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading>Kyle Tycholiz</Heading>
        <HamburgerWrapper>
          <MenuButton />
        </HamburgerWrapper>
        <NavList>
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
            <li>
              <Link href="/" as={`/`}>
                <a>Knowledge base</a>
              </Link>
            </li>
            <li>podcast</li>
            <li>what I'm working on</li>
        </NavList>
      </InnerWrapper>
    </Wrapper>
  )
}