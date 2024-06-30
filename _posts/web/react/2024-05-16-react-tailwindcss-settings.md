---
title: React 프로젝트에 tailwindcss 설정하기
description: 이 글에서는 TypeScript 기반의 React 프로젝트에서 tailwindcss를 적용하는 방법에 대해 설명합니다.
date: 2024-05-16 12:30:23 +0900
last_modified_at: 2024-05-16 12:30:23 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, tailwindcss, typescript ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-05-16-react-tailwindcss-settings/thumbnail.webp
  alt: React 프로젝트에 tailwindcss 설정하기
---

## 1. 프로젝트 생성

먼저, TypeScript기반의 React 프로젝트를 생성합니다. 이 글에서는 `create-react-app`을 사용하여 생성합니다.

```bash
npx create-react-app my-tailwind-app --template typescript
```

또는 yarn을 사용하는 경우,

```bash
yarn create react-app my-tailwind-app --template=typescript
```

프로젝트 생성 후, 생성된 디렉토리로 이동합니다.

```bash
cd my-tailwind-app
```

## 2. tailwindcss 의존성 설치

다음으로, tailwindcss 의존성을 설치합니다. tailwindcss는 `PostCSS`를 사용하여 CSS를 처리합니다.

```bash
npm install -D tailwindcss
npx tailwindcss init
```

## 3. TailwindCSS 구성

`tailwind.config.js` 파일을 열어 tailwindcss 설정을 구성합니다.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
{: file='tailwind.config.js'}

content 옵션을 설정하여 `src` 디렉토리 내의 모든 파일을 검사하도록 합니다.

## 4. tailwindcss CSS 파일 추가

`src/index.css` 파일의 내용에 아래와 같이 추가합니다. 

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
{: file='src/index.css'}

해당 코드는 tailwindcss의 기본 스타일, 컴포넌트, 유틸리티 클래스를 사용하겠다는 의미입니다.

## 5. CSS 파일 import

`src/index.tsx` 파일을 열어 `index.css` 파일을 불러옵니다. 

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // import를 통해 index.css를 가져옴
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```
{: file='src/index.tsx'}

## 6. tailwindcss 사용해보기

`src/App.tsx` 파일을 열어 tailwindcss 클래스를 사용해 봅니다.

```tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Hello tailwindcss!
      </h1>
    </div>
  );
}

export default App;
```

이렇게 하면 tailwindcss의 유틸리티 클래스를 사용하여 쉽게 스타일링을 할 수 있습니다.

![tailwindcss example](/assets/img/posts/web/react/2024-05-16-react-tailwindcss-settings/ex.webp)
_tailwindcss example_
