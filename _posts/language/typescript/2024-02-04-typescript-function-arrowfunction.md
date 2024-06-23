---
title: 타입스크립트 일반 함수와 화살표 함수에서 타입 다루기
description: 함수 정의 시 타입을 명시하는 것은 코드의 가독성과 오류 방지에 큰 도움이 됩니다. 이 글에서는 타입스크립트에서 일반 함수와 화살표 함수에서 타입을 다루는 방법에 대해 설명합니다.
date: 2024-02-04 20:44:44 +0900
last_modified_at: 2024-02-04 20:44:44 +0900
categories: [ Language, TypeScript ]
tags: [ ts, typescript, 타입스크립트, function, arrow function, 화살표 함수, 함수 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/typescript/2024-02-04-typescript-function-arrowfunction/thumbnail.webp
  alt: 타입스크립트 일반 함수와 화살표 함수에서 타입 다루기
---

## 1. 일반 함수에서 타입 다루기

일반 함수는 `function` 키워드를 사용하여 정의됩니다. 타입스크립트에서는 함수의 매개변수와 반환값에 대해 타입을 지정할 수 있습니다.

### 1.1. 함수 매개변수 타입 지정

일반 함수의 매개변수에 타입을 지정하는 방법은 다음과 같습니다:

```typescript
function greet(name: string): string {
  return `안녕! ${name}야!`;
}

const greeting = greet("철수");
console.log(greeting);  // 출력: 안녕! 철수야!
```

위 코드에서 `greet` 함수는 `name` 매개변수를 `string` 타입으로 받으며, 반환 타입도 `string`으로 지정하였습니다.

### 1.2. 함수 반환 타입 지정

반환 타입을 지정함으로써 함수가 올바른 타입의 값을 반환하도록 강제할 수 있습니다:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const sum = add(5, 10);
console.log(sum);  // 출력: 15
```

`add` 함수는 두 개의 `number` 타입 매개변수를 받아 `number` 타입을 반환합니다. 반환 타입을 명시하지 않으면 타입스크립트가 자동으로 추론하지만, 명시적으로 지정하는 것이 더 명확합니다.

## 2. 화살표 함수에서 타입 다루기

화살표 함수는 ES6에서 도입된 문법입니다. 화살표 함수에서도 매개변수와 반환값에 대해 타입을 지정할 수 있습니다.

### 2.1. 매개변수 타입 지정

화살표 함수에서 매개변수의 타입을 지정하는 방법은 다음과 같습니다:

```typescript
const multiply = (x: number, y: number): number => {
  return x * y;
}

const result = multiply(4, 5);
console.log(result);  // 출력: 20
```

위 코드에서 `multiply` 함수는 두 개의 `number` 타입 매개변수를 받고, `number` 타입을 반환합니다.

### 2.2. 반환 타입 추론

반환 타입을 생략해도 타입스크립트는 자동으로 반환 타입을 추론합니다:

```typescript
const subtract = (a: number, b: number) => a - b;

const difference = subtract(10, 4);
console.log(difference);  // 출력: 6
```

타입스크립트는 `subtract` 함수의 반환 타입을 `number`로 추론합니다. 그러나 코드의 명확성을 위해 반환 타입을 명시하는 것이 좋습니다.

## 3. 복잡한 타입 다루기

타입스크립트에서는 제네릭과 같은 복잡한 타입을 사용하여 더 유연하고 강력한 타입 검사를 수행할 수 있습니다.

### 3.1. 제네릭 함수

제네릭 함수를 사용하면 다양한 타입에서 유연하게 동작하도록 할 수 있습니다.

```typescript
function getArray<T>(items: T[]): T[] {
  return new Array<T>().concat(items);
}

const numberArray = getArray<number>([1, 2, 3, 4]);
const stringArray = getArray<string>(["a", "b", "c", "d"]);

console.log(numberArray);  // 출력: [1, 2, 3, 4]
console.log(stringArray);  // 출력: ["a", "b", "c", "d"]
```

제네릭 타입 `T`를 사용하여 함수가 다양한 타입의 배열을 처리할 수 있습니다. `getArray` 함수는 입력 배열과 동일한 타입의 배열을 반환합니다.

### 3.2. 인터페이스와 타입 앨리어스

인터페이스와 타입 앨리어스를 사용하여 복잡한 객체 타입을 정의하고 함수의 매개변수로 사용할 수 있습니다:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const createUser = (user: User): string => {
  return `유저 ${user.name}가 생성되었습니다.`;
}

const newUser = {
  name: "지수",
  age: 28,
  email: "jisu@gmail.com"
};

console.log(createUser(newUser));  // 출력: 유저 지수가 생성되었습니다.
```

## 4. 결론

일반 함수와 화살표 함수 모두 매개변수와 반환 타입을 명시적으로 지정함으로써 컴파일 타임에 오류를 방지하고, 유지보수가 용이한 코드를 작성할 수 있습니다.
또한, 제네릭과 인터페이스를 이용하면 더 유연하게 사용할 수 있습니다.
