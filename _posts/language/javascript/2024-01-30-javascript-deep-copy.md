---
title: JavaScript 깊은 복사(deep copy)하는 방법
description: JavaScript에서 객체를 복사할 때, 얕은 복사(shallow copy)와 깊은 복사(deep copy)가 있습니다. 얕은 복사는 최상위 객체의 참조를 복사하는 반면, 깊은 복사는 객체와 그 내부의 모든 객체를 재귀적으로 복사하여 완전히 새로운 객체를 생성합니다. 이 글에서는 깊은 복사를 구현하는 방법에 대해 설명합니다.
date: 2024-01-30 23:00:54 +0900
last_modified_at: 2024-01-30 23:00:54 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, 복사, 깊은 복사, 얕은 복사, deep copy, shallow copy ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-30-javascript-deep-copy/thumbnail.webp
  alt: JavaScript 깊은 복사(deep copy)하는 방법
---

## 1. 얕은 복사와 깊은 복사

### 1.1. 얕은 복사 (Shallow Copy)

얕은 복사는 객체의 최상위 속성만 복사합니다. 즉, 중첩된 객체나 배열의 참조는 그대로 유지됩니다.

```javascript
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

shallowCopy.b.c = 3;
console.log(original.b.c);  // 출력: 3
```

위 예제에서 `shallowCopy`는 `original`의 얕은 복사본으로, `shallowCopy.b`는 여전히 `original.b`를 참조합니다. 따라서, `original.b.c`를 수정하면, `shallowCopy.b.c`도 영향을 받습니다.  

### 1.2. 깊은 복사 (Deep Copy)

깊은 복사는 객체와 그 내부의 모든 객체를 재귀적으로 복사하여 완전히 새로운 객체를 생성합니다. 따라서 원본 객체와 복사본은 독립적인 객체가 됩니다.

```javascript
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 3;
console.log(original.b.c);  // 출력: 2
```

위 예제에서 `deepCopy`는 `original`의 깊은 복사본으로, `deepCopy.b`는 `original.b`와 독립적인 객체입니다.

![shallow copy vs deep copy](/assets/img/posts/language/javascript/2024-01-30-javascript-deep-copy/copy-diff.webp)
_shallow copy vs deep copy_

## 2. 깊은 복사를 수행하는 방법

### 2.1. JSON 방법

`JSON.parse()`와 `JSON.stringify()`를 사용하여 깊은 복사를 수행할 수 있습니다. 이 방법은 객체가 JSON으로 표현될 수 있는 경우에만 사용 가능합니다.

```javascript
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

console.log(deepCopy);  // 출력: { a: 1, b: { c: 2 } }
```

이 방법은 간단하지만, 함수, `Date`, `undefined`, `Infinity`, `NaN`, `Map`, `Set` 등의 특수한 객체는 복사할 수 없습니다.

### 2.2. 재귀적 복사

재귀적으로 복사를 하여 깊은 복사를 수행할 수도 있습니다.

```javascript
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[key] = deepCopy(value);
        return acc;
    }, {});
}

const original = { a: 1, b: { c: 2 } };
const deepCopiedObject = deepCopy(original);

deepCopiedObject.b.c = 3;
console.log(original.b.c);  // 출력: 2
console.log(deepCopiedObject.b.c);  // 출력: 3
```

이 방법은 객체의 모든 속성을 순회하며 재귀적으로 복사합니다.

### 2.3. lodash 라이브러리 사용

`lodash` 라이브러리의 `cloneDeep` 메서드를 사용하면 간단하게 깊은 복사를 수행할 수 있습니다.

의존성을 설치하려면 아래 명령어를 사용하면 됩니다.

```bash
yarn add lodash
```

```javascript
const _ = require('lodash');

const original = { a: 1, b: { c: 2 } };
const deepCopiedObject = _.cloneDeep(original);

deepCopiedObject.b.c = 3;
console.log(original.b.c);  // 출력: 2
console.log(deepCopiedObject.b.c);  // 출력: 3
```

## 3. 성능

깊은 복사는 객체를 재귀적으로 탐색하므로, 큰 객체나 중첩된 객체의 깊은 복사는 성능에 영향을 미칠 수 있습니다. 성능이 중요한 경우에는 깊은 복사를 신중하게 사용해야 합니다.

## 4. 결론

JavaScript에서 깊은 복사를 수행하는 여러 방법을 살펴보았습니다. JSON 방법, 재귀적 복사 함수, `lodash` 라이브러리, 구조 분해와 재귀적 복사 방법을 통해 다양한 상황에서 깊은 복사를 수행할 수 있습니다. 깊은 복사는 객체의 완전한 복제를 보장하기 때문에 데이터의 무결성을 유지하는 데 중요한 역할을 합니다.
