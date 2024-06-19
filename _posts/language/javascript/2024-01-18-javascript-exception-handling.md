---
title: JavaScript에서 예외 처리, try, catch, finally
description: JavaScript에서 예외 처리는 코드의 오류를 관리하고 처리하는 방법입니다. 예외 처리 구문은 코드 실행 중 발생할 수 있는 오류를 감지하고, 그 오류를 처리할 수 있게 해줍니다. JavaScript에서는 try, catch, finally 구문을 사용하여 예외 처리를 할 수 있습니다.
date: 2024-01-18 18:55:32 +0900
last_modified_at: 2024-01-18 18:55:32 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, try, catch, finally, 예외처리, exception, error ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-18-javascript-exception-handling/thumbnail.webp
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

예외 처리는 코드의 안정성과 신뢰성을 높이는 데 매우 중요합니다. 예외를 적절히 처리하지 않으면, 프로그램이 예기치 않게 종료되거나 예상치 못한 동작을 할 수 있습니다.

- **코드의 안정성 향상**: 예외 처리하여 프로그램이 예기치 않게 종료되지 않도록 합니다.
- **디버깅 용이성**: 예외 메시지를 통해 문제의 원인을 쉽게 파악할 수 있습니다.
- **자원 관리**: `finally` 블록을 사용하여 자원을 적절히 해제할 수 있습니다.

## 3. 예시: 네트워크 요청 처리

다음은 네트워크 요청을 처리하면서 발생할 수 있는 예외를 처리하는 예시입니다. 네트워크 요청은 실패할 가능성이 있으므로, 예외 처리하는 것은 필수적입니다.

```javascript
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('네트워크 요청 실패했습니다.');
        }
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error.message);
    } finally {
        console.log('네트워크 요청 시도가 완료되었습니다.');
    }
}

fetchData('https://api.example.com/data');
```

위 예시에서는 `fetch`를 사용하여 데이터를 요청하고, 성공 여부에 따라 예외를 던집니다. 예외가 발생하면 `catch` 블록에서 이를 처리하고, 마지막으로 `finally` 블록에서 요청 시도 종료 메시지를 출력합니다.

## 4. 사용자 정의 예외

JavaScript에서는 사용자 정의 예외를 생성하여 특정 상황에 대한 맞춤형 예외 처리를 할 수 있습니다. 사용자 정의 예외는 `Error` 객체를 상속받아서 만들 수 있습니다.

```javascript
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

function doSomethingRisky() {
    throw new CustomError('예상하지 못한 에러가 발생했습니다!');
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

## 5. 예외 처리 응용

### 5.1. 구체적인 예외 처리

예외를 처리할 때는 가능한 한 구체적으로 예외를 나눠서 처리하는 것이 좋습니다.

```javascript
try {
    // 특정 오류 처리
} catch (error) {
    if (error instanceof TypeError) {
        console.error('Type 에러가 발생했습니다.', error.message);
    } else if (error instanceof ReferenceError) {
        console.error('Reference 에러가 발생했습니다.', error.message);
    } else {
        console.error('예상하지 못한 에러가 발생했습니다.', error.message);
    }
}
```

### 5.2. 로그와 모니터링

예외 발생 시 로그를 남기고, 모니터링 도구를 사용하여 예외를 추적(trace)하는 것이 좋습니다. 이는 문제의 원인을 빠르게 파악하고, 시스템의 안정성을 유지하는 데 도움이 줍니다.

```javascript
try {
    let result = riskyOperation();
} catch (error) {
    // 예외를 로깅하고 모니터링 도구에 보고
    console.error('에러 발생:', error.message);
    sendToMonitoringService(error);
}
```

#### 5.2.1. 모니터링 도구 추천

아래는 로그를 적재하고 모니터링을 하기 위한 도구들입니다.

1. [Sentry](https://sentry.io/)
   - **설명**: Sentry는 예외 및 성능 모니터링을 제공하는 도구입니다. 예외 발생 시 자동으로 로그를 수집하고, 알림을 보내며, 문제의 원인을 추적할 수 있습니다.
   - **특징**: 실시간 에러 추적, 배포 추적, 성능 모니터링, 사용자 피드백 수집

2. [New Relic](https://newrelic.com/)
   - **설명**: New Relic은 서버, 애플리케이션, 브라우저, 모바일 애플리케이션 등 다양한 환경에서 모니터링을 제공하는 통합 플랫폼입니다.
   - **특징**: 애플리케이션 성능 모니터링(APM), 분산 추적, 실시간 로그 분석, 인프라 모니터링

3. [LogRocket](https://logrocket.com/)
   - **설명**: LogRocket은 사용자의 세션을 재생하여 버그를 재현하고, 상태, 네트워크 로그, 콘솔 로그 등을 수집하여 문제를 분석할 수 있게 도와줍니다.
   - **특징**: 사용자 세션 재생, 상태 및 네트워크 로그 수집, 사용자 행동 분석

4. [Raygun](https://raygun.com/)
   - **설명**: Raygun은 에러, 충돌, 성능 문제를 추적하여 실시간으로 알림을 제공하는 도구입니다.
   - **특징**: 실시간 에러 및 충돌 보고, 성능 모니터링, 사용자 영향 분석

5. [Datadog](https://www.datadoghq.com/)
   - **설명**: Datadog은 서버, 데이터베이스, 애플리케이션, 툴 등의 모니터링과 분석을 위한 통합 플랫폼입니다.
   - **특징**: 로그 관리, APM, 인프라 모니터링, 이벤트 추적

### 5.3. 예외 던지기와 다시 던지기

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
    console.error('오류 발생', error.message);
    throw error; // 예외를 다시 던져 상위 코드에서 처리
}
```

## 6. 결론

JavaScript에서 예외 처리는 코드의 안정성과 신뢰성을 유지하는 데 중요한 역할을 합니다. `try`, `catch`, `finally` 구문을 사용하여 예외를 적절히 처리하고, 사용자 정의 커스텀 예외를 활용하여 특정 상황에 맞는 예외 처리를 구현할 수 있습니다.
예외 처리를 통해 코드를 보다 견고하게 만들고, 예기치 않은 오류에 대비할 수 있습니다.

![Exception Handling](/assets/img/posts/language/javascript/2024-01-18-javascript-exception-handling/exception-handling.webp)
_Exception Handling_
