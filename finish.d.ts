import {
  InklecateReturn,
} from './types/InklecateReturn';
import {
  FinishArgs,
} from './types/FinishArgs';

declare function finish(
  args: FinishArgs,
): Promise<InklecateReturn>;

export = finish;
