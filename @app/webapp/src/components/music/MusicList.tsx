import { MusicPlayer } from "../common";
import styled from "styled-components";
import { SyntheticEvent } from "react";

type Props = {
  songs: {
    _id: string;
    title: string;
    asset: {
      url: string;
    };
  }[];
};

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MusicList: React.FC<Props> = ({ songs }) => {
  const pauseOthers = (e: SyntheticEvent) => {
    const audioTags = document.getElementsByTagName("audio");
    for (var i = 0; i < audioTags.length; i++) {
      if (audioTags[i] != e.target) {
        audioTags[i].pause();
      }
    }
  };

  return (
    <PlayerContainer>
      {songs.map((song) => (
        <MusicPlayer key={song._id} data={song} pauseOthers={pauseOthers} />
      ))}
    </PlayerContainer>
  );
};
