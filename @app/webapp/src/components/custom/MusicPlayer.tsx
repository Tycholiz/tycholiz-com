import { Text } from '../common'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'
import { Song } from '../../../@types/schema-types'

type Props = {
  data: Song
  pauseOthers: (e: SyntheticEvent) => void
}

const Container = styled.div`
  background-color: rgb(6, 23, 37);
  margin: 1em;
  border-radius: 6px;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
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

export const MusicPlayer: React.FC<Props> = ({ data, pauseOthers }) => {
  return (
    <Container>
      <InnerContainer>
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
        <Audio controls onPlay={(e) => pauseOthers(e)} src={data.asset.url}>
          Your browser does not support the
          <code>audio</code> element.
        </Audio>
      </InnerContainer>
    </Container>
  )
}
