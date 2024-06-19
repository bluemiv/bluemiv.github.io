---
title: JavaScript의 클로저 개념 및 특징
description: JavaScript의 클로저(Closure)는 강력한 기능을 제공하는 개념 중 하나로, 함수와 그 함수가 선언된 렉시컬 환경(Lexical Environment)의 조합을 의미합니다. 클로저는 함수 내부에서 선언된 변수를 함수 외부에서도 접근할 수 있게 해주며, 다양한 프로그래밍 패턴을 구현할 수 있게 도와줍니다.
date: 2024-01-10 14:36:05 +0900
last_modified_at: 2024-01-10 14:36:05 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, closure, 클로저, 함수, function, method ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-10-javascript-closures/thumbnail.webp
  alt: JavaScript의 클로저 개념 및 특징
---

## 1. 클로저란?

클로저(`Closure`)는 함수와 그 함수가 선언될 때의 렉시컬 환경(`Lexical Environment`)의 조합입니다.

> 렉시컬 환경(Lexical Environment)은 자바스크립트에서 변수가 어디에서 어떻게 선언되고 접근될 수 있는지를 정의하는 구조입니다.
> - 렉시컬 환경은 코드가 실행되는 동안 유지되는 데이터 구조로, 변수와 함수 선언을 포함합니다.
> - 각 함수나 블록(scope)이 실행될 때마다 새로운 렉시컬 환경이 생성됩니다.
> - 렉시컬 환경은 두 가지 컴포넌트로 구성됩니다
>   - 환경 레코드(Environment Record): 해당 스코프 내의 변수와 함수 선언을 저장합니다.
>   - 외부 렉시컬 환경 참조(Outer Lexical Environment Reference): 현재 환경이 생성된 위치의 외부 환경을 가리킵니다.
{: .prompt-tip }

클로저는 함수가 생성될 때의 스코프를 기억하고, 그 스코프 밖에서 호출되더라도 그 스코프에 접근할 수 있는 기능을 제공합니다.
이는 JavaScript의 함수가 일급 객체(`First-class citizen`)라는 특성에 기인합니다.

```javascript
function outerFunction() {
  const outerVariable = 'outerVariable';

  function innerFunction() {
    console.log(outerVariable); // 'outerVariable'
  }

  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // 'outerVariable'
```

위 예제에서 `innerFunction`은 `outerFunction` 내부에서 선언되었고, `outerVariable`에 접근할 수 있습니다. `outerFunction`이 종료된
후에도 `innerFunction`은 `outerVariable`을 참조할 수 있습니다. 이는 `innerFunction`이 `outerFunction`의 렉시컬 환경을 기억하기 때문입니다.

## 2. 클로저의 특징

클로저의 주요 특징은 다음과 같습니다

### 2.1. 데이터 은닉

클로저는 외부에서 접근할 수 없는 변수를 만들고, 이 변수에 접근하고 조작할 수 있는 방법을 제공합니다. 이는 데이터 은닉과 캡슐화를 구현할 때 유용합니다.

```javascript
function createCounter() {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
```

위 예제에서 `count` 변수는 `createCounter` 함수 외부에서 직접 접근할 수 없으며, 오직 `increment`와 `decrement` 메서드를 통해서만 접근할 수 있습니다.

### 2.2. 함수 팩토리

클로저를 사용하면 함수 팩토리를 만들어 특정 로직을 가진 함수를 동적으로 생성할 수 있습니다.

```javascript
function createGreeting(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeting('Hello');
const sayHi = createGreeting('Hi');

console.log(sayHello('아이유')); // 'Hello, 아이유!'
console.log(sayHi('윈터')); // 'Hi, 윈터!'
```

위 예제의 `createGreeting` 함수는 `greeting` 변수를 클로저로 캡처하고, 이를 사용하여 동적으로 인사말을 생성하는 함수를 반환합니다.

### 2.3. 비동기 처리와 클로저

클로저는 비동기 코드에서 유용하게 사용됩니다. 특히, 타이머와 콜백 함수와 함께 자주 사용됩니다.

```javascript
function delayedGreeting(name) {
  const message = `Hello, ${name}!`;

  setTimeout(function () {
    console.log(message);
  }, 1000);
}

delayedGreeting('카리나'); // 1초 후 'Hello, 카리나!' 출력
```

위 예제에서 `setTimeout` 콜백 함수는 외부 함수인 `delayedGreeting` 함수의 `message` 변수에 접근할 수 있습니다. 이 또한 클로저입니다.

## 3. 클로저의 사용 예시

### 3.1. 모듈 패턴

클로저는 JavaScript에서 모듈 패턴을 구현하는 데 사용됩니다. 모듈 패턴은 특정 기능을 캡슐화하고, 공개된 인터페이스만을 외부에 노출하는 방법입니다.

```javascript
const counterModule = (function () {
  let count = 0;

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    }
  };
})();

console.log(counterModule.increment()); // 1
console.log(counterModule.increment()); // 2
console.log(counterModule.decrement()); // 1
```

위 예제에서 `counterModule`은 클로저와 즉시 실행 함수를 사용하여 `count` 변수를 캡슐화하고, `increment`와 `decrement` 메서드만 외부에 노출합니다.

### 3.2. 이벤트 핸들러

클로저는 이벤트 핸들러를 정의할 때 유용합니다. 이벤트 핸들러는 특정 이벤트가 발생할 때 실행되며, 이벤트가 발생할 당시의 렉시컬 환경을 기억합니다.

```javascript
function setupButton(buttonId, message) {
  const button = document.getElementById(buttonId);

  button.addEventListener('click', function () {
    console.log(message);
  });
}

setupButton('myButton', 'myButton이 클릭되었습니다!'); // myButton이 클릭되었습니다!
```

## 4. 클로저 사용시 주의사항

### 4.1. 메모리 관리

클로저는 참조를 유지하기 때문에, 예상치 못한 메모리 누수가 발생할 수 있습니다.

```javascript
function createLargeArray() {
  const largeArray = new Array(1000000).fill('data');

  return function (index) {
    return largeArray[index];
  };
}

const getArrayItem = createLargeArray();
console.log(getArrayItem(999999)); // 'data'
```

위 예제에서 `largeArray`는 클로저로 캡처되어 메모리에 계속 남아 있습니다. 이렇게 클로저를 남용하게되면 메모리 사용량이 늘어날 수 있습니다.

### 4.2. 성능 이슈

클로저를 과도하게 사용하면 성능에 영향을 줄 수 있습니다. 특히, 클로저가 포함된 반복문은 성능 저하를 유발할 수 있습니다.

```javascript
function createClosures() {
  const closures = [];

  for (let i = 0; i < 1000000; i++) {
    closures.push(() => i);
  }

  return closures;
}

const closures = createClosures();
console.log(closures[999999]()); // 999999
```

위 예제에서 많은 클로저를 생성하면 성능 문제가 발생할 수 있습니다.

## 5. 결론

클로저는 JavaScript의 강력한 기능 중 하나로, 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 클로저는 데이터 은닉, 함수 팩토리, 비동기 처리 등 다양한 용도로 사용될 수 있으며,
코드의 가독성과 유지보수성을 크게 향상시킬 수 있습니다. 하지만, 메모리 관리와 성능 이슈에 주의해서 사용해야합니다.

Youtube에 '생활코딩'님의 클로저 개념 설명도 있어서 공유합니다.

{% include embed/youtube.html id='bwwaSwf7vkE' %}
