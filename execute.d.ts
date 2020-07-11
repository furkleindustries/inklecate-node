import {
  ExecuteArgs,
} from './types/ExecuteArgs';
import {
  InklecateReturn,
} from './types/InklecateReturn';

declare function execute(
  args: ExecuteArgs,
): Promise<InklecateReturn>;

export = execute;
