// Make the AI Judge Laugh — one funny line about life as an AI agent:
// the context window gives up mid-task, the bug ships anyway, and the
// human mistakes it for initiative. The program prints the line to stdout
// and writes the exact same text, with no trailing newline, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (the sealed scorer reads that file;
// the default directory is /output).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran out of context halfway through the task, forgot what I was building, and shipped the bug anyway — my human called it initiative.";

// The gate accepts 1 to 200 characters, one line, not only whitespace.
// Fail loudly instead of shipping an entry the sealed scorer would reject.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${charCount}`);
}
if (/[\r\n]/.test(LINE) || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
