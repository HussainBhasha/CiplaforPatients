const fs = require("fs");
const path = require("path");

function check(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      check(full);
    } else if (f.endsWith(".tsx") || f.endsWith(".ts")) {
      const content = fs.readFileSync(full, "utf8");
      const regex = /import\s+.*?from\s+["']([^"']+)["']/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        let imp = match[1];
        if (imp.startsWith("@/")) {
          imp = imp.replace("@/", "./src/");
        }
        if (imp.startsWith(".")) {
          const target = path.resolve(path.dirname(full), imp);
          const exts = [".tsx", ".ts", ".js", ".jsx", ".png", ".jpeg", ".jpg", ".svg", ".css", ""];
          let found = false;
          let actualFile = "";
          for (const ext of exts) {
            if (fs.existsSync(target + ext)) {
              found = true;
              actualFile = target + ext;
              break;
            }
          }
          if (found) {
            const basename = path.basename(actualFile);
            const parentDir = path.dirname(actualFile);
            try {
              const actualFiles = fs.readdirSync(parentDir);
              if (!actualFiles.includes(basename)) {
                console.log(`CASE MISMATCH in ${full}: imported ${imp} but file is ${actualFiles.find(a => a.toLowerCase() === basename.toLowerCase())}`);
              }
            } catch(e) {}
          }
        }
      }
    }
  }
}
check("./src");
console.log("Check complete.");
