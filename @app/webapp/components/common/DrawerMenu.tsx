import styled from 'styled-components';
import Link from 'next/link'
import React from 'react';

/*
const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`
*/

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`

const NavList = styled.ul``

export const DrawerMenu = () => {
    return (
      <Wrapper>
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
        </NavList>
      </Wrapper>
    )
  }
