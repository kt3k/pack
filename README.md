# @kt3k/pack v0.1.12

[![ci](https://github.com/kt3k/pack/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/pack/actions/workflows/ci.yml)

> Bundle Deno scripts into a single script

Note: This module is a thin wrapper of
[esbuild](https://github.com/evanw/esbuild) and
[esbuild-deno-loader](https://jsr.io/@luca/esbuild-deno-loader).

## Usage

```
deno run -A jsr:@kt3k/pack [-h|-v] [-o <filename>] <input-file>
```

### Options

- `-h` Show help message and exit.
- `-v` Show version number and exit.
- `-o <filename>` Specify the output file name. If not specified, the bundle is
  output to stdout.

## License

MIT
