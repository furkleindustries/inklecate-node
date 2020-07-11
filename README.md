# inklecate

Install with `npm i -D inklecate`.

This package is a thin wrapper around [Inkle](https://inkle.com)'s [inklecate](https://github.com/inkle/ink/blob/master/inklecate/) tool for compiling and playing [Ink](https://github.com/inkle/ink) stories. It will not compile for client-side execution in a browser.

The inklecate binaries were written solely by Inkle and this package is released under the same license as Ink. That license is MIT at the time of this writing, but if it changes, the license of this package should be considered to follow it.

## How to use

The `inklecate` package can be used either as the `inklecate` export of the module and as a command-line app.

CLI options:

```
  inklecate <options> ...<ink file(s)>

  -o, --outputFile <outputFile>: Output file name.
  -c: Count all visits to knots, stitches and weave points, not just those referenced by TURNS_SINCE and read counts.
  --verbose: Verbose mode - print compilation timings.
  --DEBUG: Enable debug logging for inklecate-node.
```

The arguments for the module's `inklecate` function:

```js
function inklecate(args: {
  countAllVisits?: boolean;
  outputFilepath?: string;
  inputFilepath?: string;
}): Promise<InklecateReturn>;
```

The single positional argument is the input filepath.

If the output filepath argument is not provided, the file will be generated in a cache location and output as plain text JSON (in CLI mode) or a plain JavaScript object (as a node module).

## Other notes

* How do I use this with Webpack?
  Try [inklecate-loader](/furkleindustries/inklecate-loader/)
* How do I learn Ink?
  Start with the [interactive tutorial](https://furkleindustries/fictions/ink/ink_resources/ink-interactive-tutorial/). (The tutorial code is [here](https://github.com/furkleindustries/ink-interactive-tutorial), and makes use of this package.)
