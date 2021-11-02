import styled from 'styled-components'
import { theme } from '../../styles/theme'

type Props = {
  header: JSX.Element
  children: JSX.Element
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`

const Header = styled.header``

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 1rem;
  @media screen and (min-width: ${theme.mobileSmall}) {
    margin: 2rem;
  }
  @media screen and (min-width: ${theme.mobileMedium}) {
    margin: 3rem;
  }
`

export const DefaultTemplate = ({
  header, 
  children, 
  ...props
}: Props) => {
  return (
    <Wrapper {...props}>
      {/* <Header>{header}</Header> */}
      <Content>{children}</Content>
    </Wrapper>
  )
}