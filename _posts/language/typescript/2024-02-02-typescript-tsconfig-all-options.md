---
title: 타입스크립트 tsconfig 모든 옵션 정리
description: 타입스크립트(TypeScript)는 자바스크립트(JavaScript)의 슈퍼셋으로, 정적 타입을 지원하여 대규모 프로젝트에서 코드의 안정성과 가독성을 높여줍니다. 타입스크립트를 효과적으로 사용하려면 tsconfig.json 파일을 통해 다양한 컴파일 옵션을 설정할 수 있습니다. 이 글에서는 tsconfig.json 파일의 모든 옵션을 설명합니다.
date: 2024-02-02 20:41:51 +0900
last_modified_at: 2024-02-02 20:41:51 +0900
categories: [ Language, TypeScript ]
tags: [ ts, typescript, 타입스크립트, tsconfig, es5, commonjs, cjs ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/typescript/2024-02-02-typescript-tsconfig-all-options/thumbnail.webp
  alt: 타입스크립트 tsconfig 모든 옵션 정리
---

## 1. tsconfig.json 파일

타입스크립트 프로젝트에서 `tsconfig.json` 파일은 컴파일러 옵션과 파일 포함/제외(include/exclude) 규칙을 정의하는 역할을 합니다.
tsconfig 파일을 통해 프로젝트의 빌드 설정을 한 곳에서 관리할 수 있습니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

위 예시는 타입스크립트 컴파일러가 `ES5`로 타겟팅하고, `CommonJS` 모듈을 사용하도록 적용한 예입니다. 그리고, `src` 디렉토리의 모든 파일을 포함하고, `node_modules` 디렉토리를 제외하도록 설정했습니다.

## 2. 컴파일러 옵션 (compilerOptions)

`compilerOptions` 객체는 타입스크립트 컴파일러의 설정 속성들을 정의할 수 있도록 합니다.

### 2.1. target

`target` 옵션은 컴파일된 자바스크립트 코드의 버전을 지정합니다. 예를 들어, `ES5`, `ES6`, `ESNext` 등이 있습니다.

```json
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

위 설정은 타입스크립트 코드를 `ES6`로 컴파일합니다. 위 설정으로 모던 자바스크립트 기능을 사용할 수 있습니다.

### 2.2. module

`module` 옵션은 모듈 시스템을 지정합니다. 주요 값으로는 `commonjs`, `amd`, `umd`, `es6` 등이 있습니다.

```json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

이 설정은 타입스크립트 모듈을 `CommonJS` 모듈로 컴파일합니다. Node.js 환경에서 주로 사용됩니다.

### 2.3. lib

`lib` 옵션은 컴파일 시 참조할 표준 라이브러리를 지정하는 데 사용됩니다. 예를 들어, `ES6`, `DOM`, `es2015.collection`, `es2015`, `es2017.object` 등이 있습니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "es2015", "es2017.object"]
  }
}
```

위의 예시에서 lib 옵션은 다음과 같은 라이브러리를 포함하도록 설정합니다:

- `dom`: 브라우저 환경에서 사용하는 DOM API 정의 파일
- `es2015`: ECMAScript 2015 표준 라이브러리
- `es2017.object`: ECMAScript 2017에서 추가된 Object 관련 기능들

### 2.4, allowJs

`allowJs` 옵션은 자바스크립트 파일을 타입스크립트 프로젝트에 포함할지 여부를 지정합니다.

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

### 2.5. checkJs

`checkJs` 옵션은 자바스크립트 파일에 대해 타입 검사를 수행할지 여부를 지정합니다.

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

### 2.6. jsx

`jsx` 옵션은 JSX 코드의 처리를 지정합니다. 주요 값으로는 `preserve`, `react`, `react-native` 등이 있습니다.

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

위 설정은 JSX 코드를 `React`로 처리합니다.

### 2.7. declaration

`declaration` 옵션은 타입 선언 파일(`.d.ts`)을 생성할지 여부를 지정합니다.

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

> `.d.ts` 파일은 TypeScript에서 타입 정의(declaration)를 제공하여, JavaScript 코드와 외부 라이브러리의 타입 정보를 명시적으로 나타내는 파일입니다.
{: .prompt-info }

### 2.8. sourceMap

`sourceMap` 옵션은 소스 맵 파일을 생성할지 여부를 지정합니다. 소스 맵은 디버깅 시 원본 소스 코드를 참조할 수 있게 해주는 역할을 합니다.

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

### 2.9. outFile

`outFile` 옵션은 모든 출력 파일을 하나의 파일로 병합합니다. 이 옵션은 `module` 옵션이 `amd` 또는 `system`으로 설정된 경우에만 유효합니다.

```json
{
  "compilerOptions": {
    "outFile": "./dist/main.js"
  }
}
```

위 설정은 모든 출력 파일을 `main.js` 파일로 합쳐줍니다.

### 2.10. outDir

`outDir` 옵션은 컴파일된 파일이 출력될 디렉토리를 지정합니다.

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

위 설정은 컴파일된 파일을 `dist` 디렉토리에 저장합니다.

### 2.11. rootDir

`rootDir` 옵션은 소스 파일의 루트 디렉토리를 지정합니다.

```json
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

위 설정은 소스 파일의 루트 디렉토리를 `src`로 지정합니다.

### 2.12. strict

`strict` 옵션은 엄격한 타입 검사를 활성화합니다. 이 옵션을 사용하면 타입스크립트의 여러 엄격한 검사 규칙이 동시에 적용됩니다.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

> `strict` 옵션은 TypeScript 컴파일러에 엄격한 타입 검사를 적용하는 설정입니다. 이를 활성화하면 `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` 등을 포함한 여러 엄격한 타입 검사 규칙이 자동으로 적용됩니다. 이는 코드의 타입 안전성을 높이고 잠재적인 오류를 줄이는 데 도움을 줍니다.
{: .prompt-info }


### 2.13. noImplicitAny

`noImplicitAny` 옵션은 암시적인 `any` 타입을 허용하지 않습니다.

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

### 2.14. strictNullChecks

`strictNullChecks` 옵션은 `null`과 `undefined` 값을 엄격하게 검사합니다.

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### 2.15. esModuleInterop

`esModuleInterop` 옵션은 CommonJS와 ES 모듈 간의 호환성을 활성화합니다.

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

위 설정은 CommonJS와 ES 모듈 간의 호환성을 가지게 됩니다.

### 2.16 skipLibCheck

`skipLibCheck` 옵션은 라이브러리 파일(`.d.ts`)의 타입 검사를 건너뜁니다.

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

## 3. 파일 포함 및 제외 설정

`include`와 `exclude` 옵션을 사용하여 컴파일에 포함할 파일과 제외할 파일을 지정할 수 있습니다.

### 3.1. include

`include` 옵션은 컴파일에 포함할 파일 경로를 지정합니다. 경로는 `glob` 패턴을 사용할 수 있습니다.

> glob 패턴은 파일 시스템 내에서 파일과 디렉토리를 검색하고 필터링하는 데 사용되는 문자열 패턴 매칭 방식입니다.
{: .prompt-info }

```json
{
  "include": [
    "src/**/*"
  ]
}
```

위 설정은 `src` 디렉토리의 모든 파일을 포함합니다.

### 3.2. exclude

`exclude` 옵션은 컴파일에서 제외할 파일 경로를 지정합니다.

```json
{
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

위 설정은 `node_modules`와 `dist` 디렉토리를 컴파일에서 제외합니다.
