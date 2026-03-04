const {
  htmlContent, createDOM, assert, assertEqual, assertIncludes,
  assertGreaterThan, summary,
} = require('./helpers');

console.log('\n--- HTML Validation Tests ---\n');

const dom = createDOM();
const document = dom.window.document;

// DOCTYPE and basic structure
assert(htmlContent.startsWith('<!DOCTYPE html>'), 'Has DOCTYPE declaration');
assert(document.documentElement.getAttribute('lang') === 'en', 'Has lang="en" attribute');

// Head elements
const meta = document.querySelector('meta[charset]');
assert(meta && meta.getAttribute('charset') === 'UTF-8', 'Has UTF-8 charset meta');

const viewport = document.querySelector('meta[name="viewport"]');
assert(viewport !== null, 'Has viewport meta tag');
assertIncludes(viewport.getAttribute('content'), 'width=device-width', 'Viewport includes width=device-width');

const title = document.querySelector('title');
assert(title !== null, 'Has title element');
assertIncludes(title.textContent, 'BlackRoad OS', 'Title includes BlackRoad OS');

// Chart.js CDN
const chartScript = document.querySelector('script[src*="chart.js"]');
assert(chartScript !== null, 'Loads Chart.js from CDN');

// Sidebar
const sidebar = document.querySelector('.sidebar');
assert(sidebar !== null, 'Has sidebar element');

const sidebarHeader = document.querySelector('.sidebar-header h1');
assert(sidebarHeader !== null, 'Has sidebar header');
assertIncludes(sidebarHeader.textContent, 'Admin Panel', 'Sidebar header shows Admin Panel');

// Navigation items
const navItems = document.querySelectorAll('.nav-item');
assertGreaterThan(navItems.length, 5, 'Has multiple navigation items');

const expectedPages = ['dashboard', 'analytics', 'users', 'agents', 'payments', 'deployments', 'settings', 'logs', 'api'];
expectedPages.forEach(page => {
  const navItem = document.querySelector(`.nav-item[onclick*="'${page}'"]`);
  assert(navItem !== null, `Has nav item for "${page}" page`);
});

// Nav sections
const navSections = document.querySelectorAll('.nav-section-title');
assertEqual(navSections.length, 3, 'Has 3 navigation sections (Overview, Management, System)');

// Main content and pages
const mainContent = document.querySelector('.main-content');
assert(mainContent !== null, 'Has main content area');

expectedPages.forEach(pageId => {
  const page = document.getElementById(pageId);
  assert(page !== null, `Page element exists: #${pageId}`);
  assert(page.classList.contains('page'), `#${pageId} has "page" class`);
});

// Default active page
const activePage = document.querySelector('.page.active');
assert(activePage !== null, 'Has an active page by default');
assertEqual(activePage.id, 'dashboard', 'Dashboard is the default active page');

// Dashboard stat cards
const statCards = document.querySelectorAll('#dashboard .stat-card');
assertEqual(statCards.length, 4, 'Dashboard has 4 stat cards');

// Dashboard dynamic IDs
['totalUsers', 'activeAgents', 'revenue'].forEach(id => {
  const el = document.getElementById(id);
  assert(el !== null, `Dashboard stat element exists: #${id}`);
});

// Tables
const tables = {
  activityTable: 'Recent Activity',
  usersTable: 'Users',
  agentsTable: 'Agents',
  paymentsTable: 'Payments',
  deploymentsTable: 'Deployments',
  apiKeysTable: 'API Keys',
};

Object.keys(tables).forEach(tableId => {
  const tbody = document.getElementById(tableId);
  assert(tbody !== null, `Table body exists: #${tableId} (${tables[tableId]})`);
});

// Chart canvases
['performanceChart', 'userGrowthChart', 'revenueChart'].forEach(id => {
  const canvas = document.getElementById(id);
  assert(canvas !== null, `Chart canvas exists: #${id}`);
  assertEqual(canvas.tagName, 'CANVAS', `#${id} is a canvas element`);
});

// Modal
const modal = document.getElementById('newUserModal');
assert(modal !== null, 'New User modal exists');
assert(modal.classList.contains('modal'), 'Modal has "modal" class');

const modalClose = modal.querySelector('.modal-close');
assert(modalClose !== null, 'Modal has close button');

// Forms in settings
const settingsPage = document.getElementById('settings');
const formInputs = settingsPage.querySelectorAll('.form-input');
assertGreaterThan(formInputs.length, 3, 'Settings page has form inputs');

// Toggle switch
const toggle = document.querySelector('.toggle');
assert(toggle !== null, 'Has toggle switch component');

// Search bar
const searchInput = document.querySelector('.search-input');
assert(searchInput !== null, 'Has search input');

// Buttons
const btnPrimary = document.querySelectorAll('.btn-primary');
assertGreaterThan(btnPrimary.length, 0, 'Has primary buttons');
const btnSecondary = document.querySelectorAll('.btn-secondary');
assertGreaterThan(btnSecondary.length, 0, 'Has secondary buttons');

// Logs container
const logsContainer = document.getElementById('logsContainer');
assert(logsContainer !== null, 'Logs container exists');

const exitCode = summary();
process.exit(exitCode > 0 ? 1 : 0);
