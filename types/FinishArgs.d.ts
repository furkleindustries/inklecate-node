export interface FinishArgs {
  compilerOutput: string[];
  isCaching?: boolean;
  isPlaying?: boolean;
  inputFilepath: string;
  outputFilepath: string;
}
