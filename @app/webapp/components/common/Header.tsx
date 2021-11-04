import Link from 'next/link'
import styled from 'styled-components'
import { List, Heading, HorizontalRule, Anchor } from '.'


const InnerWrapper = styled.nav`
  padding: 0.4em 2em;
`

const Bullet = styled.span`
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: ${({ theme }) => theme.color.primary[1]};
`

const NavList = styled(List)`
  display: flex;
  padding-left: 0;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary[0]};
  }
`

const NavListItem = styled.a`
  color: ${({ theme }) => theme.color.primary[0]};
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
              <a>thoughts</a>
            </Link>
          </li>
          <Bullet>&bull;</Bullet>
          <li>
            <Link href="https://tycholiz.github.io/Digital-Garden/" as={`https://tycholiz.github.io/Digital-Garden/`}>
              <a>second brain</a>
            </Link>
          </li>
          <Bullet>&bull;</Bullet>
          <li>
            <Link href="https://tycholiz.github.io/Digital-Garden/" as={`https://tycholiz.github.io/Digital-Garden/`}>
              <a>now</a>
            </Link>
          </li>
        </NavList>
      </InnerWrapper>
  )
}