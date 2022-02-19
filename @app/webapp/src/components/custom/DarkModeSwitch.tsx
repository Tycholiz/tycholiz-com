import styled from 'styled-components'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { moonPng, sunPng } from '../../static/png'

type Props = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const MoonIcon = styled.img`
  width: 16px;
  height: 16px;
  pointer-events: none;
`

const SunIcon = styled.img`
  width: 16px;
  height: 16px;
  pointer-events: none;
`

const Wrapper = styled.div`
  .custom-classname.react-toggle .react-toggle-track {
    background-color: #133654;
  }
  .custom-classname.react-toggle--checked .react-toggle-track {
    background-color: #133654;
  }
  .custom-classname.react-toggle--checked .react-toggle-thumb {
    border-color: ${(props) => props.theme.color.primary[0]};
  }
  /* center moon & sun icons */
  .react-toggle-track > div {
    height: 16px;
  }
`

export const DarkModeSwitch = ({ toggleDarkMode, isDarkMode }: Props) => {
  return (
  <Wrapper>
    <Toggle 
      onChange={toggleDarkMode} 
      checked={isDarkMode} 
      icons={{checked: <MoonIcon src={moonPng} />, unchecked: <SunIcon src={sunPng} />}}
      className='custom-classname'
    />
  </Wrapper>
  )
}