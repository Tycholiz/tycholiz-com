import styled from 'styled-components'

type Props = {
  header: JSX.Element
  children: JSX.Element | JSX.Element[]
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
  padding: 0.4em 2em;
`

export const DefaultTemplate = ({ header, children, ...props }: Props) => {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Content>{children}</Content>
    </Wrapper>
  )
}
