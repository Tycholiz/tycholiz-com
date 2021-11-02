import { FunctionComponent } from 'react'
import styled from 'styled-components'

type Props = {
  header: FunctionComponent
  children: FunctionComponent
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
      <Header>{header}</Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}