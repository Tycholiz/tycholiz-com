import styled from 'styled-components'
import { theme } from '../../styles/theme'


type Props = {
  isOpen: boolean,
  setOpen: any,
}

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${({ isOpen }: Props) => isOpen ? theme.primaryDark : theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ isOpen }: Props) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ isOpen }: Props) => isOpen ? '0' : '1'};
      transform: ${({ isOpen }: Props) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${({ isOpen }: Props) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  /* Ideally, this media query should be in the parent, as the button itself shouldn't decide when it renders */
  @media screen and (min-width: ${theme.mobileLarge}) {
    display: none;
  }
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

export const MenuButton = ({ isOpen, setOpen }: Props) => {
  return (
    <StyledBurger isOpen={isOpen}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
  