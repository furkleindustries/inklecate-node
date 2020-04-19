export interface InklecateArgs {
  readonly countAllVisits?: boolean;
  readonly glob?: boolean;
  readonly inputFilepath?: string | string[];
  readonly inputFilepaths?: string | string[];
  readonly outputFilepath?: string;
  readonly wasm?: boolean;
}
