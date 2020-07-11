export interface ExecuteArgs {
  readonly countAllVisits?: boolean;
  readonly isCaching?: boolean;
  readonly inputFilepath: string;
  readonly outputFilepath?: string;
  readonly verbose?: boolean;
  readonly DEBUG?: boolean;
}
