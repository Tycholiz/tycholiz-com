import Link from 'next/link'
import styled from 'styled-components'
import { MenuButton } from '.'
import { DrawerMenu } from '.'
import { theme } from '../../styles/theme'


// this was formerly a Block component (from arc-react)
const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
`

const InnerWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: tomato;
`

const Heading = styled.h1``

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

export const Header = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Heading>Kyle Tycholiz</Heading>
        {/* <NavList>
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
        </NavList> */}
        {/* <MenuButton /> */}
        {/* <DrawerMenu /> */}
      </InnerWrapper>
    </Wrapper>
  )
}