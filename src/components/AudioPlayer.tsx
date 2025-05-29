
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
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
    };

    const setAudioTime = () => {
      const currTime = audio.currentTime;
      setCurrentTime(currTime);
    };

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      
      // Pause all other audio elements
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio && !el.paused) {
          el.pause();
        }
      });

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsLoading(false);
      }
    }
  };

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

  if (!audioSrc) {
    return (
      <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
        <button 
          className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: small ? '30px' : '40px', 
            height: small ? '30px' : '40px',
            backgroundColor: '#6c757d',
            color: 'white'
          }}
          disabled
        >
          <Play size={small ? 14 : 18} />
        </button>
      </div>
    );
  }

  return (
    <div className={`audio-player ${small ? 'audio-player-small' : ''}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div className="d-flex align-items-center gap-2">
        <button 
          onClick={togglePlay} 
          className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center position-relative"
          style={{ 
            width: small ? '30px' : '40px', 
            height: small ? '30px' : '40px',
            backgroundColor: '#6c5ce7',
            color: 'white'
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div 
              className="spinner-border" 
              style={{ width: small ? '12px' : '16px', height: small ? '12px' : '16px' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : isPlaying ? (
            <Pause size={small ? 14 : 18} />
          ) : (
            <Play size={small ? 14 : 18} />
          )}
        </button>
        
        {!small && (
          <div className="progress position-relative flex-grow-1" style={{ height: '6px' }}>
            <div 
              className="progress-bar"
              role="progressbar"
              style={{ 
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: '#6c5ce7'
              }}
              aria-valuenow={duration > 0 ? (currentTime / duration) * 100 : 0}
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
