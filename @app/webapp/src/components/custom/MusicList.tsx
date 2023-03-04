import { MusicPlayer } from '.'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'
import { Song } from '@types'

type Props = {
  songs: Song[]
}

const PlayerContainer = styled.section`
  display: flex;
  flex-direction: column;
`

export const MusicList: React.FC<Props> = ({ songs }) => {
  /**
   * When hitting 'play' on a song, pause all other songs that may be actively playing
   */
  const pauseOthers = (e: SyntheticEvent) => {
    const audioTags = document.getElementsByTagName('audio')
    for (var i = 0; i < audioTags.length; i++) {
      if (audioTags[i] != e.target) {
        audioTags[i].pause()
      }
    }
  }

  return (
    <PlayerContainer>
      {songs.map((song) => (
        <MusicPlayer key={song._id} data={song} pauseOthers={pauseOthers} />
      ))}
    </PlayerContainer>
  )
}
