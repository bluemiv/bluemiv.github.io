---
title: 자바스크립트 트랜스파일러(transpiler)
description: 자바스크립트에서 최신 문법과 기능을 오래된 브라우저나 환경에서 사용할 수 있게 하려면 트랜스파일러가 필요합니다. 이번 글에서는 자바스크립트 트랜스파일러가 무엇인지, 왜 필요한지, 그리고 대표적인 트랜스파일러인 Babel, SWC, TypeScript에 대해 설명합니다.
date: 2024-02-08 23:23:18 +0900
last_modified_at: 2024-02-08 23:23:18 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, 트랜스파일러, transpiler, babel, 바벨, swc, typescript, 타입스크립트 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-02-08-javascript-transpiler-tools/thumbnail.webp
  alt: 자바스크립트 트랜스파일러(transpiler)
---

## 1. 트랜스파일러란 무엇인가?

트랜스파일러(`transpiler`)는 한 프로그래밍 언어로 작성된 코드를 다른 프로그래밍 언어로 변환하는 도구입니다. 트랜스파일러는 컴파일러(`compiler`)와 비슷하지만, 컴파일러가 일반적으로 고수준 언어를
저수준 언어(예: 어셈블리어나 기계어)로 변환하는 반면, 트랜스파일러는 고수준 언어를 다른 고수준 언어로 변환합니다.


## 2. 왜 트랜스파일러가 필요한가?

최신 자바스크립트 기능은 개발자에게 많은 편의를 제공하지만, 모든 브라우저가 이를 지원하지는 않습니다. 특히 구형 브라우저나 특정 환경에서는 최신 자바스크립트 문법과 기능을 사용할 수 없기 때문에, 트랜스파일러를 사용하면 코드 호환성을 확보 할 수 있습니다.

- **브라우저 호환성**: 최신 문법을 사용하면서도 구형 브라우저 지원.
- **코드 유지보수성**: 최신 기능을 사용하여 코드의 가독성과 유지보수성 향상.
- **최신 기능 사용**: 최신 표준을 따르며 코드 작성 가능.

## 3. 대표적인 자바스크립트 트랜스파일러

### 3.1. Babel

`Babel`은 가장 널리 사용되는 자바스크립트 트랜스파일러로, 최신 ECMAScript 문법을 구형 브라우저에서도 실행 가능하게 변환합니다. Babel은 플러그인 시스템을 통해 확장 가능하며, 다양한 기능을 제공하는
플러그인을 통해 코드의 변환을 세밀하게 제어할 수 있습니다.


간략하게 Babel을 사용하여 최신 자바스크립트 문법을 ES5로 변환하는 방법은 아래와 같습니다.

- Babel 의존성 설치

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
# 또는
yarn add --dev @babel/core @babel/cli @babel/preset-env
```

- Babel 설정 파일(`.babelrc`) 작성

```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

- Babel로 코드 트랜스파일

```bash
babel src --out-dir lib
```

위 명령은 `src` 디렉토리의 모든 파일을 트랜스파일하여 `lib` 디렉토리에 저장합니다.

### 3.2. SWC

`SWC`는 빠른 속도를 자랑하는 자바스크립트/타입스크립트 트랜스파일러로, Rust로 작성되어 높은 성능을 발휘합니다.
SWC는 Babel과 유사한 기능을 제공하면서도 속도 면에서 더 뛰어납니다.


SWC를 사용하여 코드를 트랜스파일하는 방법은 아래와 같습니다.

- SWC 설치

```bash
npm install --save-dev @swc/core @swc/cli
# 또는
yarn add --dev @swc/core @swc/cli
```

- SWC 설정 파일(`.swcrc`) 작성

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}
```

- SWC로 코드 트랜스파일

```bash
swc src -d lib
```

위 명령은 `src` 디렉토리의 모든 파일을 트랜스파일하여 `lib` 디렉토리에 저장합니다.

### 3.3. TypeScript

TypeScript는 자바스크립트의 슈퍼셋으로, 정적 타입 검사와 최신 ECMAScript 기능을 제공합니다. TypeScript 컴파일러는 TypeScript 코드를 자바스크립트로 트랜스파일하며, 주로 `tsc`
명령어를 사용하여 트랜스파일 작업을 수행합니다.


TypeScript를 사용하여 코드를 트랜스파일하는 방법은 아래와 같습니다

- TypeScript 설치

```bash
npm install --save-dev typescript
# 또는
yarn add --dev typescript
```

- TypeScript 설정 파일(`tsconfig.json`) 작성

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "src"
  ]
}
```

- TypeScript로 코드 트랜스파일

```bash
tsc
```

위 명령은 `tsconfig.json` 파일에 설정된 옵션에 따라 `src` 디렉토리의 모든 TypeScript 파일을 트랜스파일합니다.

> tsconfig.json의 설정 옵션에 대해 자세한 내용이 궁금하시면, [이 글](/posts/typescript-tsconfig-all-options/)을 참고해주세요.
{: .prompt-tip }
