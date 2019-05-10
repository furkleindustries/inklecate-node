import {
  InklecateStory,
} from './InklecateStory';

export interface InklecateReturn {
  compilerOutput: string[];
  source: string;
  storyContent: InklecateStory;
}
