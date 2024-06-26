---
title: TypeScript 제네릭(Generic) 타입
description: TypeScript에서 제네릭(Generic) 타입은 코드의 재사용성을 높이고, 타입의 유연성을 제공합니다. 이 글에서는 타입스크립트의 제네릭(generic)에 대해 설명합니다.
date: 2024-02-14 22:43:04 +0900
last_modified_at: 2024-02-14 22:43:04 +0900
categories: [ Language, TypeScript ]
tags: [ ts, typescript, 타입스크립트, generic type, generic, 제네릭 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/typescript/2024-02-14-typescript-generic/thumbnail.webp
  alt: TypeScript 제네릭(Generic) 타입
---

## 1. 제네릭 타입의 기본 개념

제네릭 타입은 타입을 함수나 클래스, 인터페이스의 매개변수로 사용하는 것입니다. 이렇게 하면 코드 작성 시점에 타입을 지정할 수 있고, 다양한 타입에 대해 동일한 로직을 적용할 수 있습니다.

### 1.1. 기본 문법

제네릭 타입을 선언하는 기본 문법은 다음과 같습니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

위 예제에서 `T`는 제네릭 타입 매개변수입니다. 함수 `identity`는 어떤 타입의 인수를 받아서 그대로 반환합니다.

### 1.2. 사용 예시

제네릭 함수를 호출할 때 타입을 명시할 수 있습니다.

```typescript
const output1 = identity<string>("Hello");
const output2 = identity<number>(42);
```

TypeScript가 타입을 추론할 수 있는 경우, 타입을 명시하지 않아도 됩니다.

```typescript
const output1 = identity("Hello");
const output2 = identity(42);
```

## 2. 제네릭 클래스

제네릭 타입은 클래스에서도 사용할 수 있습니다. 제네릭 클래스를 사용하면 다양한 타입을 처리할 수 있는 클래스 템플릿을 작성할 수 있습니다.

### 2.1. 기본 문법

제네릭 클래스를 선언하는 기본 문법은 다음과 같습니다.

```typescript
class GenericNumber<T> {
  zero: T;
  add: (x: T, y: T) => T;
}
```

### 2.2. 사용 예시

제네릭 클래스의 인스턴스를 생성할 때 타입을 지정합니다.

```typescript
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zero = 0;
myGenericNumber.add = (x, y) => x + y;
```

## 3. 제네릭 인터페이스

인터페이스에서도 제네릭 타입을 사용할 수 있습니다. 제네릭 인터페이스는 함수, 클래스, 기타 구조체와 함께 사용할 수 있습니다.

### 3.1. 기본 문법

제네릭 인터페이스를 선언하는 기본 문법은 다음과 같습니다.

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}
```

### 3.2. 사용 예시

제네릭 인터페이스를 구현하는 함수나 클래스에서 타입을 지정합니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity;
```

## 4. 제네릭 제약 조건

제네릭 타입에 제약 조건을 추가하면 특정 타입만 사용할 수 있도록 제한할 수 있습니다. 이를 통해 타입 안전성을 더욱 높일 수 있습니다.

### 4.1. 기본 문법

제네릭 타입에 제약 조건을 추가하는 기본 문법은 다음과 같습니다.

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

### 4.2. 사용 예시

제약 조건을 만족하는 타입만 사용할 수 있습니다.

```typescript
loggingIdentity({length: 10, value: "Hello"}); // OK
loggingIdentity(42); // Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
```

## 5. 제네릭 타입의 고급 활용

### 5.1. 여러 타입 매개변수

제네릭 타입은 여러 타입 매개변수를 가질 수 있습니다.

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return {...obj1, ...obj2};
}

const mergedObj = merge({name: "Alice"}, {age: 30});
console.log(mergedObj.name); // Alice
console.log(mergedObj.age); // 30
```

### 5.2. 제네릭 타입 매개변수의 기본값

제네릭 타입 매개변수에 기본값을 지정할 수 있습니다.

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return Array.from({length}, () => value);
}

const stringArray = createArray(3, "Hello"); // ["Hello", "Hello", "Hello"] 
const numberArray = createArray<number>(5, 45); // [45, 45, 45, 45, 45]
```

### 5.3. 제네릭 유틸리티 타입

TypeScript에는 자주 사용되는 제네릭 유틸리티 타입들이 내장되어 있습니다. 예를 들어, `Partial<T>`, `Readonly<T>`, `Record<K, T>`, `Pick<T, K>` 등이 있습니다.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
type ReadonlyTodo = Readonly<Todo>;

const todo: PartialTodo = {
  title: "TypeScript 배우기"
};

const readonlyTodo: ReadonlyTodo = {
  title: "TypeScript 배우기" ,
  description: "TypeScript 공식문서를 보고 공부합시다.",
  completed: false
};
```

> generic utility type에 대해 더 궁금하다면 [이 글](/posts/typescript-utility-types/)을 참고해주세요.
{: .prompt-info }

## 6. 결론

TypeScript의 제네릭 타입은 코드의 재사용성을 높이고, 다양한 타입에 대해 유연하게 대응할 수 있게 해줍니다. 제네릭 타입을 활용하면 유지보수하기 쉬운 코드를 작성할 수 있습니다.
