import {
  InkListDefinition,
} from './InkListDefinition';
import {
  InkNode,
} from './InkNode';

export interface InklecateStory {
  inkVersion: number;
  listDefs: InkListDefinition[];
  root: InkNode[];
}
