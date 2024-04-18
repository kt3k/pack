import { assertEquals, assertStringIncludes } from "@std/assert";
import { stripAnsiCode } from "@std/fmt/colors";
import { assertSnapshot } from "@std/testing/snapshot";

const td = new TextDecoder();

Deno.test("cmd -h", async () => {
  const { stdout } = await cmd("-h");
  assertStringIncludes(stdout, "Usage: deno run -A jsr:@kt3k/pack");
});

Deno.test("cmd -v", async () => {
  const { stdout } = await cmd("-v");
  assertStringIncludes(stdout, "@kt3k/pack@");
});

Deno.test("cmd example.ts -o example-out.js", async (t) => {
  const { stderr } = await cmd("example.ts", "-o", "example-out.js");
  const strippedStderr = stripAnsiCode(stderr);
  assertEquals(
    strippedStderr,
    `Bundling the file(s).
input: example.ts
output: example-out.js
`,
  );
  await assertSnapshot(t, await Deno.readTextFile("example-out.js"));
});

Deno.test("cmd example.ts", async (t) => {
  const { stdout, stderr } = await cmd("example.ts");
  const strippedStderr = stripAnsiCode(stderr);
  assertEquals(
    strippedStderr,
    `Bundling the file(s).
input: example.ts
output: STDOUT
`,
  );
  await assertSnapshot(t, await stdout);
});

async function cmd(...args: string[]) {
  const cmd = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      "main.ts",
      ...args,
    ],
  });
  const output = await cmd.output();
  return {
    stdout: td.decode(output.stdout),
    stderr: td.decode(output.stderr),
  };
}