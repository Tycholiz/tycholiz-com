import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  ordered: boolean,
  children: JSX.Element[],
  isStyled: boolean,
}

const styles = css`
  font-family: ${({ theme }) => theme.font.paragraph};
  margin: 1rem 0;
  padding-left: 1.6rem;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.color.grayscale[0]};
  list-style-type: ${({ isStyled }: Props) => isStyled ? 'disc' : 'none'};
`

const Ol = styled.ol`${styles}`
const Ul = styled.ul`${styles}`

export const List = ({ ordered, children, isStyled, ...props }: Props) => {
  return React.createElement(ordered ? Ol : Ul, props, children)
}

List.defaultProps = {
  ordered: false,
  isStyled: true,
}