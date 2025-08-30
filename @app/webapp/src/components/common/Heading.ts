import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  level: number
  colored: boolean
  children: JSX.Element
}


const fontSize = ({ level }: Props) => `${0.75 + 1 * (1 / level)}rem`

const styles = css`
  font-family: ${({ theme }) => theme.font.heading};
  font-weight: 700;
  font-size: ${fontSize};
  margin: 0;
  margin-top: 0.85714em;
  margin-bottom: 0.57142em;
  color: ${({ colored, theme }) => (colored ? theme.color.primary[0] : theme.color.grayscale[1])};
`

export const Heading = styled(({ level, children, ...props }) =>
  React.createElement(`h${level}`, props, children),
)`
  ${styles}
`

Heading.defaultProps = {
  level: 1,
}
