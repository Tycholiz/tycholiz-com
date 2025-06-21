import { MusicPlayer } from '.'
import styled from 'styled-components'
import { SyntheticEvent, useState, useEffect } from 'react'
import { Song } from '@types'

type Props = {
  songs: Song[]
}

const PlayerContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const AutoplayContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  padding: 1em;
  background-color: rgb(6, 23, 37);
  border-radius: 6px;
  border: thick double #ffffff;
  width: fit-content;
`

const AutoplayLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
`

const ToggleContainer = styled.div`
  position: relative;
  margin-right: 0.75em;
  cursor: pointer;
`

const ToggleSlider = styled.div<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  background-color: ${({ checked }) => (checked ? '#34C759' : '#39393D')};
  border-radius: 14px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ checked }) => (checked ? '24px' : '2px')};
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: ${({ checked }) => (checked ? '#30A14E' : '#48484A')};
  }
`

export const MusicList: React.FC<Props> = ({ songs }) => {
  const [isAutoplay, setIsAutoplay] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null)

  useEffect(() => {
    const localStorageAutoplay = localStorage.getItem('autoplay')
    if (localStorageAutoplay) {
      setIsAutoplay(localStorageAutoplay === 'true')
    }
  }, [])

  const toggleAutoplay = () => {
    const newAutoplayState = !isAutoplay
    setIsAutoplay(newAutoplayState)
    localStorage.setItem('autoplay', String(newAutoplayState))
  }

  /**
   * When hitting 'play' on a song, pause all other songs that may be actively playing
   */
  const pauseOthers = (e: SyntheticEvent, songIndex: number) => {
    const audioTags = document.getElementsByTagName('audio')
    for (var i = 0; i < audioTags.length; i++) {
      if (audioTags[i] != e.target) {
        audioTags[i].pause()
      }
    }
    setCurrentPlayingIndex(songIndex)
  }

  /**
   * Handle when a song ends - if autoplay is enabled, play the next song
   */
  const handleSongEnd = (songIndex: number) => {
    if (isAutoplay && songIndex < songs.length - 1) {
      const nextIndex = songIndex + 1
      const audioTags = document.getElementsByTagName('audio')
      if (audioTags[nextIndex]) {
        audioTags[nextIndex].play()
        setCurrentPlayingIndex(nextIndex)
      }
    } else {
      setCurrentPlayingIndex(null)
    }
  }

  return (
    <PlayerContainer>
      <AutoplayContainer>
        <AutoplayLabel>
          <ToggleContainer onClick={toggleAutoplay}>
            <ToggleSlider checked={isAutoplay} />
          </ToggleContainer>
          Autoplay
        </AutoplayLabel>
      </AutoplayContainer>
      {songs.map((song, index) => (
        <MusicPlayer
          key={song._id}
          data={song}
          songIndex={index}
          pauseOthers={(e) => pauseOthers(e, index)}
          onSongEnd={() => handleSongEnd(index)}
        />
      ))}
    </PlayerContainer>
  )
}
