import Link from 'next/link'
import styled from 'styled-components'
import { Heading, HorizontalRule, Label } from '.'
import constants from '../../constants'

type Props = {
  toggleDarkMode: any
  isDarkMode: boolean
}


const InnerWrapper = styled.nav`
  padding: 0.4em 2em;
`

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary[0]};
  }
`

const Bullet = styled.span`
  padding-left: 0.5em;
  padding-right: 0.5em;
  color: ${({ theme }) => theme.color.grayscale[2]};
`

const StyledCheckbox = styled.input`

`

export const Header = (props: Props) => {
  return (
      <InnerWrapper>
        <TopLine>
          <Link href="/" as={`/`} passHref>
            <Heading>Kyle Tycholiz</Heading>
          </Link>
          <Label>{props.isDarkMode ? "Dark mode" : "Light mode"}
            <StyledCheckbox onChange={props.toggleDarkMode} type="checkbox" checked={props.isDarkMode} />
          </Label>
        </TopLine>
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
            <a href={constants.dendronTechUrl} target="_blank" rel="noreferrer">second brain</a>
          </li>
        </NavList>
      </InnerWrapper>
  )
}