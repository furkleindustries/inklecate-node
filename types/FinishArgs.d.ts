import {
  InklecateReturn,
} from './InklecateReturn';

export interface FinishArgs extends InklecateReturn {
  readonly compilerOutput: string[];
  readonly inputFilepath: string;
  readonly outputFilepath: string;
  readonly isCaching?: boolean;
  readonly DEBUG?: boolean;  
}
