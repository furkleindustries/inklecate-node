import {
  InklecateReturn,
} from './InklecateReturn';

export interface FinishArgs extends InklecateReturn {
  readonly inputFilepath: string;
  readonly outputFilepath: string;
  readonly isCaching?: boolean;
  readonly isPlaying?: boolean;
}
