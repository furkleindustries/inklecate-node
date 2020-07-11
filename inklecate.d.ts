import {
  InklecateArgs,
} from './types/InklecateArgs';
import {
  InklecateReturn,
} from './types/InklecateReturn';

declare function inklecate(args: string): Promise<InklecateReturn>;
declare function inklecate(
  args: InklecateArgs,
): Promise<InklecateReturn>;

export = inklecate;
