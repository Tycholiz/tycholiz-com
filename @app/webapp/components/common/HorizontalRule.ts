import styled from 'styled-components'

export const HorizontalRule = styled.hr`
  border: 1px solid ${({ theme }) => theme.color.grayscale[3]};
  border-width: 0 0 1px;
  width: 100%;
`
