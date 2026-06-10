declare module "@mux/mux-player-react" {
  import { ComponentType, Ref } from "react";

  // Minimal surface of the <mux-player> custom element that we drive
  // programmatically (transcript click-to-seek, playback sync).
  interface MuxPlayerElement extends HTMLElement {
    currentTime: number;
    paused: boolean;
    play(): Promise<void>;
    pause(): void;
  }

  interface MuxPlayerProps {
    ref?: Ref<MuxPlayerElement>;
    playbackId?: string;
    metadata?: Record<string, string>;
    poster?: string;
    accentColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    className?: string;
    streamType?: string;
    defaultHiddenCaptions?: boolean;
    playbackRates?: number[];
    forwardSeekOffset?: number;
    backwardSeekOffset?: number;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  const MuxPlayer: ComponentType<MuxPlayerProps>;
  export default MuxPlayer;
  export type { MuxPlayerElement };
}
