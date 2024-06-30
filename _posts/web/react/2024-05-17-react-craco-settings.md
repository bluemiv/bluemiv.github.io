---
title: CRACO로 리액트 Webpack 설정
description: CRACO(Create React App Configuration Override)에 대해 설명하고, 리액트 프로젝트에서 설정하는 방법에 대해 설명합니다.
date: 2024-05-17 10:03:43 +0900
last_modified_at: 2024-05-17 10:03:43 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, craco, webpack, javascript, typescript ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-05-17-react-craco-settings/thumbnail.webp
  alt: CRACO로 리액트 Webpack 설정
---

## 1. 왜 CRACO를 사용해야 하는가?

### 1.1. 기본 CRA의 한계

CRA(Create React App)는 리액트 애플리케이션을 개발한느데 필요한 설정을 한번에 해결해주는 보일러플레이트입니다. 쉽게 React 프로젝트를 만들 수 있게 많은 편의를 제공하지만, 프로젝트가 복잡해지면 기본 설정 말고도 커스터마이징이 필요해집니다.
예를 들어, 특정 플러그인을 추가하거나 `webpack` 설정을 변경하려는 경우가 있습니다.

기본 CRA에서는 eject 명령을 통해 설정이 변경 가능하지만, 아래와 같은 이유로 eject는 권장하지 않습니다.

1. 유연한 설정 변경
  - eject를 하면 모든 설정 파일이 프로젝트에 노출되고 관리해야 할 설정이 크게 늘어납니다.
2. 업데이트 관리 용이
  - CRA를 eject하면 이후 CRA의 업데이트를 적용하기 어렵습니다.
3. CRACO 플러그인 지원
  - CRACO는 다양한 플러그인과 함께 사용할 수 있습니다. (예를 들어 Sass, Less, PostCSS 등의 스타일링 옵션을 쉽게 추가 가능)

### 1.2. CRACO의 주요 기능

CRACO는 CRA의 설정을 덮어써서 커스텀 설정을 추가할 수 있도록 도와줍니다. 예를들어, `webpack`, `Babel`, `PostCSS` 설정을 덮어씌울 수 있습니다.

## 2. CRACO 설치 및 설정 방법

### 2.1. CRACO 설치

CRACO를 설치하려면 아래 명령어를 사용하면 됩니다.

```bash
npm install @craco/craco
```

또는 Yarn을 사용하는 경우

```bash
yarn add @craco/craco
```

### 2.2. package.json scripts 변경

CRA에서 CRACO로 설정을 변경하려면 `package.json` 파일을 수정해야 합니다. `react-scripts` 대신 `craco`를 사용하도록 아래와 같이 변경합니다

[변경 전]

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```
{: file='package.json'}

[변경 후]

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```
{: file='package.json'}

> CRACO를 사용하면 eject는 필요없기 때문에 제거해도 됩니다
{: .prompt-tip }

### 2.3. craco.config.js 파일 생성

프로젝트 루트 디렉토리에 `craco.config.js` 파일을 생성합니다. (여기에서 원하는 설정을 추가할 수 있습니다)

```javascript
module.exports = {};
```
{: file='craco.config.js'}

예를 들어, path alias를 설정하는 경우 아래와 같이 할 수 있습니다.

```javascript
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```
{: file='craco.config.js'}

> TypeScript 기반의 React 프로젝트에서 CRACO를 활용하여 path alias를 설정하는 방법에 대해 궁금하시면, [이 글](/posts/react-typescript-craco-path-alias/)을 참고해주세요.
{: .prompt-info }

### 2.4. `webpack` 설정 덮어쓰기

특정 `webpack` 설정을 덮어쓰려면 `craco.config.js` 파일 내에서 `webpack` 설정을 할 수 있습니다.

```javascript
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return webpackConfig;
    },
  },
};
```
{: file='craco.config.js'}

## 4. 결론

CRACO는 CRA 프로젝트의 설정을 쉽게 커스터마이징할 수 있게 도와줍니다. 이를 통해 프로젝트에 `webpack`, `Babel`, `PostCSS` 등의 설정을 커스텀하게 조정할 수 있습니다.
