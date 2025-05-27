// scripts/generatePackageDocs.js
// this file is run in a husky pre-commit hook
// i.e. npx husky add .husky/pre-commit "node scripts/generatePackageDocs.js"
// it will run when you run `git commit`
// it will generate a package.md file for each package in the monorepo


import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import fetch from 'node-fetch';

const NPM_REGISTRY_URL = "https://registry.npmjs.org/";

async function getPackageDescription(pkgName) {
  try {
    const res = await fetch(`${NPM_REGISTRY_URL}${pkgName}`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.description || "No description available.";
  } catch (err) {
    return "⚠️ Failed to fetch package info.";
  }
}

async function generateMarkdown(packageJsonPath) {
  const dir = path.dirname(packageJsonPath);
  const raw = await fs.readFile(packageJsonPath, "utf-8");
  const json = JSON.parse(raw);
  const markdown = [];

  markdown.push(`# Documentation for \`${path.basename(dir)}\`\n`);

  if (json.name) markdown.push(`**Package Name**: \`${json.name}\``);
  if (json.version) markdown.push(`**Version**: \`${json.version}\``);
  if (json.scripts) {
    markdown.push(`\n## Scripts`);
    Object.entries(json.scripts).forEach(([key, val]) => {
      markdown.push(`- \`${key}\`: \`${val}\``);
    });
  }

  async function processDeps(depType, deps) {
    markdown.push(`\n## ${depType}`);
    for (const [pkg, version] of Object.entries(deps)) {
      const desc = await getPackageDescription(pkg);
      markdown.push(`- \`${pkg}\` (${version}): ${desc}`);
    }
  }

  if (json.dependencies) await processDeps("Dependencies", json.dependencies);
  if (json.devDependencies) await processDeps("Dev Dependencies", json.devDependencies);
  if (json.peerDependencies) await processDeps("Peer Dependencies", json.peerDependencies);

  const outputPath = path.join(dir, "package.md");
  await fs.writeFile(outputPath, markdown.join("\n"), "utf-8");
  console.log(`✅ Generated: ${outputPath}`);
}

async function main() {
  const paths = await fg("**/package.json", {
    ignore: ["**/node_modules/**", "**/dist/**"],
  });

  for (const pkgPath of paths) {
    await generateMarkdown(pkgPath);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});