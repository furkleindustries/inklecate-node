export interface InklecateArgs {
  readonly countAllVisits?: boolean;
  readonly glob?: boolean;
  readonly keepRunning?: boolean;
  readonly inputFilepath?: string | string[];
  readonly inputFilepaths?: string | string[];
  readonly isPlaying?: boolean;
  readonly outputFilepath?: string;
}
