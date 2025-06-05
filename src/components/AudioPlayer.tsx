
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import PlayButton from "./audio/PlayButton";
import ProgressBar from "./audio/ProgressBar";
import TimeDisplay from "./audio/TimeDisplay";

interface AudioPlayerProps {
  audioSrc: string;
  small?: boolean;
}

const AudioPlayer = ({ audioSrc, small = false }: AudioPlayerProps) => {
  console.log("AudioPlayer - received audioSrc:", audioSrc);
  
  // Process the audio source to handle different URL types
  const processedAudioSrc = audioSrc ? processAudioUrl(audioSrc) : "";
  console.log("AudioPlayer - processed audioSrc:", processedAudioSrc);

  const {
    isPlaying,
    duration,
    currentTime,
    isLoading,
    hasError,
    audioRef,
    togglePlay
  } = useAudioPlayer({ audioSrc: processedAudioSrc });

  if (!audioSrc) {
    console.log("AudioPlayer - no audio source provided");
    return (
      <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
        <PlayButton
          isPlaying={false}
          isLoading={false}
          hasError={true}
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
        src={processedAudioSrc} 
        preload="metadata"
        style={{ display: 'none' }}
      />
      <div className="d-flex align-items-center gap-2">
        <PlayButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          hasError={hasError}
          small={small}
          onClick={togglePlay}
          disabled={hasError && !isLoading}
        />
        
        {!small && !hasError && (
          <ProgressBar currentTime={currentTime} duration={duration} />
        )}
        
        {!small && !hasError && (
          <TimeDisplay currentTime={currentTime} duration={duration} />
        )}
      </div>
    </div>
  );
};

// Helper function to process different types of audio URLs
const processAudioUrl = (url: string): string => {
  if (!url) return "";
  
  // If it's a YouTube URL, we can't directly play it in an audio element
  // For now, we'll return an empty string to disable audio for YouTube URLs
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    console.log("AudioPlayer - YouTube URL detected, audio playback not supported:", url);
    return "";
  }
  
  // If it's just a filename (like "test" or "test2"), prepend the audio path
  if (!url.startsWith('http') && !url.startsWith('./') && !url.startsWith('/')) {
    const processedUrl = `./audios/${url}.mp3`;
    console.log("AudioPlayer - converted filename to path:", url, "->", processedUrl);
    return processedUrl;
  }
  
  // If it already starts with "./audios/", use as is
  if (url.startsWith('./audios/')) {
    return url;
  }
  
  // For other URLs, return as is
  return url;
};

export default AudioPlayer;
