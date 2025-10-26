'use client';

import { useRef, useState } from "react";
import MediaPlayer, { MediaPlayerHandle } from "@/components/MediaPlayer";
import { Button } from "@/components/ui/button";

export default function DemoMediaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-2xl p-8">
        <MediaDemo />
      </div>
    </div>
  );
}

function MediaDemo() {
  const playerRef = useRef<MediaPlayerHandle>(null);
  const [time, setTime] = useState(0);

  return (
    <div className="space-y-4">
      <MediaPlayer
        ref={playerRef}
        src="/data/audio/09-1.mp3"
        type="audio"
        onTimeUpdate={setTime}
        onPlayStateChange={(playing) => console.log("Playing:", playing)}
      />

      <div className="flex gap-2 items-center">
        <Button onClick={() => playerRef.current?.play()}>Play</Button>
        <Button onClick={() => playerRef.current?.pause()}>Pause</Button>
        <Button onClick={() => playerRef.current?.seekTo(10)}>Seek 10s</Button>
        <span className="text-sm text-gray-500">Current: {time.toFixed(1)}s</span>
      </div>
    </div>
  );
}
