---
title: React 별칭(Path Alias) 설정 (CRACO + TypeScript)
description: 이 글에서는 TypeScript 기반의 React 프로젝트에서 CRACO(Create React App Configuration Override)를 사용하여 Path Alias를 설정하는 방법에 대해 설명합니다
date: 2024-05-18 11:06:39 +0900
last_modified_at: 2024-05-18 11:06:39 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, craco, webpack, typescript, path alias ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-05-18-react-typescript-craco-path-alias/thumbnail.webp
  alt: React 별칭(Path Alias) 설정 (CRACO + TypeScript)
---

## 1. 프로젝트 생성

### 1.1. React 프로젝트 생성

먼저, CRA(Create React App)를 사용하여 새로운 React 프로젝트를 생성합니다.

```bash
npx create-react-app my-app --template typescript
cd my-app
```

또는 yarn을 사용하는 경우,

```bash
yarn create react-app my-app --template=typescript
cd my-app
```

### 1.2. CRACO 의존성 설치

CRACO를 설치하여 CRA의 기본 설정을 쉽게 오버라이드(override) 할 수 있도록 합니다.

```bash
npm install @craco/craco
```

또는 yarn을 사용하는 경우,

```bash
yarn add @craco/craco
```

설치가 완료되면, `package.json` 파일을 열어 `scripts` 섹션을 수정하여 CRACO를 사용하도록 설정합니다.

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```
{: file='package.json'}

> CRACO에 대해 자세한 내용이 궁금하시면, [이 글](/posts/react-craco-settings/)을 참고해주세요.
{: .prompt-info }

## 2. CRACO 설정 파일 추가

프로젝트 루트 디렉토리에 `craco.config.js` 파일을 생성하고, Path Alias를 설정합니다.

### 2.1. `craco.config.js` 파일 생성 및 설정

`craco.config.js` 파일에 다음과 같이 설정을 추가합니다.

```javascript
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
};
```
{: file='craco.config.js'}

위 설정은 `src` 디렉토리 내에 있는 `components`, `utils`, `styles` 디렉토리를 각각 `@components`, `@utils`, `@styles`라는 별칭으로 사용할 수 있게 합니다.

## 3. TypeScript 설정

### 3.1. `tsconfig.json` 파일 수정

`tsconfig.json` 파일을 열어 `compilerOptions` 섹션에 `paths` 옵션을 추가합니다.

```javascript
{
  "compilerOptions": {
    // ...생략...
    "baseUrl": "src",
    "paths": {
      "@components/*": [
        "components/*"
      ],
      "@utils/*": [
        "utils/*"
      ],
      "@styles/*": [
        "styles/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}
```
{: file='tsconfig.json'}

이 설정은 TypeScript가 `@components`, `@utils`, `@styles`와 같은 경로 별칭을 올바르게 해석할 수 있도록 도와줍니다.

## 4. 사용 예시

### 4.1. 컴포넌트 생성

테스트를 위한 `src/components/FirstComponent.tsx` 파일을 생성하고, 간단한 컴포넌트를 생성합니다.

```tsx
import React from 'react';

const FirstComponent: React.FC = () => {
  return <div>FirstComponent</div>;
};

export default ExampleComponent;
```
{: file='src/components/FirstComponent.tsx'}

### 4.2. Path Alias로 import

`src/App.tsx`에서 `FirstComponent`를 import 할때 위에서 설정한 `@components`라는 Path Alias를 사용하여 import 합니다.

```tsx
import React from 'react';
import FirstComponent from '@components/FirstComponent';

const App: React.FC = () => {
  return (
    <div>
      <h1>My App </h1>
      <FirstComponent/>
    </div>
  );
};

export default App;
```
{: file='src/App.tsx'}
