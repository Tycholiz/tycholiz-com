import { MusicPlayer } from '../common'
import styled from 'styled-components'

type Props = {
  songs: {
    _id: string
    title: string
  }[]
}

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const MusicList: React.FC<Props> = ({ songs }) => {
  console.log(songs);

	return (
    <PlayerContainer>
      {songs.map(song => <MusicPlayer data={song} />)}
    </PlayerContainer>
  )
}
