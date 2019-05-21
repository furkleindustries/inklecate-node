export interface ExecuteArgs {
  isCaching?: boolean;
  isPlaying?: boolean;
  keepRunning?: boolean;
  inputFilepaths: string[];
  outputFilepath?: string;
  verbose?: boolean;
  DEBUG?: boolean;
}
