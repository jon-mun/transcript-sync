"use client";

import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
} from "react";

export interface MediaPlayerHandle {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

export interface MediaPlayerProps {
  src: string;
  type?: "audio" | "video";
  autoPlay?: boolean;
  onTimeUpdate?: (time: number) => void;
  onDurationChange?: (duration: number) => void;
  onPlayStateChange?: (playing: boolean) => void;
  poster?: string;
  className?: string;
}

const MediaPlayer = forwardRef<MediaPlayerHandle, MediaPlayerProps>(
  (
    {
      src,
      type = "audio",
      autoPlay = false,
      onTimeUpdate,
      onDurationChange,
      onPlayStateChange,
      poster,
      className = "",
    },
    ref,
  ) => {
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(autoPlay);

    useImperativeHandle(ref, () => ({
      play() {
        mediaRef.current?.play();
      },
      pause() {
        mediaRef.current?.pause();
      },
      seekTo(time: number) {
        if (mediaRef.current) mediaRef.current.currentTime = time;
      },
      getCurrentTime() {
        return mediaRef.current?.currentTime || 0;
      },
      getDuration() {
        return mediaRef.current?.duration || 0;
      },
    }));

    useEffect(() => {
      const el = mediaRef.current;
      if (!el) return;

      const handleTime = () => onTimeUpdate?.(el.currentTime);
      const handleDuration = () => onDurationChange?.(el.duration);
      const handlePlay = () => {
        setPlaying(true);
        onPlayStateChange?.(true);
      };
      const handlePause = () => {
        setPlaying(false);
        onPlayStateChange?.(false);
      };

      el.addEventListener("timeupdate", handleTime);
      el.addEventListener("loadedmetadata", handleDuration);
      el.addEventListener("play", handlePlay);
      el.addEventListener("pause", handlePause);

      return () => {
        el.removeEventListener("timeupdate", handleTime);
        el.removeEventListener("loadedmetadata", handleDuration);
        el.removeEventListener("play", handlePlay);
        el.removeEventListener("pause", handlePause);
      };
    }, [onTimeUpdate, onDurationChange, onPlayStateChange]);

    const commonProps = {
      src,
      controls: true,
      autoPlay,
      className: `w-full rounded-xl shadow ${className}`,
    };

    return type === "video" ? (
      <video ref={mediaRef as React.RefObject<HTMLVideoElement>} {...commonProps} poster={poster} />
    ) : (
      <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} {...commonProps} />
    );
  },
);

MediaPlayer.displayName = "MediaPlayer";
export default MediaPlayer;

