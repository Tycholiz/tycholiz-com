import { Text } from '@components/common'
import styled from 'styled-components'
import { useState, SyntheticEvent } from 'react'
import { Song } from '@types'
import { useWindowSize } from 'src/hooks'
import { darkTheme } from '@styles/theme'
import { Modal, Heading } from '@components/common'

type Props = {
  data: Song
  songIndex: number
  isPlaying: boolean
  pauseOthers: (e: SyntheticEvent) => void
  onSongEnd: () => void
}

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

export const MusicPlayer: React.FC<Props> = ({
  data,
  songIndex,
  isPlaying,
  pauseOthers,
  onSongEnd,
}) => {
  const { width } = useWindowSize()
  const [showLyricsModal, setShowLyricsModal] = useState(false)

  const handleModalClose = () => {
    setShowLyricsModal(false)
  }
  return (
    <Container isPlaying={isPlaying}>
      {/* Desktop view song art */}
      {data.songArtUrl && width && width >= darkTheme.breakpointInteger.mobileMedium && (
        <SongArt src={data.songArtUrl} alt={`${data.title} song art`} height={100} />
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
            <SongArt src={data.songArtUrl} alt={`${data.title} song art`} height={75} />
          )}
        </TopContainer>
        {showLyricsModal && (
          <Modal onClose={handleModalClose}>
            <Heading level={2}>{data.title}</Heading>
            <hr />
            <LyricsBlock dangerouslySetInnerHTML={{ __html: data.lyrics }}></LyricsBlock>
          </Modal>
        )}
        <Audio controls onPlay={(e) => pauseOthers(e)} onEnded={onSongEnd} src={data.audioFileUrl}>
          Your browser does not support the
          <code>audio</code> element.
        </Audio>
        {data.lyrics && (
          <LyricsButton onClick={() => setShowLyricsModal(true)}>Lyrics</LyricsButton>
        )}
      </InnerContainer>
    </Container>
  )
}
