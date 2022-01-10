import { MusicPlayer } from '../common'
import styled from 'styled-components'

type Props = {
  songs: {
    _id: string
    title: string
    asset: {
			url: string
    }
  }[]
}

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const MusicList: React.FC<Props> = ({ songs }) => {

	return (
    <PlayerContainer>
      {songs.map(song => <MusicPlayer key={song._id} data={song} />)}
    </PlayerContainer>
  )
}
