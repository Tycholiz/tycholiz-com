import { Text } from '@components/common'
import styled from 'styled-components'
import { useState, useRef, useEffect, SyntheticEvent } from 'react'
import { Song } from '@types'
import { useWindowSize } from 'src/hooks'
import { darkTheme } from '@styles/theme'
import { Modal, Heading } from '@components/common'
import { sanityImageUrl } from '@utils'

type Props = {
  data: Song
  songIndex: number
  isPlaying: boolean
  preload: 'none' | 'metadata'
  pauseOthers: (e: SyntheticEvent) => void
  onSongEnd: () => void
}

const MAX_AUTO_RETRIES = 2
const RETRY_BASE_DELAY_MS = 600

const Container = styled.div<{ isPlaying: boolean }>`
  display: flex;
  background-color: rgb(6, 23, 37);
  margin-top: 0.9em;
  border-radius: 6px;
  padding: 1em;
  border: thick double
    ${({ isPlaying, theme }) => (isPlaying ? '#8ee4a8' : theme.color.grayscale[7])};
  border-radius: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    padding: 1.5em;
  }
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileLarge}) {
    padding: 2em;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    padding-left: 1em;
  }
`

const TopContainer = styled.div`
  display: flex;
  padding-bottom: 1em;
  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    padding-bottom: 0;
  }
`

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1em;

  @media (min-width: ${({ theme }) => theme.breakpoint.mobileMedium}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MetadataBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Audio = styled.audio`
  width: 100%;
`

const SongArt = styled.img`
  border-radius: 6px;
`

const LyricsButton = styled.a`
  cursor: pointer;
  margin-left: auto;
  margin-top: 1em;
  color: ${({ theme }) => theme.color.grayscale[3]};
`

const LyricsBlock = styled.div`
  margin-top: 2em;
`

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75em;
  margin-top: 0.6em;
  font-size: 0.85em;
  color: #ff9c9c;
`

const RetryButton = styled.button`
  padding: 0.35em 0.9em;
  border: 1px solid #ff9c9c;
  border-radius: 14px;
  background: none;
  color: #ff9c9c;
  font-size: inherit;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 156, 156, 0.15);
  }
`

export const MusicPlayer: React.FC<Props> = ({
  data,
  songIndex,
  isPlaying,
  preload,
  pauseOthers,
  onSongEnd,
}) => {
  const { width } = useWindowSize()
  const [showLyricsModal, setShowLyricsModal] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const retryCountRef = useRef(0)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current)
    },
    [],
  )

  const reload = (resumePlayback: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    audio.load()
    if (resumePlayback) {
      // A rejected play() (autoplay policy, user paused meanwhile) isn't a load
      // failure, so swallow it rather than surfacing an unhandled rejection.
      audio.play().catch(() => {})
    }
  }

  /**
   * The element only errors after it has attempted a fetch, so this is always a
   * real network/decode failure. These are usually transient, so retry a couple
   * of times with backoff before giving the user a manual retry.
   */
  const handleError = () => {
    if (retryCountRef.current >= MAX_AUTO_RETRIES) {
      setHasFailed(true)
      return
    }
    const delay = RETRY_BASE_DELAY_MS * 2 ** retryCountRef.current
    retryCountRef.current += 1
    retryTimeoutRef.current = setTimeout(() => reload(isPlaying), delay)
  }

  const handleLoadedMetadata = () => {
    retryCountRef.current = 0
    setHasFailed(false)
  }

  const handleManualRetry = () => {
    retryCountRef.current = 0
    setHasFailed(false)
    reload(true)
  }

  const handleModalClose = () => {
    setShowLyricsModal(false)
  }
  return (
    <Container isPlaying={isPlaying}>
      {/* Desktop view song art */}
      {data.songArtUrl && width && width >= darkTheme.breakpointInteger.mobileMedium && (
        <SongArt
          src={sanityImageUrl(data.songArtUrl, { height: 100 })}
          alt={`${data.title} song art`}
          height={100}
        />
      )}
      <InnerContainer>
        <TopContainer>
          <MetadataContainer>
            <MetadataBox>
              <Text bold={true}>{data.title}</Text>
              <Text>{data.writer}</Text>
            </MetadataBox>
            <MetadataBox>
              <Text>Written: {data.yearWritten}</Text>
              <Text>Released: {data.yearRecorded}</Text>
            </MetadataBox>
          </MetadataContainer>
          {/* Mobile view song art */}
          {data.songArtUrl && width && width < darkTheme.breakpointInteger.mobileMedium && (
            <SongArt
              src={sanityImageUrl(data.songArtUrl, { height: 75 })}
              alt={`${data.title} song art`}
              height={75}
            />
          )}
        </TopContainer>
        {showLyricsModal && (
          <Modal onClose={handleModalClose}>
            <Heading level={2}>{data.title}</Heading>
            <hr />
            <LyricsBlock dangerouslySetInnerHTML={{ __html: data.lyrics }}></LyricsBlock>
          </Modal>
        )}
        <Audio
          ref={audioRef}
          controls
          preload={preload}
          onPlay={(e) => pauseOthers(e)}
          onEnded={onSongEnd}
          onError={handleError}
          onLoadedMetadata={handleLoadedMetadata}
          src={data.audioFileUrl}
        >
          Your browser does not support the
          <code>audio</code> element.
        </Audio>
        {hasFailed && (
          <StatusBar role="alert">
            <span>Couldn&apos;t load this track.</span>
            <RetryButton onClick={handleManualRetry}>Retry</RetryButton>
          </StatusBar>
        )}
        {data.lyrics && (
          <LyricsButton onClick={() => setShowLyricsModal(true)}>Lyrics</LyricsButton>
        )}
      </InnerContainer>
    </Container>
  )
}
