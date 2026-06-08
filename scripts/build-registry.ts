/**
 * Script to generate registry.json from icons directory
 *
 * This ensures the shadcn registry stays in sync with the icon files.
 * Run with: `npm run registry:build`
 */

import * as fs from "fs";
import * as path from "path";

const ICONS_DIR = path.join(__dirname, "..", "icons");
const REGISTRY_PATH = path.join(__dirname, "..", "registry.json");

// Files to exclude from registry (not actual icons)
const EXCLUDED_FILES = ["index.ts", "types.ts"];

interface RegistryItem {
  name: string;
  type: "registry:ui";
  registryDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
  files: { path: string; type: "registry:ui" }[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

/**
 * Get all icon files from the icons directory
 */
function getIconFiles(): string[] {
  try {
    const files = fs.readdirSync(ICONS_DIR);

    return files.filter((file) => {
      // Only include .tsx files
      if (!file.endsWith(".tsx")) return false;
      // Exclude non-icon files
      if (EXCLUDED_FILES.includes(file)) return false;
      return true;
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`❌ Error: Icons directory not found at "${ICONS_DIR}"`);
      console.error(
        "   Make sure you're running this script from the project root.",
      );
    } else if ((error as NodeJS.ErrnoException).code === "EACCES") {
      console.error(`❌ Error: Permission denied reading "${ICONS_DIR}"`);
    } else {
      console.error(`❌ Error reading icons directory: ${error}`);
    }
    process.exit(1);
  }
}

/**
 * Convert filename to registry name (remove .tsx extension)
 */
function fileToRegistryName(filename: string): string {
  return filename.replace(".tsx", "");
}

/**
 * Generate a registry item for an icon file
 */
function generateRegistryItem(filename: string): RegistryItem {
  const name = fileToRegistryName(filename);

  return {
    name,
    type: "registry:ui",
    registryDependencies: [],
    dependencies: ["motion"],
    devDependencies: [],
    files: [
      {
        path: `icons/${filename}`,
        type: "registry:ui",
      },
      {
        path: "utils/base-icon.tsx",
        type: "registry:ui",
      },
    ],
  };
}

/**
 * Extract icon names from icons/index.ts ICON_LIST
 */
function getIconListNames(): string[] {
  const indexPath = path.join(ICONS_DIR, "index.ts");

  try {
    const content = fs.readFileSync(indexPath, "utf-8");

      // Match all title: "xxx" or name: "xxx" patterns in ICON_LIST
      const namePattern = /(?:title|name):\s*["']([^"']+)["']/g;
      const names: string[] = [];
      let match;

      while ((match = namePattern.exec(content)) !== null) {
        const name = match[1];
        // Accept all entries from ICON_LIST (hyphenated or not)
        names.push(name);
      }

      return [...new Set(names)];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(`❌ Error: icons/index.ts not found at "${indexPath}"`);
    } else if ((error as NodeJS.ErrnoException).code === "EACCES") {
      console.error(`❌ Error: Permission denied reading "${indexPath}"`);
    } else {
      console.error(`❌ Error reading icons/index.ts: ${error}`);
    }
    process.exit(1);
  }
}

/**
 * Validate that all icon files are registered in ICON_LIST
 */
function validateIconList(iconFiles: string[]): void {
  const iconListNames = new Set(getIconListNames());
  const fileNames = iconFiles.map(fileToRegistryName);

  // Accept both raw file names and their non-`a-` variants when comparing
  const normalize = (n: string) => (n.startsWith("a-") ? n.slice(2) : n);
  const fileNamesSet = new Set(fileNames);

  // Find icons in files but not in ICON_LIST
  const missingFromList: string[] = [];
  for (const fileName of fileNames) {
    const alt = normalize(fileName);
    if (!(iconListNames.has(fileName) || iconListNames.has(alt))) {
      missingFromList.push(fileName);
    }
  }

  // Find icons in ICON_LIST but not in files
  const missingFromFiles: string[] = [];
  for (const listName of iconListNames) {
    const alt = listName.startsWith("a-") ? listName : `a-${listName}`;
    if (!(fileNamesSet.has(listName) || fileNamesSet.has(alt))) {
      missingFromFiles.push(listName);
    }
  }

  // Report warnings
  if (missingFromList.length > 0) {
    console.log("");
    console.log(
      `⚠️  Warning: ${missingFromList.length} icon(s) not in ICON_LIST (won't show on website):`,
    );
    missingFromList.forEach((name) => console.log(`   - ${name}`));
    console.log("   → Add them to icons/index.ts to display on the website");
  }

  if (missingFromFiles.length > 0) {
    console.log("");
    console.log(
      `⚠️  Warning: ${missingFromFiles.length} ICON_LIST entry(s) without matching file:`,
    );
    missingFromFiles.forEach((name) => console.log(`   - ${name}`));
    console.log("   → Remove them from icons/index.ts or create the file");
  }
}

/**
 * Write registry.json file
 */
function writeRegistry(content: string): void {
  try {
    fs.writeFileSync(REGISTRY_PATH, content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EACCES") {
      console.error(
        `❌ Error: Permission denied writing to "${REGISTRY_PATH}"`,
      );
    } else if ((error as NodeJS.ErrnoException).code === "ENOSPC") {
      console.error("❌ Error: No space left on disk");
    } else if ((error as NodeJS.ErrnoException).code === "EROFS") {
      console.error("❌ Error: File system is read-only");
    } else {
      console.error(`❌ Error writing registry.json: ${error}`);
    }
    process.exit(1);
  }
}

/**
 * Main function to generate registry.json
 */
function generateRegistry(): void {
  console.log("Scanning icons directory...");
  const iconFiles = getIconFiles();
  console.log(`Found ${iconFiles.length} icon files`);

  console.log("Generating registry items...");
  const items = iconFiles.map(generateRegistryItem);

  // Sort items alphabetically by name
  items.sort((a, b) => a.name.localeCompare(b.name));

  const registry: Registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "itshover",
    homepage: "https://itshover.com",
    items,
  };

  console.log("Writing registry.json...");

  // Write the registry directly as the JSON root (expected by shadcn tools)
  const jsonContent = JSON.stringify(registry, null, 2) + "\n";
  writeRegistry(jsonContent);

  console.log("");
  console.log("✅ Registry generated successfully!");
  console.log(`  - Total icons: ${items.length}`);

  // Emit per-icon JSON files for shadcn CLI under public/r/
  try {
    const outDir = path.join(__dirname, "..", "public", "r");
    fs.mkdirSync(outDir, { recursive: true });

    for (const item of items) {
      const filePath = path.join(outDir, `${item.name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(item, null, 2) + "\n", "utf8");
    }
  } catch (err) {
    console.error("❌ Error writing per-icon registry files:", err);
    process.exit(1);
  }

  // Validate ICON_LIST sync
  validateIconList(iconFiles);

  console.log("");
}

// Run the script
generateRegistry();