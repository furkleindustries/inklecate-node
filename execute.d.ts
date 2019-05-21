import {
  ExecuteArgs,
} from './types/ExecuteArgs';
import {
  InklecateReturn,
} from './types/InklecateReturn';

declare function execute(
  args: ExecuteArgs,
): Promise<InklecateReturn | InklecateReturn[]>;

export = execute;
