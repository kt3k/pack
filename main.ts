import * as esbuild from "esbuild"
import { parseArgs } from "@std/cli/parse-args"
import { denoPlugins } from "@luca/esbuild-deno-loader"
import * as colors from "@std/fmt/colors"
import { join } from "@std/path/join"

async function main() {
  const options = parseArgs(Deno.args, {
    string: ["o"],
    boolean: ["v", "h"],
  })

  if (options.v) {
    console.log("@kt3k/pack@0.1.10")
    Deno.exit()
  }

  if (options.h) {
    console.log(helpMessage())
    Deno.exit()
  }

  if (options._.length === 0) {
    console.error("No input file specified.")
    console.log()
    console.log(usage())
    console.log()
    Deno.exit(1)
  }

  const inputFiles = options._.map((e) => colors.cyan(String(e))).join(", ")
  const outputFile = colors.magenta(options.o ?? "STDOUT")
  console.error(
    `Bundling the file(s).\ninput: ${inputFiles}\noutput: ${outputFile}`,
  )

  const denoPluginOpts = {
    configPath: await getDenoJsonPath(),
  }

  await esbuild.build({
    plugins: [...denoPlugins(denoPluginOpts)],
    entryPoints: options._.map(String),
    outfile: options.o,
    bundle: true,
    format: "esm",
  })
}

function usage() {
  return "Usage: deno run -A jsr:@kt3k/pack [-h|-v] [-o <filename>] <input-file>"
}

function helpMessage() {
  return `${usage()}

Options:
  -h             Show help message and exit.
  -v             Show version number and exit.
  -o <filename>  Specify the output file name.
                 If not specified, the bundle is output to stdout.`
}

async function getDenoJsonPath() {
  try {
    await Deno.stat("deno.json")
    return join(Deno.cwd(), "deno.json")
  } catch {
    // pass
  }

  try {
    await Deno.stat("deno.jsonc")
    return join(Deno.cwd(), "deno.jsonc")
  } catch {
    // pass
  }
}

await main()
