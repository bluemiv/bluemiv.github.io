---
title: Vite React 앱에 Alias path 설정
description: 이 글에서는 Vite 기반의 React 프로젝트에서 Alias path를 설정하는 방법에 대해 소개합니다.
date: 2024-02-28 18:01:56 +0900
last_modified_at: 2024-02-28 18:01:56 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, vite, alias path, 상대경로 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-28-vite-react-alias-path/thumbnail.webp
  alt: Vite React 앱에 Alias path 설정
---

## 1. Vite React 프로젝트 생성

Vite와 React 프로젝트 생성에 대해 궁금하신 분은 [이 글](/posts/create-react-project-with-vite/)을 참고해주세요.

## 2. Alias path 설정

상대경로를 사용하는 대신 절대경로를 설정하면 코드가 더 깔끔해지고 유지보수가 쉬워집니다. 예를들어보면 

다른 컴포넌트에서 src/components/MyComponent를 import 한다고 할때 아래와 같이 상대경로로 할 수 있습니다.

```typescript
import MyComponent from "../../../components/MyComponent"
```

Alias Path를 사용하면 다음 코드와 같이 깔끔하게 작성할 수 있습니다.

```typescript
import MyComponent from "@components/MyComponent"
```

Alias Path 설정을 위해 `vite.config.js` 파일과 `tsconfig.app.json` 설정 파일을 수정해야 합니다.

### 2.1. tsconfig.app.json 수정

typescript 컴파일시 오류가 발생하지 않도록, `tsconfig.app.json`에 설정을 해줘야 합니다.

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2.1. vite.config.js 설정

`vite.config.js` 파일을 다음 코드와 같이 수정합니다

```javascript
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

위 코드에서 `resolve.alias`를 사용하여 `@`를 `src` 디렉토리로 매핑합니다. 이제 아래 코드와 같이 `src` 디렉토리 내의 파일을 불러올 때 절대경로를 사용할 수 있습니다.

```javascript
// 상대 경로 사용시
import Header from '../../components/Header';
import Footer from '../../components/Footer';
```

```javascript
// Alias Path를 통해 절대경로 사용시
import Header from '@/components/Header';
import Footer from '@/components/Footer';
```

## 3. vite-tsconfig-paths 를 사용하여 설정하기

위와 같은 방법으로 설정할 수도 있지만, `tsconfig`와 `vite.config` 파일을 둘다 수정해줘야 하는 번거로움이 있습니다. `vite-tsconfig-paths` 라이브러리를 사용하면 tsconfig 하나만 수정하여 설정할 수도 있습니다.

우선 라이브러리를 설치합니다.

```shell
yarn add vite-tsconfig-paths
```

`tsconfig.app.json` 파일은 동일하게 수정을 합니다

```json
{
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

vite.config.js 파일에 방금 설치한 `vite-tsconfig-paths` 플러그인을 적용합니다.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```


## Reference

- [https://www.npmjs.com/package/vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths)
