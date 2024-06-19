---
title: JavaScript의 반복문(for, while, do while, for in, for of)
description: JavaScript에서 반복문은 특정 코드 블록을 여러 번 실행할 때 사용됩니다. 반복문은 다양한 형태가 있습니다. 이 글에서는 for, while, do while, for...in, for...of 반복문에 대해 살펴봅니다.
date: 2024-01-07 03:44:12 +0900
last_modified_at: 2024-01-07 03:44:12 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, for, while, do while, for in, for of, 반복문 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-07-javascript-loops-guide/thumbnail.webp
  alt: JavaScript의 반복문(for, while, do while, for in, for of)
---

## 1. 반복문의 기본 개념

반복문은 지정된 조건이 참(`true`)이면 코드 블록을 반복 실행합니다. 이를 통해 동일한 작업을 여러 번 수행할 수 있습니다.

### 1.1. for 문

`for` 문은 제일 많이 사용하는 반복문으로, 반복 횟수가 명확할 때 사용합니다.

```javascript
for (초기화; 조건; 증감) {
    // 반복 실행할 코드
}
```

**[예제]**

1부터 5까지의 숫자를 출력하는 예제입니다.

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

위 예제에서 `i`는 1로 초기화되고, 조건 `i <= 5`가 참인 동안 반복됩니다.
`i++`에 의해, 각 반복마다 `i`가 1씩 증가합니다.

### 1.2. while 문

`while` 문은 조건이 참인 동안 코드를 반복 실행합니다.

```javascript
while (조건) {
    // 반복 실행할 코드
}
```

**[예제]**

5보다 작은 숫자를 출력하는 예제입니다.

```javascript
let number = 0;

while (number < 5) {
    console.log(number);
    number++;
}
```

위 예제에서 `number`는 0으로 초기화되고, 조건 `number < 5`가 참인 동안 반복됩니다.
`number++;`에 의해 각 반복마다 `number`가 1씩 증가합니다.

```text
// 결과 값
0
1
2
3
4
```

### 1.3. do while 문

`do while` 문은 `do`의 코드 블록을 최소 한 번 실행한 후, `while`의 조건을 검사합니다. 따라서, 최소 1번 실행한 후 반복을 수행해야 하는 경우 사용합니다.

```javascript
do {
    // 반복 실행할 코드
} while (조건);
```

**[예제]**

5보다 작은 숫자를 최소 한 번 출력하는 예제입니다.

```javascript
let count = 0;

do {
    console.log(count);
    count++;
} while (count < 5);
```

위 예제에서 `count`는 0으로 초기화되고, 코드 블록이 최소 한 번 실행된 후 조건 `count < 5`가 참인 동안 반복됩니다.

```text
// 결과 값
0
1
2
3
4
```

### 1.4. for...in 문

`for...in` 문은 객체의 속성을 반복할 때 사용합니다.

```javascript
for (let 변수 in 객체) {
    // 반복 실행할 코드
}
```

**[예제]**

객체의 속성과 값을 출력하는 예제입니다.

```javascript
const person = {
    name: "윈터",
    age: 23,
    city: "부산"
};

for (let key in person) {
    console.log(key + ": " + person[key]);
}
```

위 예제에서 `key`는 `person` 객체의 각 속성을 순차적으로 가리키며, 각 속성과 그 값을 출력합니다.

```text
// 결과 값
name: 윈터
age: 23
city: 부산
```

### 1.5. for...of 문

`for...of` 문은 배열과 같은 이터러블 객체를 반복할 때 사용합니다.

```javascript
for (let 변수 of 이터러블) {
    // 반복 실행할 코드
}
```

**[예제]**

배열의 요소를 출력하는 예제입니다.

```javascript
const numbers = [1, 2, 3, 4, 5];

for (let number of numbers) {
    console.log(number);
}
```

위 예제에서 `number`는 `numbers` 배열의 각 요소를 순차적으로 가리키며, 각 요소를 출력합니다.

```text
// 결과 값
1
2
3
4
5
```

for...in과 for...of에 대한 정리된 youtube 영상도 있어서 가져와봤습니다.

{% include embed/youtube.html id='c5a4sNshBA4' %}

## 2. 반복문 제어

반복문 실행을 제어하기 위해 `break`와 `continue` 문을 사용할 수 있습니다.

### 2.1. break 문

`break` 문은 반복문을 즉시 종료합니다. 

**[예제]**

숫자가 3이면 반복을 종료하는 예제 코드입니다.

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        break;
    }
    console.log(i);
}
```

위 예제에서 `i`가 3일 때 `break` 문이 실행되어 반복문이 종료됩니다.

```text
// 결과 값
1
2
```

### 2.2. continue 문

`continue` 문은 현재 반복을 건너뛰고 다음 반복을 실행합니다.

**[예제]**

숫자가 3이면 건너뛰는 예제 코드입니다.

```javascript
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;
    }
    console.log(i);
}
```

위 예제에서 `i`가 3일 때 `continue` 문이 실행되어 현재 반복을 건너뛰고 다음 반복을 실행합니다.

```text
// 결과 값
1
2
4
5
```

> break와 continue의 차이는 예제와 같이 break는 반복문이 종료되어버리지만, continue는 현재 반복(loop)만 종료되고 다음 반복을 실행합니다.
{: .prompt-info }
 
## 3. 중첩 반복문

반복문은 중첩하여 사용할 수 있습니다. 이를 통해 다차원 배열과 같은 복잡한 데이터 구조를 쉽게 처리할 수 있습니다.

**[예제]**

2차원 배열의 요소를 출력하는 예제 코드입니다.

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        console.log(matrix[row][col]);
    }
}
```

위 예제에서 `matrix`는 2차원 배열이며, 중첩된 `for` 문을 사용하여 각 요소를 출력합니다.


```text
// 결과 값
1
2
3
4
5
6
7
8
9
```

## 4. 결론

JavaScript의 반복문은 반복 작업을 수행할 수 있게 해줍니다. `for`, `while`, `do while`, `for...in`, `for...of` 문을 사용하여, 다양한 상황에 맞는 반복 작업을 구현할 수 있습니다.
