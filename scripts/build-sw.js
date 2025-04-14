const fs = require('fs');
const path = require('path');

const cacheVersion = `bluemiv-blog-${Date.now()}`;

const templatePath = path.join(__dirname, '../public/sw.template.js');
const outputPath = path.join(__dirname, '../public/sw.js');

let swTemplate = fs.readFileSync(templatePath, 'utf8');

// __CACHE_NAME__을 실제 버전으로 치환
swTemplate = swTemplate.replace('__CACHE_NAME__', cacheVersion);

// sw.js 파일로 저장
fs.writeFileSync(outputPath, swTemplate);

console.log(`✅ sw.js 생성 완료! CACHE_NAME = ${cacheVersion}`);
