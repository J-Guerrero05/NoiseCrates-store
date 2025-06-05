
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
    if (!audio || !audioSrc) {
      console.log("useAudioPlayer - no audio element or source:", { audio: !!audio, audioSrc });
      setHasError(!audioSrc);
      return;
    }

    console.log("useAudioPlayer - initializing with source:", audioSrc);
    setHasError(false);
    setIsLoading(true);
    setIsPlaying(false);

    const setAudioData = () => {
      console.log("useAudioPlayer - audio loaded, duration:", audio.duration);
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
      setIsLoading(false);
      setHasError(false);
    };

    const setAudioTime = () => {
      const currTime = audio.currentTime || 0;
      setCurrentTime(currTime);
    };

    const handleLoadStart = () => {
      console.log("useAudioPlayer - audio load started");
      setIsLoading(true);
      setHasError(false);
    };
    
    const handleCanPlay = () => {
      console.log("useAudioPlayer - audio can play");
      setIsLoading(false);
      setHasError(false);
    };
    
    const handleEnded = () => {
      console.log("useAudioPlayer - audio ended");
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error("useAudioPlayer - audio loading error:", e);
      console.error("useAudioPlayer - audio src:", audioSrc);
      console.error("useAudioPlayer - audio error details:", (e.target as HTMLAudioElement)?.error);
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
      console.log("useAudioPlayer - audio metadata loaded");
      setIsLoading(false);
    };

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    // Clean up any previous event listeners
    audio.removeEventListener("loadstart", handleLoadStart);
    audio.removeEventListener("canplay", handleCanPlay);
    audio.removeEventListener("loadeddata", setAudioData);
    audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    audio.removeEventListener("timeupdate", setAudioTime);
    audio.removeEventListener("ended", handleEnded);
    audio.removeEventListener("error", handleError);
    audio.removeEventListener("pause", handlePause);
    audio.removeEventListener("play", handlePlay);

    // Set up audio element
    audio.preload = "metadata";

    // Add event listeners
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    // Load the audio
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
      audio.removeEventListener("play", handlePlay);
    };
  }, [audioSrc]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc || hasError) {
      console.log("useAudioPlayer - cannot play: no audio element, source, or has error");
      return;
    }

    if (isPlaying) {
      console.log("useAudioPlayer - pausing audio");
      audio.pause();
    } else {
      console.log("useAudioPlayer - attempting to play audio");
      setIsLoading(true);
      
      // Stop all other audio players first
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== audio && !el.paused) {
          el.pause();
        }
      });

      try {
        await audio.play();
        setIsLoading(false);
      } catch (error) {
        console.error("useAudioPlayer - error playing audio:", error);
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
