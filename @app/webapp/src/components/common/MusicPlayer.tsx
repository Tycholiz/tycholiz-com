import { Paragraph } from '../common'
import styled from 'styled-components'


type Props = {
  data: {
    _id: string
    title: string
		asset: {
			url: string
		}
  }
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

export const MusicPlayer: React.FC<Props> = ({ data }) => {

	return (
		<Container>
			<Paragraph>{data.title}</Paragraph>
			<audio
				controls
				src={data.asset.url}>
				Your browser does not support the
				<code>audio</code> element.
			</audio>
		</Container>
	)
}