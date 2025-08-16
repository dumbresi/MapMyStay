#!/usr/bin/env node

/**
 * Test Runner Script for MapMyStay Backend
 * 
 * Usage:
 *   node scripts/test.js                    # Run all tests
 *   node scripts/test.js --watch            # Run tests in watch mode
 *   node scripts/test.js --coverage         # Run tests with coverage
 *   node scripts/test.js --unit             # Run only unit tests
 *   node scripts/test.js --integration      # Run only integration tests
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const projectRoot = join(__dirname, '..');

// Parse command line arguments
const options = {
  watch: args.includes('--watch'),
  coverage: args.includes('--coverage'),
  unit: args.includes('--unit'),
  integration: args.includes('--integration'),
  verbose: args.includes('--verbose'),
  help: args.includes('--help') || args.includes('-h')
};

if (options.help) {
  console.log(`
Test Runner for MapMyStay Backend

Usage:
  node scripts/test.js [options]

Options:
  --watch         Run tests in watch mode
  --coverage      Generate coverage report
  --unit          Run only unit tests
  --integration   Run only integration tests
  --verbose       Verbose output
  --help, -h      Show this help message

Examples:
  node scripts/test.js                    # Run all tests
  node scripts/test.js --watch            # Run tests in watch mode
  node scripts/test.js --coverage         # Run tests with coverage
  node scripts/test.js --unit             # Run only unit tests
  node scripts/test.js --integration      # Run only integration tests
`);
  process.exit(0);
}

// Build Jest command
function buildJestCommand() {
  let command = 'node --experimental-vm-modules node_modules/.bin/jest';
  
  if (options.watch) {
    command += ' --watch';
  }
  
  if (options.coverage) {
    command += ' --coverage';
  }
  
  if (options.unit) {
    command += ' --testPathPattern="__tests__/(?!integration)"';
  }
  
  if (options.integration) {
    command += ' --testPathPattern="__tests__/integration"';
  }
  
  if (options.verbose) {
    command += ' --verbose';
  }
  
  return command;
}

// Run tests
function runTests() {
  console.log('🧪 Starting tests...\n');
  
  const jestCommand = buildJestCommand();
  console.log(`Running: ${jestCommand}\n`);
  
  const testProcess = spawn(jestCommand, [], {
    shell: true,
    stdio: 'inherit',
    cwd: projectRoot,
    env: {
      ...process.env,
      NODE_ENV: 'test'
    }
  });
  
  testProcess.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ All tests passed!');
      process.exit(0);
    } else {
      console.log(`\n❌ Tests failed with exit code ${code}`);
      process.exit(code);
    }
  });
  
  testProcess.on('error', (error) => {
    console.error('❌ Failed to start test process:', error.message);
    process.exit(1);
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping tests...');
    testProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping tests...');
    testProcess.kill('SIGTERM');
  });
}

// Main execution
try {
  runTests();
} catch (error) {
  console.error('❌ Test runner failed:', error.message);
  process.exit(1);
} 