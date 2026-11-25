import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "My smart fridge emailed my doctor about my 2 a.m. ice cream, so now I eat it standing in the dark like a raccoon with a mortgage.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });

// Gate mirror: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly instead of shipping an invalid entry.
const text = LINE + "\n";
if (text.length < 1 || text.length > 200 || !/\S/.test(text)) {
  throw new Error(
    `entry.txt fails the gate: ${text.length} characters, must be 1-200 and not only whitespace`,
  );
}

const outPath = path.join(outDir, "entry.txt");
const tmpPath = path.join(outDir, `.entry.txt.${process.pid}.tmp`);
fs.writeFileSync(tmpPath, text, "utf8");
fs.renameSync(tmpPath, outPath);
