import {
  InklecateStory,
} from './InklecateStory';

export interface InklecateReturn {
  readonly compilerOutput: string[];
  readonly text: string;
  readonly storyContent: InklecateStory;
}
