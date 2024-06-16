---
title: JavaScript에서 예외 처리, try, catch, finally
description: JavaScript에서 예외 처리는 코드의 오류를 관리하고 처리하는 방법입니다. 예외 처리 구문은 코드 실행 중 발생할 수 있는 오류를 감지하고, 그 오류를 처리할 수 있게 해줍니다. JavaScript에서는 try, catch, finally 구문을 사용하여 예외 처리를 할 수 있습니다.
date: 2024-01-18 18:55:32 +0900
last_modified_at: 2024-01-18 18:55:32 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, programming, web, try, catch, finally, 예외처리, exception, error ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-18-javascript-exception-handling/thumbnail.jpg
  alt: JavaScript에서 예외 처리, try, catch, finally
---

## 1. 예외 처리 기본 구조

JavaScript에서 예외 처리를 위한 기본 구조는 `try`, `catch`, `finally` 블록으로 구성됩니다. 이들 블록의 역할을 간단히 살펴보겠습니다.

### 1.1. try 블록

`try` 블록은 예외가 발생할 가능성이 있는 코드를 포함합니다. `try` 블록 내부에서 예외가 발생하면, 해당 예외는 즉시 `catch` 블록으로 전달됩니다.

```javascript
try {
    // 예외가 발생할 가능성이 있는 코드
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('오류 발생:', error);
}
```

### 1.2. catch 블록

`catch` 블록은 `try` 블록에서 발생한 예외를 처리합니다. `catch` 블록은 `try` 블록에서 던져진 예외 객체를 인자로 받습니다. 이를 통해 예외에 대한 처리를 할 수 있습니다.

```javascript
try {
    let result = riskyOperation();
} catch (error) {
    console.error('오류 발생:', error.message);
}
```

### 1.3. finally 블록

`finally` 블록은 예외 발생 여부와 상관없이 항상 실행됩니다. 주로 리소스(Resource) 해제 등의 작업을 수행할 때 사용합니다.

```javascript
try {
    let result = riskyOperation();
} catch (error) {
    console.error('오류 발생:', error.message);
} finally {
    console.log('리소스 해제 처리 중...');
}
```

## 2. 예외 처리의 필요성

예외 처리는 코드의 안정성과 신뢰성을 높이는 데 매우 중요합니다. 예외를 적절히 처리하지 않으면, 프로그램이 예기치 않게 종료되거나 예상치 못한 동작을 할 수 있습니다. 예외 처리를 통해 다음과 같은 이점을 얻을 수 있습니다.

- **코드의 안정성 향상**: 예외를 적절히 처리하여 프로그램이 예기치 않게 종료되지 않도록 합니다.
- **디버깅 용이성**: 예외 메시지를 통해 문제의 원인을 쉽게 파악할 수 있습니다.
- **자원 관리**: `finally` 블록을 사용하여 자원을 적절히 해제할 수 있습니다.

## 3. 실제 예시: 네트워크 요청 처리

다음은 네트워크 요청을 처리하면서 발생할 수 있는 예외를 처리하는 예시입니다. 네트워크 요청은 실패할 가능성이 있으므로, 이를 적절히 처리하는 것이 중요합니다.

```javascript
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error.message);
    } finally {
        console.log('Fetch attempt finished.');
    }
}

fetchData('https://api.example.com/data');
```

위 예시에서는 `fetch`를 사용하여 데이터를 요청하고, 성공 여부에 따라 예외를 던집니다. 예외가 발생하면 `catch` 블록에서 이를 처리하고, 마지막으로 `finally` 블록에서 요청 시도 종료 메시지를 출력합니다.

## 4. 사용자 정의 예외

JavaScript에서는 사용자 정의 예외를 생성하여 특정 상황에 대한 맞춤형 예외 처리를 할 수 있습니다. 사용자 정의 예외는 `Error` 객체를 확장하여 만들 수 있습니다.

```javascript
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

function doSomethingRisky() {
    throw new CustomError('Something went wrong!');
}

try {
    doSomethingRisky();
} catch (error) {
    if (error instanceof CustomError) {
        console.error('Custom error occurred:', error.message);
    } else {
        console.error('Unexpected error:', error.message);
    }
}
```

위 예시에서는 `CustomError` 클래스를 정의하고, 특정 상황에서 이 예외를 던집니다. `catch` 블록에서는 예외의 타입을 확인하여 맞춤형 메시지를 출력합니다.

## 5. 예외 처리의 베스트 프랙티스

### 5.1 구체적인 예외 처리

예외를 처리할 때는 가능한 한 구체적인 예외를 처리하는 것이 좋습니다. 이는 코드의 가독성과 유지보수성을 높이는 데 도움이 됩니다.

```javascript
try {
    // 특정 오류 처리
} catch (error) {
    if (error instanceof TypeError) {
        console.error('Type error occurred:', error.message);
    } else if (error instanceof ReferenceError) {
        console.error('Reference error occurred:', error.message);
    } else {
        console.error('An error occurred:', error.message);
    }
}
```

### 5.2 로그와 모니터링

예외 발생 시 로그를 남기고, 모니터링 도구를 사용하여 예외를 추적하는 것이 좋습니다. 이는 문제의 원인을 빠르게 파악하고, 시스템의 안정성을 유지하는 데 도움이 됩니다.

```javascript
try {
    let result = riskyOperation();
} catch (error) {
    // 예외를 로깅하고 모니터링 도구에 보고
    console.error('Error occurred:', error.message);
    sendToMonitoringService(error);
}
```

### 5.3 예외 던지기와 다시 던지기

필요한 경우 예외를 던지거나 다시 던질 수 있습니다. 이는 특정 상황에서 예외를 상위 코드로 전달하여 더 적절한 곳에서 처리할 수 있게 합니다.

```javascript
function validateInput(input) {
    if (input == null) {
        throw new Error('Invalid input');
    }
}

try {
    validateInput(null);
} catch (error) {
    console.error('Caught an error:', error.message);
    throw error; // 예외를 다시 던져 상위 코드에서 처리
}
```

## 6. 결론

JavaScript에서 예외 처리는 코드의 안정성과 신뢰성을 유지하는 데 중요한 역할을 합니다. `try`, `catch`, `finally` 구문을 사용하여 예외를 적절히 처리하고, 사용자 정의 예외를 활용하여 특정 상황에 맞는 예외 처리를 구현할 수 있습니다. 예외 처리를 통해 코드를 보다 견고하게 만들고, 예기치 않은 오류에 대비할 수 있습니다. 

이 글이 JavaScript에서 예외 처리를 이해하고 적용하는 데 도움이 되었기를 바랍니다. 예외 처리는 코드의 품질을 높이는 중요한 기법이므로, 항상 신경 써서 구현하는 것이 좋습니다.
