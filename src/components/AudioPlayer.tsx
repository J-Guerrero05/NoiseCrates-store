
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import PlayButton from "./audio/PlayButton";
import ProgressBar from "./audio/ProgressBar";
import TimeDisplay from "./audio/TimeDisplay";

interface AudioPlayerProps {
  audioSrc: string;
  small?: boolean;
}

const AudioPlayer = ({ audioSrc, small = false }: AudioPlayerProps) => {
  const {
    isPlaying,
    duration,
    currentTime,
    isLoading,
    hasError,
    audioRef,
    togglePlay
  } = useAudioPlayer({ audioSrc });

  if (!audioSrc) {
    return (
      <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
        <PlayButton
          isPlaying={false}
          isLoading={false}
          hasError={false}
          small={small}
          onClick={() => {}}
          disabled={true}
        />
      </div>
    );
  }

  return (
    <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
      <audio 
        ref={audioRef} 
        src={audioSrc} 
        preload="metadata"
        crossOrigin="anonymous"
      />
      <div className="d-flex align-items-center gap-2">
        <PlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          hasError={hasError}
          small={small}
          onClick={togglePlay}
        />
        
        {!small && (
          <ProgressBar currentTime={currentTime} duration={duration} />
        )}
        
        {!small && (
          <TimeDisplay currentTime={currentTime} duration={duration} />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
