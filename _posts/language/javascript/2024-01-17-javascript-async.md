---
title: JavaScript 비동기, Callback, Promise, async/await
description: JavaScript는 기본적으로 단일 스레드 기반의 동기적(synchronous) 언어입니다. 하지만 웹 애플리케이션은 네트워크 요청, 파일 읽기, 타이머 등의 비동기(asynchronous) 작업을 많이 포함하고 있습니다. 이를 처리하기 위해 JavaScript는 콜백(callback), 프로미스(promise), 그리고 ES8에서 도입된 async/await 키워드를 제공합니다. 이 글에서는 이 세 가지 비동기 작업을 처리하는 방법에 대해 설명합니다.
date: 2024-01-17 11:30:53 +0900
last_modified_at: 2024-01-17 11:30:53 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, async, await, 비동기, promise, callback ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-17-javascript-async/thumbnail.webp
  alt: JavaScript 주석, 협업을 위해 반드시 필요한 기능
---

## 1. 콜백 (Callback)

### 1.1. 콜백의 개념

콜백 함수는 다른 함수의 인자로 전달되어, 특정 작업이 완료된 후 호출되는 함수입니다. 비동기 작업을 처리할 때 주로 사용됩니다.

### 1.2. 콜백 함수 예시

다음은 콜백 함수를 사용하여 비동기 작업을 처리하는 간단한 예시입니다:

```javascript
function fetchUserData(callback) {
    // 네크워크를 통해 가지고 온 것처럼 보이기 위해, setTimeout으로 1초 딜레이 설정
    setTimeout(() => {
        const data = { name: '아이유', age: 30 };
        callback(data);
    }, 1000);
}

function handleData(data) {
    console.log('Data:', data);
}

fetchUserData(handleData);
```

위 코드에서 `fetchUserData` 함수는 1초 후에 데이터를 가져오고, 가져온 데이터를 콜백 함수 `handleData`에 전달하여 출력합니다.

### 1.3. 콜백 지옥 (Callback Hell)

복잡한 비동기 작업을 처리할 때 콜백 함수가 중첩되어 코드의 가독성이 떨어지는 현상을 콜백 지옥이라고 합니다.

```javascript
function fetchUserData(callback) {
    setTimeout(() => {
        const data = { name: '아이유', age: 30 };
        callback(data);
    }, 1000);
}

function handleData(data) {
    fetchMoreData(data, moreData => {
        fetchEvenMoreData(moreData, evenMoreData => {
            console.log('Data:', evenMoreData);
        });
    });
}

fetchUserData(handleData);
```

이와 같은 코드 구조는 가독성이 떨어져서, 유지보수와 디버깅이 어렵습니다.

![Callback Hell](/assets/img/posts/language/javascript/2024-01-17-javascript-async/callback-hell.webp)
_Callback Hell_

## 2. 프로미스 (Promise)

### 2.1. 프로미스의 개념

프로미스는 비동기 작업의 완료 또는 실패를 나타내는 객체입니다. `Promise` 객체는 `pending`, `fulfilled`, `rejected` 세 가지 상태를 가집니다.

### 2.2. 프로미스 생성

`Promise` 생성자는 실행할 비동기 작업을 포함한 콜백 함수를 인자로 받습니다. 이 콜백 함수는 `resolve`와 `reject` 두 가지 인자를 갖습니다.

```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { name: '아이유', age: 30 };
        resolve(data); // 작업이 성공적으로 완료됨
    }, 1000);
});
```

### 2.3. 프로미스 사용

`then` 메서드는 프로미스가 성공적으로 완료되었을 때 호출됩니다. `catch` 메서드는 프로미스가 실패했을 때 호출됩니다.

```javascript
promise
    .then(data => {
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

### 2.4. 프로미스 체이닝 (Promise Chaining)

프로미스는 체이닝을 통해 연속적인 비동기 작업을 처리할 수 있습니다. 이를 통해 콜백 지옥 문제를 해결할 수 있습니다.

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: '아이유', age: 30 };
            resolve(data);
        }, 1000);
    });
}

function fetchMoreData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.moreData = 'Additional data';
            resolve(data);
        }, 1000);
    });
}

fetchData()
    .then(data => fetchMoreData(data))
    .then(finalData => {
        console.log('Data:', finalData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## 3. async/await

### 3.1. async/await의 개념

`async/await`는 ES2017(ES8)에서 도입된 비동기 작업을 처리하는 새로운 방법입니다. `async` 키워드는 함수가 프로미스를 반환하도록 하며, `await` 키워드는 프로미스가 해결될 때까지 함수 실행을 일시 중지합니다.

### 3.2. async 함수

`async` 키워드를 사용하여 함수를 정의합니다. `async` 함수는 항상 프로미스를 반환합니다.

```javascript
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: '아이유', age: 30 };
            resolve(data);
        }, 1000);
    });
}
```

### 3.3. await 키워드

`await` 키워드는 `async` 함수 내에서만 사용 가능합니다. `await` 키워드는 프로미스가 해결될 때까지 실행을 일시 중지하고, 해결된 값을 반환합니다.

```javascript
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: '아이유', age: 30 };
            resolve(data);
        }, 1000);
    });
}

async function getData() {
    try {
        const data = await fetchData();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

getData();
```

### 3.4. async/await와 프로미스 체이닝

`async/await`를 사용하면 프로미스 체이닝을 더욱 간결하고 가독성 있게 작성할 수 있습니다.

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: '아이유', age: 30 };
            resolve(data);
        }, 1000);
    });
}

function fetchMoreData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.moreData = 'Additional data';
            resolve(data);
        }, 1000);
    });
}

async function getAllData() {
    try {
        const data = await fetchData();
        const finalData = await fetchMoreData(data);
        console.log('Data:', finalData);
    } catch (error) {
        console.error('Error:', error);
    }
}

getAllData();
```

## 4. 결론

JavaScript는 콜백, 프로미스, 그리고 async/await을 통해 비동기 작업을 처리할 수 있습니다.

- **콜백**: 간단한 비동기 작업에 적합하지만, 중첩된 구조로 인해 가독성이 떨어질 수 있습니다.
- **프로미스**: 콜백 지옥 문제를 해결하고, 체이닝을 통해 비동기 작업을 순차적으로 처리할 수 있습니다.
- **async/await**: 프로미스를 기반으로 하여 비동기 작업을 동기 코드처럼 작성할 수 있게 해주며, 코드의 가독성과 유지보수성을 크게 향상시킵니다.
