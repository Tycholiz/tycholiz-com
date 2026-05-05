import { MusicPlayer } from '.'
import { BottomMediaPlayer } from './BottomMediaPlayer'
import styled from 'styled-components'
import { SyntheticEvent, useState, useEffect } from 'react'
import { Song } from '@types'

type Props = {
  songs: Song[]
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const PlayerContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
`

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2em;
  gap: 2em;
`

const AutoplayLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color.grayscale[0]};
  font-weight: bold;
  font-size: 0.9em;
`

const ToggleContainer = styled.div`
  position: relative;
  margin-right: 0.75em;
  cursor: pointer;
`

const ToggleSlider = styled.div<{ checked: boolean; color?: string; hoverColor?: string }>`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  background-color: ${({ checked, theme, color }) =>
    checked ? color || theme.color.primary[0] : theme.color.grayscale[5]};
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
    background-color: ${({ theme }) => theme.color.grayscale[0]};
    border-radius: 50%;
    transition: left 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: ${({ checked, theme, hoverColor, color }) =>
      checked ? hoverColor || theme.color.primary[1] : theme.color.grayscale[4]};
  }
`

export const MusicList: React.FC<Props> = ({ songs }) => {
  const [isAutoplay, setIsAutoplay] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null)
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([])
  const [hasEverPlayed, setHasEverPlayed] = useState(false)

  useEffect(() => {
    const localStorageAutoplay = localStorage.getItem('autoplay')
    if (localStorageAutoplay) {
      setIsAutoplay(localStorageAutoplay === 'true')
    }
    const localStorageShuffle = localStorage.getItem('shuffle')
    if (localStorageShuffle) {
      setIsShuffle(localStorageShuffle === 'true')
    }
  }, [])

  // Generate shuffled play order when shuffle is enabled or songs change
  useEffect(() => {
    if (isShuffle) {
      const indices = songs.map((_, i) => i)
      setShuffledOrder(shuffleArray(indices))
    }
  }, [isShuffle, songs])

  const toggleAutoplay = () => {
    const newAutoplayState = !isAutoplay
    setIsAutoplay(newAutoplayState)
    localStorage.setItem('autoplay', String(newAutoplayState))
  }

  const toggleShuffle = () => {
    const newShuffleState = !isShuffle
    setIsShuffle(newShuffleState)
    localStorage.setItem('shuffle', String(newShuffleState))
    if (newShuffleState) {
      // Generate new shuffled order when enabling
      const indices = songs.map((_, i) => i)
      setShuffledOrder(shuffleArray(indices))
    }
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
    setHasEverPlayed(true)
  }

  const handleNext = () => {
    if (currentPlayingIndex === null) return
    const audioTags = document.getElementsByTagName('audio')
    let nextIndex: number

    if (isShuffle && shuffledOrder.length === songs.length) {
      const pos = shuffledOrder.indexOf(currentPlayingIndex)
      nextIndex = shuffledOrder[(pos + 1) % shuffledOrder.length]
    } else {
      nextIndex = (currentPlayingIndex + 1) % songs.length
    }

    for (let i = 0; i < audioTags.length; i++) audioTags[i].pause()
    audioTags[nextIndex].play()
    setCurrentPlayingIndex(nextIndex)
  }

  const handlePrev = () => {
    if (currentPlayingIndex === null) return
    const audioTags = document.getElementsByTagName('audio')
    let prevIndex: number

    if (isShuffle && shuffledOrder.length === songs.length) {
      const pos = shuffledOrder.indexOf(currentPlayingIndex)
      prevIndex = shuffledOrder[(pos - 1 + shuffledOrder.length) % shuffledOrder.length]
    } else {
      prevIndex = (currentPlayingIndex - 1 + songs.length) % songs.length
    }

    for (let i = 0; i < audioTags.length; i++) audioTags[i].pause()
    audioTags[prevIndex].play()
    setCurrentPlayingIndex(prevIndex)
  }

  /**
   * Handle when a song ends - if autoplay is enabled, play the next song
   * If shuffle is enabled, play the next song in the shuffled order
   */
  const handleSongEnd = (songIndex: number) => {
    if (!isAutoplay) {
      setCurrentPlayingIndex(null)
      return
    }

    const audioTags = document.getElementsByTagName('audio')

    if (isShuffle && shuffledOrder.length === songs.length) {
      // Find current position in shuffle order and get next
      const currentShufflePosition = shuffledOrder.indexOf(songIndex)
      if (currentShufflePosition < shuffledOrder.length - 1) {
        const nextIndex = shuffledOrder[currentShufflePosition + 1]
        if (audioTags[nextIndex]) {
          audioTags[nextIndex].play()
          setCurrentPlayingIndex(nextIndex)
        }
      } else {
        setCurrentPlayingIndex(null)
      }
    } else {
      // Normal sequential playback
      if (songIndex < songs.length - 1) {
        const nextIndex = songIndex + 1
        if (audioTags[nextIndex]) {
          audioTags[nextIndex].play()
          setCurrentPlayingIndex(nextIndex)
        }
      } else {
        setCurrentPlayingIndex(null)
      }
    }
  }

  return (
    <PlayerContainer>
      <ControlsContainer>
        <AutoplayLabel>
          <ToggleContainer onClick={toggleAutoplay}>
            <ToggleSlider checked={isAutoplay} />
          </ToggleContainer>
          Autoplay
        </AutoplayLabel>
        <AutoplayLabel>
          <ToggleContainer onClick={toggleShuffle}>
            <ToggleSlider checked={isShuffle} color="#5b9bd5" hoverColor="#4a8ac4" />
          </ToggleContainer>
          Shuffle
        </AutoplayLabel>
      </ControlsContainer>
      {songs.map((song, index) => (
        <MusicPlayer
          key={song._id}
          data={song}
          songIndex={index}
          isPlaying={currentPlayingIndex === index}
          pauseOthers={(e) => pauseOthers(e, index)}
          onSongEnd={() => handleSongEnd(index)}
        />
      ))}
      <BottomMediaPlayer
        songs={songs}
        currentPlayingIndex={currentPlayingIndex}
        visible={hasEverPlayed}
        isShuffle={isShuffle}
        onToggleShuffle={toggleShuffle}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </PlayerContainer>
  )
}
