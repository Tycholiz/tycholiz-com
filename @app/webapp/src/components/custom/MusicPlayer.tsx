import { Text } from '@components/common'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'
import { Song } from '@types'
import { useWindowSize } from 'src/hooks'
import { darkTheme } from '@styles/theme'

type Props = {
  data: Song
  pauseOthers: (e: SyntheticEvent) => void
}

const Container = styled.div`
  display: flex;
  background-color: rgb(6, 23, 37);
  margin: 1em;
  border-radius: 6px;
  padding: 1em;
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

export const MusicPlayer: React.FC<Props> = ({ data, pauseOthers }) => {
  const { width } = useWindowSize()
  return (
    <Container>
      {data.songArtUrl && width && width >= darkTheme.breakpointInteger.mobileMedium && (
        <SongArt src={data.songArtUrl} alt="" height={100} />
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
          {data.songArtUrl && width && width < darkTheme.breakpointInteger.mobileMedium && (
            <SongArt src={data.songArtUrl} alt={`${data.title} song art`} height={75} />
          )}
        </TopContainer>
        <Audio controls onPlay={(e) => pauseOthers(e)} src={data.audioFileUrl}>
          Your browser does not support the
          <code>audio</code> element.
        </Audio>
      </InnerContainer>
    </Container>
  )
}
