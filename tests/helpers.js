const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  FAIL: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    passed++;
    console.log(`  PASS: ${message}`);
  } else {
    failed++;
    failures.push(`${message} (expected: ${expected}, got: ${actual})`);
    console.log(`  FAIL: ${message} (expected: ${expected}, got: ${actual})`);
  }
}

function assertIncludes(haystack, needle, message) {
  if (haystack && haystack.includes(needle)) {
    passed++;
    console.log(`  PASS: ${message}`);
  } else {
    failed++;
    failures.push(message);
    console.log(`  FAIL: ${message}`);
  }
}

function assertGreaterThan(actual, expected, message) {
  if (actual > expected) {
    passed++;
    console.log(`  PASS: ${message}`);
  } else {
    failed++;
    failures.push(`${message} (expected > ${expected}, got: ${actual})`);
    console.log(`  FAIL: ${message} (expected > ${expected}, got: ${actual})`);
  }
}

function summary() {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
  if (failures.length > 0) {
    console.log(`\nFailures:`);
    failures.forEach(f => console.log(`  - ${f}`));
  }
  console.log('='.repeat(50));
  return failed;
}

function createDOM() {
  return new JSDOM(htmlContent, {
    url: 'http://localhost',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
}

function createDOMWithScripts() {
  // Create a version with Chart.js stubbed out
  const stubbed = htmlContent.replace(
    '<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>',
    '<script>window.Chart = function(ctx, config) { this.ctx = ctx; this.config = config; };</script>'
  );
  return new JSDOM(stubbed, {
    url: 'http://localhost',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });
}

module.exports = {
  htmlContent,
  htmlPath,
  assert,
  assertEqual,
  assertIncludes,
  assertGreaterThan,
  summary,
  createDOM,
  createDOMWithScripts,
};
