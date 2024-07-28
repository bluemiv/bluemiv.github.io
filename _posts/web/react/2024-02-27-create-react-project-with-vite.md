---
title: Vite로 React 프로젝트 생성하기
description: 이 글에서는 Vite로 React 프로젝트를 생성하는 방법에 대해 소개합니다.
date: 2024-02-27 17:29:21 +0900
last_modified_at: 2024-02-27 17:29:21 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, vite ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-27-create-react-project-with-vite/thumbnail.webp
  alt: Vite로 React 프로젝트 생성하기
---

## 1. Vite란?

`Vite`는 프랑스어로 `quick`이라는 뜻을 가지며, 툴 이름과 같이 빠른 속도 자랑하는 Front-end 빌드 도구입니다.

> Vite는 어떻게 읽어야 할까요? 바이트가 아니고, 비트(veet)라고 읽습니다.
{: .prompt-tip }

## 2. Vite 설치 및 프로젝트 생성

### 2.1. Vite 설치 및 프로젝트 생성

터미널을 열고 아래 명령어를 실행하여 Vite 프로젝트를 생성합니다.

`yarn create vite [app name] --template [template]`

```bash
yarn create vite my-app --template react
````

만약, Typescript 기반의 React 프로젝트를 생성하고 싶다면, template에 `react-ts`로 입력합니다.

```bash
yarn create vite my-app --template react-ts
````

![Vite 설치 및 프로젝틋 생성](/assets/img/posts/web/react/2024-02-27-create-react-project-with-vite/ex1.webp)
_Vite 설치 및 프로젝틋 생성_

### 2.2. 의존성 설치

프로젝트 디렉토리로 이동한 후, 다음 명령어로 필요한 의존성을 설치합니다.

```bash
cd my-app
yarn install
```

### 2.3. 프로젝트 실행

```bash
yarn dev
```

명령어를 실행하면 터미널에 로컬 개발 서버 주소가 출력됩니다. 브라우저에서 해당 주소로 접속하면 React 애플리케이션이 동작하는 것을 확인할 수 있습니다.

![앱 실행](/assets/img/posts/web/react/2024-02-27-create-react-project-with-vite/ex2.webp)
_앱 실행_

![앱 실행 화면](/assets/img/posts/web/react/2024-02-27-create-react-project-with-vite/ex3.webp)
_앱 실행 화면_

## 3. 프로젝트 구조

Vite로 생성된 React 프로젝트의 기본 구조는 다음과 같습니다.

```plaintext
my-react-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

각 디렉토리와 파일의 역할을 간단히 설명하자면

- `public/`: 정적 파일들을 보관하는 곳
- `src/`: 소스 코드들이 위치한 디렉토리
- `vite.config.js`: Vite 설정 파일

## 4. 빌드 및 배포

### 4.1. 프로젝트 빌드

아래 명령어로 프로젝트를 빌드합니다.

```bash
yarn build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

![앱 빌드](/assets/img/posts/web/react/2024-02-27-create-react-project-with-vite/ex4.webp)
_앱 빌드_

### 4.2. 정적 서버에서 배포

생성된 `dist` 폴더를 정적 서버에 배포하면 애플리케이션이 동작합니다. 예를 들어, `serve`를 사용하여 배포할 수 있습니다.

```bash
yarn global add serve
``` 

```bash
yarn server ./dist
```
