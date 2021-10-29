import { FunctionComponent } from 'react'
import styled from 'styled-components'

type Props = {
  header: FunctionComponent
  children: FunctionComponent
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 640px) {
    padding-top: 3.25rem;
  }
`

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
`

const Footer = styled.footer`
  margin-top: auto;
`

export const DefaultTemplate = ({
  header, 
  children, 
  ...props
}: Props) => {
  return (
    <Wrapper {...props}>
      {header}
      <Content>{children}</Content>
    </Wrapper>
  )
}