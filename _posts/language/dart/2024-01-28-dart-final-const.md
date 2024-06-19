---
title: Dart에서 final과 const의 차이점
description: Dart 언어를 사용하면서 final과 const의 차이를 이해하는 것은 중요합니다. 이 두 키워드는 모두 변수를 상수로 선언하는 데 사용되지만, 그 작동 방식에는 중요한 차이가 있습니다. 이 글에서는 Dart의 final과 const의 차이점에 대해 설명합니다.
date: 2024-01-28 20:47:39 +0900
last_modified_at: 2024-01-28 20:47:39 +0900
categories: [ Language, Dart ]
tags: [ dart, 다트, final, const, 상수, 변수 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/dart/2024-01-28-dart-final-const/thumbnail.webp
  alt: Dart에서 final과 const의 차이점
---

## 1. final 키워드

`final` 키워드로 선언된 변수는 **한번만 값이 할당**될 수 있습니다. 즉, 변수가 초기화된 이후에는 값을 변경할 수 없습니다. `final` 변수는 **런타임**에 초기화됩니다.

### 1.1. final 예시

아래 코드는 `final`에 대한 간단한 예제 코드입니다

```dart
void main() {
  final String userName = "홍길동";
  // userName = "이순신"; // Error: Can't assign to the final variable 'userName'.
  
  print(userName); // 홍길동 출력
}
```

이 예제에서 `userName` 변수는 `final`로 선언되었기 때문에, 값을 다시 할당하려고 하면 오류가 발생합니다.

## 2. const 키워드

`const` 키워드는 **컴파일 타임 상수**를 정의하는 데 사용됩니다. `const` 변수는 **컴파일 타임**에 초기화되며, 초기화된 이후 절대 변경할 수 없습니다.

### 2.1. const 예시

아래 코드는 `const`에 대한 간단한 예제 코드입니다

```dart
void main() {
  const int maxUsers = 100;
  // maxUsers = 200; // Error: Can't assign to the const variable 'maxUsers'.
  
  print(maxUsers); // 100 출력
}
```

이 예제에서 `maxUsers` 변수는 `const`로 선언되어 컴파일 타임에 상수로 처리됩니다.

## 3. final과 const의 주요 차이점

그럼 `final`과 `const`은 동일하게 상수 역할을 하기 때문에 재할당이 불가능한데, 무슨 차이가 있는지 살펴봅시다.

### 3.1. 값 할당 시점

- `final`: **런타임**에 값이 할당됩니다. 즉, 코드가 실행되는 동안 값을 할당할 수 있습니다.
- `const`: **컴파일 타임**에 값이 할당됩니다. 즉, 컴파일 시에 값이 고정됩니다.

### 3.2. 적용 범위

- `final`: 클래스 변수로 사용할 수 있으며, **런타임**에 값이 할당됩니다.
- `const`: **클래스의 인스턴스 변수**로 사용할 수 없고, **컴파일 타임 상수**로만 사용할 수 있습니다.

### 3.3. 메모리 할당

- `final`: 프로그램이 실행될 때 메모리에 할당됩니다.
- `const`: 컴파일 타임에 메모리에 할당되어 프로그램 실행 시 항상 동일한 메모리 주소를 가리킵니다.

## 4. 언제 final과 const를 사용할까?

### 4.1. final을 사용하는 경우

- 값이 한 번만 설정되고 변경되지 않는 경우
- 초기화 시점이 런타임인 경우

### 4.2. const를 사용하는 경우

- 값이 프로그램 실행 동안 절대 변경되지 않음
- 컴파일 타임에 미리 알 수 있는 값인 경우

## 5. 결론

Dart에서 `final`과 `const`는 모두 상수를 선언하는 데 사용되지만, 사용 시점과 적용 범위에서 차이가 있습니다. `final`은 런타임 상수를 선언하는 데 사용되며, `const`는 컴파일 타임 상수를
선언하는 데 사용됩니다.
