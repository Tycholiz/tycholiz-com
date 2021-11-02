import styled from 'styled-components';
import Link from 'next/link'
import { theme } from '../../styles/theme'
import { List } from '.'


type Props = {
  isOpen: boolean,
}

const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 100vh;
  width: 85%;
  transform: ${({ isOpen }: Props) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
  background-color: pink;

  @media (min-width: ${theme.mobileSmall}) {
    width: 70%;
  }

  @media (min-width: ${theme.mobileMedium}) {
    width: 50%;
  }
`

export const DrawerMenu = () => {
    return (
      <Wrapper>
        <List>
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
        </List>
      </Wrapper>
    )
  }
