import Link from 'next/link'
import styled from 'styled-components'
import { List, Heading, HorizontalRule } from '.'


const InnerWrapper = styled.nav`
  padding: 0.4em 2em;
`

const Bullet = styled.span`
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: ${({ theme }) => theme.color.grayscale[2]};
`

const NavList = styled(List)`
  display: flex;
  padding-left: 0;
  margin-bottom: 0;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary[0]};
  }
`

export const Header = () => {
  return (
      <InnerWrapper>
        <Link href="/" as={`/`} passHref>
          <Heading>Kyle Tycholiz</Heading>
        </Link>
        <HorizontalRule />
        <NavList>
          <li>
            <Link href="/" as={`/`}>
              <a>home</a>
            </Link>
          </li>
          <Bullet>&bull;</Bullet>
          <li>
            <Link href="/posts" as={`/posts`}>
              <a>thoughts</a>
            </Link>
          </li>
          <Bullet>&bull;</Bullet>
          <li>
            <Link href="/now" as={`/now`}>
              <a>now</a>
            </Link>
          </li>
          <Bullet>&bull;</Bullet>
          <li>
            <a href="https://tycholiz.github.io/Digital-Garden/" target="_blank" rel="noreferrer">second brain</a>
          </li>
        </NavList>
      </InnerWrapper>
  )
}