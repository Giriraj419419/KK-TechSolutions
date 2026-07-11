const { execSync } = require('child_process');
const readline = require('readline');

function run(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n❌ Error executing: ${command}`);
    process.exit(1);
  }
}

function runSilent(command) {
  try {
    return execSync(command, { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    return null;
  }
}

console.log("==========================================");
console.log("🚀 KK Tech Solutions - GitHub Sync System");
console.log("==========================================\n");

// 1. Check Git Status
console.log("🔍 Checking git status...");
const status = runSilent('git status -s');
if (!status) {
  console.log("✅ No changes to commit. Everything is up to date.");
  process.exit(0);
}
console.log(status);

// 2. Before Push Checks
console.log("\n⚙️ Running pre-push checks...");

// Check for merge conflicts
console.log("🔄 Checking for merge conflicts...");
runSilent('git fetch origin main || true'); // Try to fetch, but don't fail if repo is empty
const conflictCheck = runSilent('git diff --name-only --diff-filter=U');
if (conflictCheck) {
  console.error("❌ Merge conflicts detected! Please resolve them before syncing.");
  process.exit(1);
}

// Verify Build
console.log("🏗️ Verifying build (npm run build)...");
run('npm run build');

// Verify Lint / Critical Errors
console.log("🧹 Checking for critical errors (npm run lint)...");
run('npm run lint');

// 3. Stage & Commit
console.log("\n📦 Staging modified files...");
run('git add .');

// Support non-interactive mode via --message argument or when stdin is not a TTY
const msgArgIdx = process.argv.indexOf('--message');
const cliMessage = msgArgIdx !== -1 ? process.argv[msgArgIdx + 1] : null;

function doCommitAndPush(commitMsg) {
  run(`git commit -m "${commitMsg}"`);

  // 4. Pull remote changes and push to origin/main
  console.log("\n☁️ Synchronizing with GitHub (origin/main)...");
  try {
    runSilent('git pull origin main --rebase');
  } catch (err) {
    console.error("❌ Failed to pull remote changes. Please resolve manually.");
    process.exit(1);
  }
  run('git push -u origin main');

  // 5. After Push Details
  console.log("\n==========================================");
  console.log("✅ GitHub Synchronization Successful!");
  
  const hash = runSilent('git rev-parse HEAD');
  const repoUrl = "https://github.com/Giriraj419419/KK-TechSolutions";
  
  console.log(`📌 Commit Hash: ${hash}`);
  console.log(`🔗 Repository: ${repoUrl}`);
  console.log("==========================================");
}

if (cliMessage) {
  // Non-interactive: use the provided message directly
  doCommitAndPush(cliMessage);
} else if (!process.stdin.isTTY) {
  // Not a real terminal (e.g. piped/background): use auto message
  const autoMsg = `Auto-sync: update codebase (${new Date().toLocaleString()})`;
  console.log(`💬 Using default commit message: ${autoMsg}`);
  doCommitAndPush(autoMsg);
} else {
  // Interactive terminal: ask the user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('💬 Enter a meaningful commit message (or press enter for default): ', (msg) => {
    const commitMsg = msg.trim() || `Auto-sync: update codebase (${new Date().toLocaleString()})`;
    doCommitAndPush(commitMsg);
    rl.close();
  });
}

