---
title: TypeScript에서 Partial, Readonly, Record, Pick 사용법
description: TypeScript에서는 자주 사용되는 타입 변환을 위한 유틸리티 타입들이 있습니다. 이 글에서는 Partial<T>, Readonly<T>, Record<K, T>, Pick<T, K>의 사용법을 설명합니다.
date: 2024-02-15 02:54:46 +0900
last_modified_at: 2024-02-15 02:54:46 +0900
categories: [ Language, TypeScript ]
tags: [ ts, typescript, 타입스크립트, utility types, partial, readonly, record, pick ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/typescript/2024-02-15-typescript-utility-types/thumbnail.webp
  alt: TypeScript에서 Partial, Readonly, Record, Pick 사용법
---

## 1. Partial<T>

`Partial<T>`는 주어진 타입 `T`의 모든 프로퍼티를 선택적으로 만듭니다. 즉, 해당 타입의 모든 속성이 필수가 아닌 옵션으로 변환됩니다.

### 1.1. 기본 문법

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### 1.2. 사용 예시

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return {...todo, ...fieldsToUpdate};
}

const todo: Todo = {
  title: "TypeScript 배우기",
  description: "TypeScript 공식문서를 보고 공부합시다.",
  completed: false
};

const updatedTodo = updateTodo(todo, {completed: true});
```

## 2. Readonly<T>

`Readonly<T>`는 주어진 타입 `T`의 모든 프로퍼티를 읽기 전용으로 만듭니다. 이렇게 하면 해당 프로퍼티는 변경할 수 없게 됩니다.

### 2.1. 기본 문법

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### 2.2. 사용 예시

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: Readonly<Todo> = {
  title: "TypeScript 배우기",
  description: "TypeScript 공식문서를 보고 공부합시다.",
  completed: false
};

todo.completed = true; // Error: 읽기 전용 속성이므로 'completed'에 재할당할 수 없습니다.
```

## 3. Record<K, T>

`Record<K, T>`는 키 타입 `K`와 값 타입 `T`를 사용하여 객체 타입을 만듭니다. `K`는 문자열, 숫자, 심볼과 같은 기본 타입이어야 합니다.

### 3.1. 기본 문법

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 3.2. 사용 예시

```typescript
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

const pageInfo: Record<Page, PageInfo> = {
  home: {title: "Home Page"},
  about: {title: "About Page"},
  contact: {title: "Contact Page"}
};

console.log(pageInfo.home.title); // Home Page
```

## 4. Pick<T, K>

`Pick<T, K>`는 주어진 타입 `T`에서 키 `K`에 해당하는 프로퍼티만 선택하여 새로운 타입을 만듭니다. `K`는 `T`의 키 중 일부이어야 합니다.

### 4.1. 기본 문법

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### 4.2. 사용 예시

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "TypeScript 배우기",
  completed: false
};

console.log(todo); // { title: 'TypeScript 배우기', completed: false }
```
