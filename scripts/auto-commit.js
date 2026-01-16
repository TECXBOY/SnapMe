#!/usr/bin/env node

/**
 * Auto-commit script
 * Automatically commits and pushes code changes to GitHub
 * Run with: npm run git:auto-commit
 */

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const GIT_DIR = path.resolve(__dirname, '..');

function execCommand(command, options = {}) {
  try {
    return execSync(command, {
      cwd: GIT_DIR,
      stdio: 'inherit',
      ...options,
    });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function checkGitRepo() {
  if (!fs.existsSync(path.join(GIT_DIR, '.git'))) {
    console.log('Initializing git repository...');
    execCommand('git init');
    execCommand('git branch -M main');
  }
}

function checkRemote() {
  try {
    execSync('git remote get-url origin', {cwd: GIT_DIR, stdio: 'pipe'});
  } catch (error) {
    console.log('No remote repository found.');
    console.log('Please add a remote repository:');
    console.log('  git remote add origin <your-github-repo-url>');
    console.log('  git push -u origin main');
    process.exit(1);
  }
}

function getChanges() {
  try {
    const status = execSync('git status --porcelain', {
      cwd: GIT_DIR,
      encoding: 'utf-8',
    });
    return status.trim();
  } catch (error) {
    return '';
  }
}

function commitAndPush() {
  const changes = getChanges();
  
  if (!changes) {
    console.log('No changes to commit.');
    return;
  }

  console.log('Staging all changes...');
  execCommand('git add -A');

  const timestamp = new Date().toISOString();
  const commitMessage = `Auto-commit: ${timestamp}\n\nAutomated commit from development session`;

  console.log('Committing changes...');
  execCommand(`git commit -m "${commitMessage}"`);

  console.log('Pushing to GitHub...');
  try {
    execCommand('git push origin main');
    console.log('✅ Successfully pushed to GitHub!');
  } catch (error) {
    console.log('⚠️  Push failed. You may need to pull first or set up remote.');
    console.log('Run: git pull origin main --rebase (if needed)');
  }
}

// Main execution
console.log('🚀 Starting auto-commit process...\n');

checkGitRepo();
checkRemote();
commitAndPush();

console.log('\n✨ Auto-commit complete!');
