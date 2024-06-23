---
title: 타입스크립트 타입 선언 종류
description: 타입스크립트의 타입 선언은 크게 여러 종류로 나눌 수 있습니다. 이 글에서는 타입스크립트에서 사용되는 다양한 타입 선언 종류에 설명합니다.
date: 2024-02-03 18:48:42 +0900
last_modified_at: 2024-02-03 18:48:42 +0900
categories: [ Language, TypeScript ]
tags: [ ts, typescript, 타입스크립트, primitive types, boolean, number, string, index types ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/typescript/2024-02-03-typescript-types/thumbnail.webp
  alt: 타입스크립트 타입 선언 종류
---

## 1. 기본 타입 (Primitive Types)

타입스크립트의 기본 타입은 자바스크립트의 기본 타입과 비슷합니다.`boolean`, `number`, `string`, `null`, `undefined` 등이 있습니다.

```typescript
const isActive: boolean = true;
const age: number = 30;
const username: string = "홍길동";
```

기본 타입은 자바스크립트와 동일하게 동작하지만, 정적 타입 검사에 의해 런타임 오류를 미리 방지할 수 있습니다.

## 2. 배열 타입 (Array Types)

배열 타입은 특정 타입의 요소들로만 이루어진 배열을 정의할 때 사용됩니다. 두 가지 방법으로 선언할 수 있습니다: `타입[]` 또는 `Array<타입>`.

```typescript
const numbers: number[] = [1, 2, 3, 4];
const names: Array<string> = ["Alice", "Bob", "Charlie"];
```

배열 타입을 사용하면 배열 요소의 타입을 강제할 수 있어 보다 안전한 코드를 작성할 수 있습니다.

## 3. 튜플 (Tuple)

튜플은 고정된 개수의 요소를 가지며, 각 요소의 타입이 미리 정해져 있는 배열입니다. 자바스크립트에는 없는 타입스크립트만의 고유한 타입입니다.

```typescript
const user: [string, number] = ["Alice", 25];
```

위 예시에서 `user`는 첫 번째 요소가 `string`, 두 번째 요소가 `number`인 배열입니다. 튜플을 사용하면 서로 다른 타입의 값을 함께 묶어서 다룰 수 있습니다.

## 4. 열거형 (Enum)

열거형은 관련된 상수들의 집합을 정의할 때 사용됩니다. 각 상수에는 자동으로 숫자 값이 할당되며, 원하는 값으로 변경할 수도 있습니다.

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up;
```

열거형을 사용하면 코드의 가독성과 유지보수성을 높일 수 있습니다.

## 5. 객체 타입 (Object Types)

객체 타입은 객체의 구조를 정의합니다. 각 속성의 이름과 타입을 지정할 수 있습니다.

```typescript
interface User {
  name: string;
  age: number;
  isAdmin?: boolean; // 선택적 속성
}

let user: User = {
  name: "홍길동",
  age: 30
};
```

## 6. 유니언 타입 (Union Types)

유니언 타입은 하나 이상의 타입을 가질 수 있는 변수를 정의할 때 사용됩니다. `|` 연산자를 사용하여 여러 타입을 조합할 수 있습니다.

```typescript
let value: number | string;
value = 10;
value = "Hello";
```

유니언 타입을 사용하면 변수에 여러 가지 타입의 값을 할당할 수 있어 유연성이 높아집니다.

## 7. 교차 타입 (Intersection Types)

교차 타입은 여러 타입을 결합하여 하나의 타입으로 만드는 것입니다. `&` 연산자를 사용합니다.

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

let staff: Staff = {
  name: "Alice",
  employeeId: 1234
};
```

교차 타입을 사용하면 여러 타입의 속성을 모두 갖는 객체를 정의할 수 있습니다.

## 8. 제네릭 (Generics)

제네릭은 타입을 매개변수로 받는 타입입니다. 재사용성을 높이고, 타입 안정성을 유지할 수 있게 합니다.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("Hello");
identity<number>(10);
```

제네릭을 사용하면 함수, 클래스, 인터페이스를 다양한 타입과 함께 사용할 수 있어 코드의 유연성과 재사용성을 높일 수 있습니다.

## 9. 타입 별칭 (Type Aliases)

타입 별칭은 새로운 이름을 기존 타입에 부여하는 것입니다. `type` 키워드를 사용합니다.

```typescript
type Point = {
  x: number;
  y: number;
};

let point: Point = {x: 10, y: 20};
```

타입 별칭을 사용하면 긴 타입을 간결하게 표현할 수 있으며, 복잡한 타입을 가독성 있게 관리할 수 있습니다.

## 10. 리터럴 타입 (Literal Types)

리터럴 타입은 특정 값만을 가질 수 있는 타입입니다. 문자열 리터럴, 숫자 리터럴, 불리언 리터럴 등이 있습니다.

```typescript
let direction: "left" | "right" = "left";
```

리터럴 타입을 사용하면 변수의 값을 제한할 수 있어 의도를 명확히 하고, 타입 안전성을 높일 수 있습니다.

## 11. 타입 단언 (Type Assertions)

타입 단언은 타입스크립트가 타입을 추론할 수 없거나, 더 구체적인 타입이 필요할 때 사용됩니다. `as` 키워드 또는 `<타입>` 문법을 사용합니다.

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 12. 함수 타입 (Function Types)

함수 타입은 함수의 매개변수와 반환 타입을 정의합니다. 화살표 함수 문법을 사용하여 간결하게 표현할 수 있습니다.

```typescript
let add: (a: number, b: number) => number = (a, b) => a + b;
```

함수 타입을 명시하면 함수의 시그니처를 명확하게 정의할 수 있어 코드의 가독성과 유지보수성을 높일 수 있습니다.

## 13. 고급 타입 (Advanced Types)

타입스크립트에는 위에서 언급한 기본 타입 외에도 다양한 타입이 있습니다. 예를 들어 `조건부 타입(Conditional Types)`, `매핑된 타입(Mapped Types)`, `인덱스 타입(Index Types)` 등이 있습니다.

### 13.1. 조건부 타입 (Conditional Types)

조건부 타입은 조건에 따라 타입을 선택하는 타입입니다. `extends` 키워드를 사용합니다.

```typescript
type IsString<T> = T extends string ? "yes" : "no";

let result1: IsString<string> = "yes";
let result2: IsString<number> = "no";
```

### 13.2. 매핑된 타입 (Mapped Types)

매핑된 타입은 기존 타입의 각 속성을 변환하여 새로운 타입을 만드는 방법입니다.

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

let readonlyPerson: Readonly<Person> = {
  name: "아이유",
  age: 31
};
```

위 예시는 객체의 값에 `readonly` 를 부여합니다.

### 13.3. 인덱스 타입 (Index Types)

인덱스 타입은 객체의 속성 이름을 동적으로 정의할 수 있는 방법입니다.

```typescript
interface StringMap {
  [key: string]: string;
}

const myMap: StringMap = {
  "key1": "value1",
  "key2": "value2"
};
```

인덱스 타입을 사용하면 키-값 쌍을 동적으로 정의할 수 있어 유연한 타입 선언이 가능합니다.
