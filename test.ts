import { assertEquals, assertStringIncludes } from "@std/assert"
import { stripAnsiCode } from "@std/fmt/colors"
import { assertSnapshot } from "@std/testing/snapshot"
import "@std/encoding";

const td = new TextDecoder()

Deno.test("cmd -h", async () => {
  const { stdout } = await cmd("-h")
  assertStringIncludes(stdout, "Usage: deno run -A jsr:@kt3k/pack")
})

Deno.test("cmd -v", async () => {
  const { stdout } = await cmd("-v")
  assertStringIncludes(stdout, "@kt3k/pack@")
})

Deno.test("cmd example.ts -o example-out.js", async (t) => {
  // Cache dependencies of hello.ts
  await deno("cache", "example.ts")
  const { stderr } = await cmd("example.ts", "-o", "example-out.js")
  const strippedStderr = stripAnsiCode(stderr)
  assertEquals(
    strippedStderr,
    `Bundling the file(s).
input: example.ts
output: example-out.js
`,
  )
  await assertSnapshot(t, await Deno.readTextFile("example-out.js"))
})

Deno.test("cmd example.ts", async (t) => {
  const { stdout, stderr } = await cmd("example.ts")
  const strippedStderr = stripAnsiCode(stderr)
  assertEquals(
    strippedStderr,
    `Bundling the file(s).
input: example.ts
output: STDOUT
`,
  )
  await assertSnapshot(t, await stdout)
})

Deno.test("cmd example-im.ts (deno.json detection)", async (t) => {
  const { stdout, stderr } = await cmd("example-im.ts")
  const strippedStderr = stripAnsiCode(stderr)
  assertEquals(
    strippedStderr,
    `Bundling the file(s).
input: example-im.ts
output: STDOUT
`,
  )
  await assertSnapshot(t, await stdout)
})

async function deno(...args: string[]) {
  const cmd = new Deno.Command("deno", { args })
  const output = await cmd.output()
  return {
    stdout: td.decode(output.stdout),
    stderr: td.decode(output.stderr),
  }
}

function cmd(...args: string[]) {
  return deno("run", "-A", "main.ts", ...args)
}
