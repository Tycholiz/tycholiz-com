import styled from 'styled-components';
import Link from 'next/link'
import { List } from '.'


const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  height: 100vh;
  background-color: pink;
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
