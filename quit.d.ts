declare function quit(
  reject: (reason: any) => void,
  err: string | Error,
): void;

export = quit;
