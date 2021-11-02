import Link from 'next/link'
import styled from 'styled-components'
import { MenuButton, DrawerMenu, List } from '.'
import { theme } from '../../styles/theme'


const InnerWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4em 2em;
`

const Heading = styled.h1``

const NavList = styled(List)`
  display: flex;
  justify-content: flex-end;
  background: pink;

  & li {
    padding-left: 1em;
  }

  @media screen and (max-width: ${theme.mobileLarge}) {
    display: none;
  }
`

export const Header = () => {
  return (
      <InnerWrapper>
        <Heading>Kyle Tycholiz</Heading>
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
        <MenuButton />
        <DrawerMenu />
      </InnerWrapper>
  )
}