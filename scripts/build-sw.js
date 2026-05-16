const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootPath = path.join(__dirname, '..');
const hashTargets = [
  'package.json',
  'pnpm-lock.yaml',
  'next.config.ts',
  'scripts/build-sw.js',
  'src',
  'public',
];
const ignoredPaths = new Set([
  path.join(rootPath, 'public/sw.js'),
]);

const templatePath = path.join(__dirname, '../public/sw.template.js');
const outputPath = path.join(__dirname, '../public/sw.js');

function collectFiles(targetPath) {
  if (!fs.existsSync(targetPath) || ignoredPaths.has(targetPath)) return [];

  const stat = fs.statSync(targetPath);
  if (stat.isFile()) return [targetPath];

  return fs
    .readdirSync(targetPath)
    .sort()
    .flatMap((entry) => collectFiles(path.join(targetPath, entry)));
}

function createBuildVersion() {
  const hash = crypto.createHash('sha256');
  const files = hashTargets
    .flatMap((target) => collectFiles(path.join(rootPath, target)))
    .sort();

  files.forEach((filePath) => {
    const relativePath = path.relative(rootPath, filePath);
    hash.update(relativePath);
    hash.update('\0');
    hash.update(fs.readFileSync(filePath));
    hash.update('\0');
  });

  return hash.digest('hex').slice(0, 16);
}

const buildVersion = process.env.GITHUB_SHA?.slice(0, 16) ?? createBuildVersion();
const cacheVersion = `bluemiv-blog-${buildVersion}`;

let swTemplate = fs.readFileSync(templatePath, 'utf8');

// __CACHE_NAME__을 실제 버전으로 치환
swTemplate = swTemplate.replace('__CACHE_NAME__', cacheVersion);
swTemplate = swTemplate.replace('__BUILD_VERSION__', buildVersion);

// sw.js 파일로 저장
fs.writeFileSync(outputPath, swTemplate);

console.log(`✅ sw.js 생성 완료! CACHE_NAME = ${cacheVersion}`);
