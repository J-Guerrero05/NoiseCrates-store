
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  audioSrc: string;
  small?: boolean;
}

const AudioPlayer = ({ audioSrc, small = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = audio.currentTime;
      setCurrentTime(currTime);
    };

    // Events for audio element
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Pause all other audio elements
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio) {
          el.pause();
          // This triggers the 'pause' event, which will update the UI for other players
        }
      });
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update UI when audio is externally paused (e.g., when another audio starts playing)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => setIsPlaying(false);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
      <audio ref={audioRef} src={audioSrc} />
      <div className="d-flex align-items-center gap-2">
        <button 
          onClick={togglePlay} 
          className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: small ? '30px' : '40px', 
            height: small ? '30px' : '40px',
            backgroundColor: '#6c5ce7',
            color: 'white'
          }}
        >
          {isPlaying ? <Pause size={small ? 14 : 18} /> : <Play size={small ? 14 : 18} />}
        </button>
        
        {!small && (
          <div className="progress position-relative flex-grow-1" style={{ height: '6px' }}>
            <div 
              className="progress-bar"
              role="progressbar"
              style={{ 
                width: `${(currentTime / duration) * 100}%`,
                backgroundColor: '#6c5ce7'
              }}
              aria-valuenow={(currentTime / duration) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        )}
        
        {!small && (
          <div className="time ms-2 small text-muted">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
