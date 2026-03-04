const fs = require('fs');
const path = require('path');
const { assert, assertGreaterThan, summary } = require('./helpers');

console.log('\n--- Project Structure Tests ---\n');

const root = path.join(__dirname, '..');

// Required files exist
const requiredFiles = [
  'index.html',
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'package.json',
  '.github/workflows/ci.yml',
  '.github/workflows/deploy.yml',
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(root, file));
  assert(exists, `Required file exists: ${file}`);
});

// index.html is not empty and has reasonable size
const indexStat = fs.statSync(path.join(root, 'index.html'));
assertGreaterThan(indexStat.size, 1000, 'index.html is substantial (> 1KB)');

// LICENSE file has content
const license = fs.readFileSync(path.join(root, 'LICENSE'), 'utf-8');
assert(license.includes('BlackRoad'), 'LICENSE references BlackRoad');

// GitHub workflows are valid YAML (basic check)
const ciYml = fs.readFileSync(path.join(root, '.github/workflows/ci.yml'), 'utf-8');
assert(ciYml.includes('name:'), 'CI workflow has name field');
assert(ciYml.includes('on:'), 'CI workflow has trigger field');
assert(ciYml.includes('jobs:'), 'CI workflow has jobs field');

const deployYml = fs.readFileSync(path.join(root, '.github/workflows/deploy.yml'), 'utf-8');
assert(deployYml.includes('Cloudflare') || deployYml.includes('cloudflare'), 'Deploy workflow references Cloudflare');

// package.json is valid JSON with required fields
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
assert(pkg.name === 'admin-blackroad-io', 'package.json has correct name');
assert(pkg.scripts && pkg.scripts.test, 'package.json has test script');
assert(pkg.scripts && pkg.scripts.build, 'package.json has build script');
assert(pkg.private === true, 'package.json is marked private');

// Tests directory exists
assert(fs.existsSync(path.join(root, 'tests')), 'Tests directory exists');

// .gitignore should exist (or node_modules should not be committed)
const hasGitignore = fs.existsSync(path.join(root, '.gitignore'));
assert(hasGitignore || !fs.existsSync(path.join(root, '.git', 'info', 'exclude')), '.gitignore exists or exclusions configured');

const exitCode = summary();
process.exit(exitCode > 0 ? 1 : 0);
