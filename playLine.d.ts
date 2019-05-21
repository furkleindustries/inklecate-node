declare function playLine(
  message: string,
  stdin: NodeJS.ReadStream,
): Promise<void>;

export = playLine;
