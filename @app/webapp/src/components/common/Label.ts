import styled from 'styled-components'

const Label = styled.label`
  font-family: ${({ theme }) => theme.font.paragraph};
  color: ${({ theme }) => theme.color.primary[0]};
  font-size: 1rem;
  line-height: 2em;
`

export default Label