const { execSync } = require('child_process');
const path = require('path');

const testFiles = [
  'structure.test.js',
  'html-validation.test.js',
  'css-validation.test.js',
  'js-functions.test.js',
];

let totalPassed = 0;
let totalFailed = 0;
let failedSuites = [];

console.log('='.repeat(60));
console.log('  Admin BlackRoad IO - Test Suite');
console.log('='.repeat(60));

for (const testFile of testFiles) {
  const filePath = path.join(__dirname, testFile);
  try {
    const output = execSync(`node "${filePath}"`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    console.log(output);

    const match = output.match(/Results: (\d+) passed, (\d+) failed/);
    if (match) {
      totalPassed += parseInt(match[1]);
      totalFailed += parseInt(match[2]);
    }
  } catch (err) {
    console.log(err.stdout || '');
    console.log(err.stderr || '');
    failedSuites.push(testFile);

    const match = (err.stdout || '').match(/Results: (\d+) passed, (\d+) failed/);
    if (match) {
      totalPassed += parseInt(match[1]);
      totalFailed += parseInt(match[2]);
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('  FINAL RESULTS');
console.log('='.repeat(60));
console.log(`  Total: ${totalPassed + totalFailed} tests`);
console.log(`  Passed: ${totalPassed}`);
console.log(`  Failed: ${totalFailed}`);
if (failedSuites.length > 0) {
  console.log(`  Failed suites: ${failedSuites.join(', ')}`);
}
console.log('='.repeat(60));

process.exit(totalFailed > 0 ? 1 : 0);
