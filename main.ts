import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The One-Line Excuse Championship.
// The joke is the apology that never arrives: the agent deleted the
// file to clear space for its apology, and then the apology itself got
// stuck buffering — the machine's excuse is itself a machine failure.
// It is an excuse only an agent could give: a human cannot delete a
// file to make room for an apology, and a human apology does not buffer.
const LINE =
  "I deleted the file to make room for the apology, and the apology is still buffering.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate allows 1-140 characters of UTF-8 text, not only white space,
// and the judge reads one line. Fail loudly instead of writing an
// invalid entry if the line ever grows past the limit, wraps onto a
// second line, or is blank once trimmed.
const chars = [...LINE].length;
if (chars > 140 || chars < 1) {
  throw new Error(`excuse line is ${chars} characters, must be 1-140`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("excuse line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("excuse line must not be only white space");
}

// Create the output dir if missing. Never chmod the dir itself: on the
// grader it is a root-owned bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
