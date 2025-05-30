
import { useState, useRef, useEffect } from "react";

interface UseAudioPlayerOptions {
  audioSrc: string;
}

export const useAudioPlayer = ({ audioSrc }: UseAudioPlayerOptions) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    console.log("Loading audio:", audioSrc);
    setHasError(false);
    setIsLoading(true);

    const setAudioData = () => {
      console.log("Audio loaded, duration:", audio.duration);
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      setIsLoading(false);
      setHasError(false);
    };

    const setAudioTime = () => {
      const currTime = audio.currentTime;
      setCurrentTime(currTime);
    };

    const handleLoadStart = () => {
      console.log("Audio load started");
      setIsLoading(true);
      setHasError(false);
    };
    
    const handleCanPlay = () => {
      console.log("Audio can play");
      setIsLoading(false);
      setHasError(false);
    };
    
    const handleEnded = () => {
      console.log("Audio ended");
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error("Audio loading error:", e);
      console.error("Audio src:", audioSrc);
      setIsLoading(false);
      setHasError(true);
    };

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded");
      setIsLoading(false);
    };

    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);

    audio.load();

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioSrc]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc || hasError) {
      console.log("Cannot play: no audio element, source, or has error");
      return;
    }

    if (isPlaying) {
      console.log("Pausing audio");
      audio.pause();
      setIsPlaying(false);
    } else {
      console.log("Attempting to play audio");
      setIsLoading(true);
      
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio && !el.paused) {
          el.pause();
        }
      });

      try {
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        setHasError(true);
      }
    }
  };

  return {
    isPlaying,
    duration,
    currentTime,
    isLoading,
    hasError,
    audioRef,
    togglePlay
  };
};
