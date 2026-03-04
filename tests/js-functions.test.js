const {
  assert, assertEqual, assertGreaterThan, summary, createDOMWithScripts,
} = require('./helpers');

console.log('\n--- JavaScript Functions Tests ---\n');

const dom = createDOMWithScripts();
const document = dom.window.document;

// Test: showPage function exists
assert(typeof dom.window.showPage === 'function', 'showPage function is defined');

// Test: openModal function exists
assert(typeof dom.window.openModal === 'function', 'openModal function is defined');

// Test: closeModal function exists
assert(typeof dom.window.closeModal === 'function', 'closeModal function is defined');

// Test: searchUsers function exists
assert(typeof dom.window.searchUsers === 'function', 'searchUsers function is defined');

// Test: generateLogs function exists
assert(typeof dom.window.generateLogs === 'function', 'generateLogs function is defined');

// Test: Activity table is populated
const activityRows = document.querySelectorAll('#activityTable tr');
assertEqual(activityRows.length, 5, 'Activity table has 5 rows');

// Test: Users table is populated
const userRows = document.querySelectorAll('#usersTable tr');
assertEqual(userRows.length, 4, 'Users table has 4 rows');

// Test: Agents table is populated
const agentRows = document.querySelectorAll('#agentsTable tr');
assertEqual(agentRows.length, 4, 'Agents table has 4 rows');

// Test: Payments table is populated
const paymentRows = document.querySelectorAll('#paymentsTable tr');
assertEqual(paymentRows.length, 4, 'Payments table has 4 rows');

// Test: Deployments table is populated
const deploymentRows = document.querySelectorAll('#deploymentsTable tr');
assertEqual(deploymentRows.length, 3, 'Deployments table has 3 rows');

// Test: API keys table is populated
const apiKeyRows = document.querySelectorAll('#apiKeysTable tr');
assertEqual(apiKeyRows.length, 3, 'API keys table has 3 rows');

// Test: Logs are generated
const logEntries = document.querySelectorAll('#logsContainer div');
assertEqual(logEntries.length, 50, 'Logs container has 50 log entries');

// Test: Log entries have color-coded types
const logHTML = document.getElementById('logsContainer').innerHTML;
assert(logHTML.includes('[INFO]') || logHTML.includes('[WARN]') || logHTML.includes('[ERROR]') || logHTML.includes('[DEBUG]'),
  'Log entries contain log level types');

// Test: Charts were instantiated (via stub)
assert(typeof dom.window.Chart === 'function', 'Chart constructor is available');

// Test: openModal works
dom.window.openModal('newUserModal');
const modal = document.getElementById('newUserModal');
assert(modal.classList.contains('active'), 'openModal adds "active" class to modal');

// Test: closeModal works
dom.window.closeModal('newUserModal');
assert(!modal.classList.contains('active'), 'closeModal removes "active" class from modal');

// Test: searchUsers filters table rows
dom.window.searchUsers('alice');
const visibleRows = Array.from(document.querySelectorAll('#usersTable tr')).filter(
  r => r.style.display !== 'none'
);
assertEqual(visibleRows.length, 1, 'searchUsers("alice") shows only 1 matching row');

// Test: searchUsers with empty string shows all
dom.window.searchUsers('');
const allRows = Array.from(document.querySelectorAll('#usersTable tr')).filter(
  r => r.style.display !== 'none'
);
assertEqual(allRows.length, 4, 'searchUsers("") shows all 4 rows');

// Test: User data rendered correctly
const firstUserRow = document.querySelector('#usersTable tr');
assert(firstUserRow.textContent.includes('Alice Johnson'), 'First user is Alice Johnson');
assert(firstUserRow.textContent.includes('alice@example.com'), 'First user email is correct');

// Test: Agent data rendered correctly
const agentRow = document.querySelector('#agentsTable tr');
assert(agentRow.textContent.includes('lucidia-v2'), 'First agent is lucidia-v2');

// Test: Badge classes are applied
const badges = document.querySelectorAll('.badge');
assertGreaterThan(badges.length, 5, 'Multiple badges rendered across tables');

const successBadges = document.querySelectorAll('.badge.success');
assertGreaterThan(successBadges.length, 0, 'Has success badges');

// Test: Action buttons exist in tables
const editBtns = document.querySelectorAll('.action-btn.edit');
assertGreaterThan(editBtns.length, 0, 'Has edit action buttons');

const deleteBtns = document.querySelectorAll('.action-btn.delete');
assertGreaterThan(deleteBtns.length, 0, 'Has delete action buttons');

const viewBtns = document.querySelectorAll('.action-btn.view');
assertGreaterThan(viewBtns.length, 0, 'Has view action buttons');

// Test: Dashboard stats have initial values
const totalUsers = document.getElementById('totalUsers');
assert(totalUsers.textContent.length > 0, 'Total users stat has a value');

const revenue = document.getElementById('revenue');
assert(revenue.textContent.startsWith('$'), 'Revenue stat starts with $');

const exitCode = summary();
process.exit(exitCode > 0 ? 1 : 0);
