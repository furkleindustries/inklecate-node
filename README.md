# inklecate

Install with `npm i -D inklecate-loader`.

This package is a thin wrapper around [Inkle](https://inkle.com)'s [inklecate](https://github.com/inkle/ink/blob/master/inklecate/) tool for compiling and playing [Ink](https://github.com/inkle/ink) stories. It will not compile for client-side execution in a browser.

The inklecate binaries were written solely by Inkle and this package is released under the same license as Ink. That license is MIT at the time of this writing, but if it changes, the license of this package should be considered to follow it.

## How to use

The `inklecate` package can be used either as the `inklecate` export of the module and as a command-line app.

CLI options:

```
  inklecate <options> ...<ink file(s)>

  -o, --outputFile <outputFile>: Output file name.
  -c: Count all visits to knots, stitches and weave points, not just those referenced by TURNS_SINCE and read counts.
  -p: Play mode.
  -v: Verbose mode - print compilation timings.
  -k: Keep inklecate running in play mode even after story is complete.
  --glob: Treat input filepaths as globs. Glob matching uses minimatch.
  --DEBUG: Enable debug logging for inklecate-node.
```

The arguments for the module's `inklecate` function:

```javascript
function inklecate(args: {
  countAllVisits?: boolean;
  glob?: boolean;
  isPlaying?: boolean;
  outputFilepath?: string;
  keepRunning?: boolean;

  /* Both of these are used identically and you may use whichever you please. */
  inputFilepath?: string | string[];
  inputFilepaths?: string | string[];
}): Promise<InklecateReturn | InklecateReturn[]>;
```

The single positional argument is the input filepath. This argument is variadic and you may include as many input filepaths as you like, though this disallows choosing an output filepath.

If the output filepath argument is not provided, the file will be generated in a cache location and output as plain text JSON (in CLI mode) or a plain JavaScript object (as a node module).

## Other notes

* How do I use this with Webpack?
  Try [inklecate-loader](/furkleindustries/inklecate-loader/)
* How do I learn Ink?
  Start with the [interactive tutorial](https://furkleindustries/fictions/ink/ink_resources/ink-interactive-tutorial/). (The tutorial code is [here](https://github.com/furkleindustries/ink-interactive-tutorial), and makes use of this package.)
* How do I use compile Ink source into JSON in the browser?
  A solution for this is currently being developed at [inklecate-wasm](https://github.com/furkleindustries/inklecate-wasm) but is incomplete.
