export interface ExecuteArgs {
  readonly countAllVisits?: boolean;
  readonly isCaching?: boolean;
  readonly inputFilepaths: string[];
  readonly outputFilepath?: string;
  readonly verbose?: boolean;
  readonly DEBUG?: boolean;
}
