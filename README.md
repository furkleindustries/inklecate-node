# inklecate

This package is a thin wrapper around [Inkle](https://inkle.com)'s [inklecate](https://github.com/inkle/ink/blob/master/inklecate/) tool for compiling and playing [Ink](https://github.com/inkle/ink) stories. It will not compile for browsers and it will not work in browsers unless someone finds a reasonable way to compile one of the inklecate binaries into [WebAssembly](https://webassembly.org).

The inklecate binaries and CLI text were written solely by Inkle and this package is released under the same license as Ink. That license is MIT at the time of this writing but if it changes, the license of this package should be considered to follow it.

## How to use

The `inklecate` package can be used either as the `inklecate` export of the module and as a command-line app. Both use the same arguments as Ink's inklecate CLI. When using the `inklecate` export, pass the arguments in a single array. The command options are reproduced below.

```
  inklecate2 <options> <ink file>

  -o <outputFile>: Output file name.
  -c: Count all visits to knots, stitches and weave points, not just those referenced by TURNS_SINCE and read counts.
  -p: Play mode.
  -v: Verbose mode - print compilation timings.
  -k: Keep inklecate running in play mode even after story is complete.
```

## Other notes

* How do I use this with Webpack?
  Try [inklecate-webpack-loader](/furkleindustries/inklecate-webpack-loader/)
* How do I learn Ink?
  Start with the [interactive tutorial](https://furkleindustries/fictions/ink/ink_resources/ink-interactive-tutorial/). (The tutorial code is [here](/ink-interactive-tutorial).)
