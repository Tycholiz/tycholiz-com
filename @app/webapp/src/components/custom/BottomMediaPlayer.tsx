import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Song } from '@types'

type Props = {
  songs: Song[]
  currentPlayingIndex: number | null
  visible: boolean
  isShuffle: boolean
  onToggleShuffle: () => void
  onNext: () => void
  onPrev: () => void
}

const Bar = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0d2133;
  border-top: 1px solid #1e3a52;
  z-index: 1000;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 0.6em 1em calc(0.5em + env(safe-area-inset-bottom));
  gap: 0.4em;
  transform: translateZ(0);
`

const MainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;
`

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6em;
  min-width: 0;
  flex: 1;

  @media (min-width: 541px) {
    flex: 0 0 220px;
  }
`

const ArtThumb = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  flex-shrink: 0;

  @media (min-width: 541px) {
    width: 48px;
    height: 48px;
  }
`

const ArtPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: #1e3a52;
  flex-shrink: 0;

  @media (min-width: 541px) {
    width: 48px;
    height: 48px;
  }
`

const TextBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const SongTitle = styled.span`
  color: #fff;
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 541px) {
    font-size: 0.9em;
  }
`

const SongWriter = styled.span`
  color: #9e9e9e;
  font-size: 0.75em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-shrink: 0;

  @media (min-width: 541px) {
    flex: 1;
    justify-content: center;
    gap: 1em;
  }
`

const IconButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3em;
  color: ${({ active }) => (active ? '#60c17d' : '#e0e0e0')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease, transform 0.1s ease;
  flex-shrink: 0;
  width: 28px;
  height: 28px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: #fff;
    transform: scale(1.08);
  }

  @media (min-width: 541px) {
    width: 32px;
    height: 32px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`

const PlayButton = styled(IconButton)`
  background-color: #fff;
  border-radius: 50%;
  color: #061725;
  width: 38px;
  height: 38px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #061725;
    background-color: #e0e0e0;
    transform: scale(1.08);
  }

  @media (min-width: 541px) {
    width: 44px;
    height: 44px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

const MobileShuffleButton = styled.div`
  display: flex;

  @media (min-width: 541px) {
    display: none;
  }
`

const ShuffleWrapper = styled.div`
  display: none;

  @media (min-width: 541px) {
    display: flex;
    align-items: center;
    flex: 0 0 220px;
    justify-content: flex-end;
  }
`

const ScrubberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 100%;
`

const TimeLabel = styled.span`
  color: #9e9e9e;
  font-size: 0.7em;
  flex-shrink: 0;
  width: 2.8em;
  text-align: center;
`

const Scrubber = styled.input.attrs({ type: 'range' })<{ progress: number }>`
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 4px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    #60c17d 0%,
    #60c17d ${({ progress }) => progress}%,
    #414141 ${({ progress }) => progress}%,
    #414141 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    border: none;
  }
`

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 21,12 5,21" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="5" height="18" rx="1" />
    <rect x="14" y="3" width="5" height="18" rx="1" />
  </svg>
)

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="3" width="4" height="18" rx="1" />
    <polygon points="20,3 8,12 20,21" />
  </svg>
)

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="4,3 16,12 4,21" />
    <rect x="16" y="3" width="4" height="18" rx="1" />
  </svg>
)

const ShuffleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)

export const BottomMediaPlayer: React.FC<Props> = ({
  songs,
  currentPlayingIndex,
  visible,
  isShuffle,
  onToggleShuffle,
  onNext,
  onPrev,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [displaySong, setDisplaySong] = useState<Song | null>(null)

  useEffect(() => {
    if (currentPlayingIndex !== null && songs[currentPlayingIndex]) {
      setDisplaySong(songs[currentPlayingIndex])
    }
  }, [currentPlayingIndex, songs])

  useEffect(() => {
    if (currentPlayingIndex === null) {
      setIsPlaying(false)
      return
    }

    const audioTags = document.getElementsByTagName('audio')
    const audio = audioTags[currentPlayingIndex]
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setDuration(isFinite(audio.duration) ? audio.duration : 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    setIsPlaying(!audio.paused)
    setCurrentTime(audio.currentTime)
    setDuration(isFinite(audio.duration) ? audio.duration : 0)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [currentPlayingIndex])

  const handlePlayPause = () => {
    if (currentPlayingIndex === null) return
    const audioTags = document.getElementsByTagName('audio')
    const audio = audioTags[currentPlayingIndex]
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentPlayingIndex === null) return
    const audioTags = document.getElementsByTagName('audio')
    const audio = audioTags[currentPlayingIndex]
    if (!audio) return
    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Bar visible={visible}>
      <MainRow>
        <SongInfo>
          {displaySong?.songArtUrl ? (
            <ArtThumb src={displaySong.songArtUrl} alt={`${displaySong.title} art`} />
          ) : (
            <ArtPlaceholder />
          )}
          <TextBlock>
            <SongTitle>{displaySong?.title ?? ''}</SongTitle>
            <SongWriter>{displaySong?.writer ?? ''}</SongWriter>
          </TextBlock>
        </SongInfo>

        <ButtonsRow>
          <MobileShuffleButton>
            <IconButton active={isShuffle} onClick={onToggleShuffle} aria-label="Toggle shuffle">
              <ShuffleIcon />
            </IconButton>
          </MobileShuffleButton>
          <IconButton onClick={onPrev} aria-label="Previous song">
            <PrevIcon />
          </IconButton>
          <PlayButton onClick={handlePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </PlayButton>
          <IconButton onClick={onNext} aria-label="Next song">
            <NextIcon />
          </IconButton>
        </ButtonsRow>

        <ShuffleWrapper>
          <IconButton active={isShuffle} onClick={onToggleShuffle} aria-label="Toggle shuffle">
            <ShuffleIcon />
          </IconButton>
        </ShuffleWrapper>
      </MainRow>

      <ScrubberRow>
        <TimeLabel>{formatTime(currentTime)}</TimeLabel>
        <Scrubber
          min={0}
          max={duration || 1}
          step={0.1}
          value={currentTime}
          progress={progress}
          onChange={handleSeek}
          aria-label="Seek"
        />
        <TimeLabel>{formatTime(duration)}</TimeLabel>
      </ScrubberRow>
    </Bar>
  )
}
