# @kt3k/pack v0.1.13

[![ci](https://github.com/kt3k/pack/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/pack/actions/workflows/ci.yml)

> Bundle Deno scripts into a single script

Note: This module is a thin wrapper of
[esbuild](https://github.com/evanw/esbuild) and
[esbuild-deno-loader](https://jsr.io/@luca/esbuild-deno-loader).

## Usage

```
deno -A jsr:@kt3k/pack [-h|-v] [-o <filename>] [--external <module>] [--format cjs|esm] <input-file>
```

### Options

- `-h` Show help message and exit.
- `-v` Show version number and exit.
- `-o <filename>` Specify the output file name. If not specified, the bundle is
  output to stdout.
- `--external <module>` Specify the external modules. The external modules are
  not bundled, but are left as import statements in the output. You can specify
  multiple --external options like `--external foo --external bar`.
- `--fromat esm|cjs` Specify the output format. Default is esm.

## License

MIT
