import styled from 'styled-components'

export const Anchor = styled.a`
  color: ${({ theme }) => theme.color.primary[0]};
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.color.primary[1]};
  }
`
