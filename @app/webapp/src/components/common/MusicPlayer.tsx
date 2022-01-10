import { Paragraph } from '../common'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'


type Props = {
  data: {
    _id: string
    title: string
		asset: {
			url: string
		}
  }
	pauseOthers: (e: SyntheticEvent) => void
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

export const MusicPlayer: React.FC<Props> = ({ data, pauseOthers }) => {
	return (
		<Container>
			<Paragraph>{data.title}</Paragraph>
			<audio
				controls
				onPlay={(e) => pauseOthers(e)}
				src={data.asset.url}>
				Your browser does not support the
				<code>audio</code> element.
			</audio>
		</Container>
	)
}