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
        src={audioSrc} 
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

<<<<<<< Updated upstream
export default AudioPlayer;
=======
// Helper function to process different types of audio URLs
const processAudioUrl = (url: string): string => {
  if (!url) return "";
  
  console.log("processAudioUrl - input:", url);
  
  // If it's a YouTube URL, we can't directly play it in an audio element
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    console.log("AudioPlayer - YouTube URL detected, audio playback not supported:", url);
    return "";
  }
  
  // If it's already a complete HTTP/HTTPS URL, use as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log("processAudioUrl - complete URL:", url);
    return url;
  }
  
  // If it starts with "/" (absolute path from public folder)
  if (url.startsWith('/')) {
    const processedUrl = url;
    console.log("processAudioUrl - absolute path:", processedUrl);
    return processedUrl;
  }
  
  // If it's just a filename without extension, assume it's in the audios folder
  if (!url.includes('/') && !url.includes('.')) {
    const processedUrl = `/audios/${url}.mp3`;
    console.log("processAudioUrl - filename to preview path:", url, "->", processedUrl);
    return processedUrl;
  }
  
  // If it's a relative path starting with "./"
  if (url.startsWith('./')) {
    // Convert "./audios/file.mp3" to "/audios/file.mp3" (remove the dot)
    if (url.startsWith('./audios/')) {
      const processedUrl = url.substring(1); // Remove the "."
      console.log("processAudioUrl - converted old path:", url, "->", processedUrl);
      return processedUrl;
    }
    // Remove the "./" and treat as absolute path
    const processedUrl = url.substring(2);
    console.log("processAudioUrl - relative to absolute:", url, "->", processedUrl);
    return processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`;
  }
  
  // If none of the above, treat as filename and put in audios folder
  const processedUrl = `/audios/${url}`;
  console.log("processAudioUrl - default to audios folder:", url, "->", processedUrl);
  return processedUrl;
};

export default AudioPlayer;
>>>>>>> Stashed changes
