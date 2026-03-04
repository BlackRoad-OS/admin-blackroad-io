const {
  htmlContent, createDOM, assert, assertIncludes, assertGreaterThan, summary,
} = require('./helpers');

console.log('\n--- CSS Validation Tests ---\n');

const dom = createDOM();
const document = dom.window.document;
const styleContent = document.querySelector('style').textContent;

// CSS Variables
const expectedVars = ['--bg', '--bg-secondary', '--bg-tertiary', '--text', '--text-muted',
  '--accent-orange', '--accent-pink', '--accent-purple', '--accent-blue',
  '--border', '--success', '--warning', '--danger'];

expectedVars.forEach(v => {
  assertIncludes(styleContent, v, `CSS variable defined: ${v}`);
});

// Dark theme colors
assertIncludes(styleContent, '#000000', 'Background is pure black (#000000)');
assertIncludes(styleContent, '#ffffff', 'Text is white (#ffffff)');

// Layout components
assertIncludes(styleContent, '.sidebar', 'Sidebar styles defined');
assertIncludes(styleContent, '.main-content', 'Main content styles defined');
assertIncludes(styleContent, '.nav-item', 'Nav item styles defined');
assertIncludes(styleContent, '.stat-card', 'Stat card styles defined');
assertIncludes(styleContent, '.card', 'Card styles defined');
assertIncludes(styleContent, '.table', 'Table styles defined');
assertIncludes(styleContent, '.badge', 'Badge styles defined');
assertIncludes(styleContent, '.btn', 'Button styles defined');
assertIncludes(styleContent, '.modal', 'Modal styles defined');
assertIncludes(styleContent, '.form-input', 'Form input styles defined');
assertIncludes(styleContent, '.toggle', 'Toggle switch styles defined');
assertIncludes(styleContent, '.search-bar', 'Search bar styles defined');

// Responsive design
assertIncludes(styleContent, '@media', 'Has media queries');
assertIncludes(styleContent, '768px', 'Has mobile breakpoint at 768px');

// Transitions / animations
assertIncludes(styleContent, 'transition', 'Has CSS transitions');

// Badge variants
assertIncludes(styleContent, '.badge.success', 'Has success badge variant');
assertIncludes(styleContent, '.badge.warning', 'Has warning badge variant');
assertIncludes(styleContent, '.badge.danger', 'Has danger badge variant');
assertIncludes(styleContent, '.badge.info', 'Has info badge variant');

// Button variants
assertIncludes(styleContent, '.btn-primary', 'Has primary button variant');
assertIncludes(styleContent, '.btn-secondary', 'Has secondary button variant');
assertIncludes(styleContent, '.btn-danger', 'Has danger button variant');

// Sidebar gradient header
assertIncludes(styleContent, 'linear-gradient', 'Has gradient styling');

// Chart container
assertIncludes(styleContent, '.chart-container', 'Chart container styles defined');

// Page visibility
assertIncludes(styleContent, '.page.active', 'Active page display rule');

// Hover states
assert(styleContent.includes('.nav-item:hover'), 'Nav items have hover states');
assert(styleContent.includes('.btn-primary:hover'), 'Primary buttons have hover states');
assert(styleContent.includes('.table tr:hover'), 'Table rows have hover states');

const exitCode = summary();
process.exit(exitCode > 0 ? 1 : 0);
