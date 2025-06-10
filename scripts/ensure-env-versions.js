import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const packageJsonPath = path.join(projectRoot, 'package.json');
const nvmrcPath = path.join(projectRoot, '.nvmrc');
const envFilePath = path.join(projectRoot, '.env');

const DOCKER_NODE_VAR = 'DOCKER_BUILD_NODE_VERSION';
const DOCKER_PNPM_VAR = 'DOCKER_BUILD_PNPM_VERSION';

/**
 * Extracts the pnpm version from the `packageManager` field in package.json.
 * @param {object} packageJson - The parsed package.json object.
 * @returns {string|null} The pnpm version string, or null if not found.
 */
function getPnpmVersionFromPackageManager(packageJson) {
    const pm = packageJson?.packageManager;
    if (!pm || typeof pm !== 'string') return null;
    const match = pm.match(/pnpm@([^+\s]+)/);
    return match?.[1] || null;
}

/**
 * Main function to synchronize versions across .nvmrc, package.json, and .env.
 * This script performs the following actions:
 * 1. Reads `.nvmrc` as the source of truth for the Node.js version.
 * 2. Reads `package.json`.
 * 3. Enforces `packageManager` as the source of truth for the pnpm version.
 * 4. Synchronizes `engines.node` and `engines.pnpm` in `package.json` to match these sources.
 * 5. Updates `DOCKER_BUILD_NODE_VERSION` and `DOCKER_BUILD_PNPM_VERSION` in the `.env` file.
 */
async function main() {
    console.log('🔧 Synchronizing versions across .nvmrc, package.json, and .env...');
    let packageJson;

    // --- 1. Read .nvmrc as the Source of Truth for Node.js version ---
    let nodeVersion;
    try {
        const nvmrcContent = await fs.promises.readFile(nvmrcPath, 'utf8');
        nodeVersion = nvmrcContent.trim();
        if (!nodeVersion) throw new Error('.nvmrc file is empty.');
    } catch (error) {
        console.error('❌ Critical Error: Could not read .nvmrc file.');
        console.error('   Please ensure a .nvmrc file exists in the project root and contains a valid Node.js version.');
        console.error(`   Error details: ${error.message}`);
        process.exit(1);
    }
    console.log(`  - Found authoritative Node.js version from .nvmrc: ${nodeVersion}`);

    // --- 2. Read and parse package.json ---
    try {
        const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf8');
        packageJson = JSON.parse(packageJsonContent);
    } catch (error) {
        console.error('❌ Critical Error: Could not read or parse package.json.');
        console.error(error.message);
        process.exit(1);
    }

    // --- 3. Get PNPM version from `packageManager` (Source of Truth) ---
    const pnpmVersion = getPnpmVersionFromPackageManager(packageJson);
    if (!pnpmVersion) {
        console.error('❌ Critical Error: `packageManager` field is missing or invalid in package.json.');
        console.error('   Please set it, e.g., by running `corepack prepare pnpm@<version> --activate`.');
        process.exit(1);
    }
    console.log(`  - Found authoritative PNPM version from \`packageManager\`: ${pnpmVersion}`);

    // --- 4. Synchronize `engines` in package.json ---
    let packageJsonModified = false;
    if (!packageJson.engines) packageJson.engines = {};

    // Sync Node.js version
    if (packageJson.engines.node !== nodeVersion) {
        console.log(`  - Updating \`engines.node\` to match .nvmrc version: "${nodeVersion}"`);
        packageJson.engines.node = nodeVersion;
        packageJsonModified = true;
    }

    // Sync pnpm version
    if (packageJson.engines.pnpm !== pnpmVersion) {
        console.log(`  - Updating \`engines.pnpm\` to match \`packageManager\` version: "${pnpmVersion}"`);
        packageJson.engines.pnpm = pnpmVersion;
        packageJsonModified = true;
    }

    if (packageJsonModified) {
        try {
            const newPackageJsonContent = JSON.stringify(packageJson, null, 2) + '\n';
            await fs.promises.writeFile(packageJsonPath, newPackageJsonContent, 'utf8');
            console.log('  - ✅ Successfully updated package.json.');
        } catch (error) {
            console.error('❌ Critical Error: Failed to write updated package.json.', error);
            process.exit(1);
        }
    } else {
        console.log('  - `engines` in package.json are already in sync.');
    }

    // --- 5. Synchronize .env file ---
    let envContent = '';
    try {
        envContent = await fs.promises.readFile(envFilePath, 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`  - 📄 .env file not found. Creating a new one.`);
        } else {
            throw error; // Rethrow other read errors
        }
    }

    let envModified = false;
    const newEnvLines = envContent.split('\n');

    const updateOrAddEnvVar = (varName, value) => {
        const varIndex = newEnvLines.findIndex(line => line.startsWith(`${varName}=`));
        const newLine = `${varName}=${value}`;
        if (varIndex !== -1) {
            if (newEnvLines[varIndex] !== newLine) {
                console.log(`  - Updating ${varName} in .env file.`);
                newEnvLines[varIndex] = newLine;
                envModified = true;
            }
        } else {
            console.log(`  - Adding ${varName} to .env file.`);
            if (newEnvLines.length > 1 || (newEnvLines.length === 1 && newEnvLines[0].trim() !== '')) {
                if (newEnvLines[newEnvLines.length - 1].trim() !== '') newEnvLines.push('');
            }
            newEnvLines.push(newLine);
            envModified = true;
        }
    };

    updateOrAddEnvVar(DOCKER_NODE_VAR, nodeVersion);
    updateOrAddEnvVar(DOCKER_PNPM_VAR, pnpmVersion);

    if (envModified) {
        const finalEnvContent = newEnvLines.join('\n').replace(/\n+$/, '') + '\n';
        try {
            await fs.promises.writeFile(envFilePath, finalEnvContent, 'utf8');
            console.log('  - ✅ Successfully updated .env file.');
        } catch (error) {
            console.error('❌ Critical Error: Failed to write to .env file.', error);
            process.exit(1);
        }
    } else {
        console.log('  - .env file is already up-to-date.');
    }

    console.log('✅ Version synchronization complete.');
}

main().catch(error => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
});
