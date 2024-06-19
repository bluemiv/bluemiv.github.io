---
title: Dart 변수(Variable) 내용 정리
description: 이 글에서는 Dart 변수의 선언, 초기화, 타입, 변수의 범위 및 유효 범위(scope), 상수와 변수의 차이 등 변수에 대한 모든 내용을 설명합니다.
date: 2024-01-26 11:14:09 +0900
last_modified_at: 2024-01-26 11:14:09 +0900
categories: [ Language, Dart ]
tags: [ dart, 다트, 변수, variables ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/dart/2024-01-26-dart-variables/thumbnail.webp
  alt: Dart 변수(Variable) 내용 정리
---

## 1. 변수의 선언과 초기화

### 1.1. 기본 변수 선언

`var` 키워드를 사용하여, 변수를 선언하고 초기화하는 것이 가장 기본적인 방법입니다.  

```dart
void main() {
  var name = 'Hong';
  var age = 30;
  var isMarried = false;

  print(name);  // 출력: Hong
  print(age);  // 출력: 30
  print(isMarried);  // 출력: false
}
```

`var` 키워드를 사용하면 변수의 타입이 자동으로 추론됩니다.

### 1.2. 명시적 타입 선언

변수의 타입을 명시적으로 선언할 수도 있습니다.

```dart
void main() {
  String name = 'Hong';
  int age = 30;
  bool isMarried = false;

  print(name);  // 출력: Hong
  print(age);  // 출력: 30
  print(isMarried);  // 출력: false
}
```

명시적 타입 선언을 통해 변수의 타입을 명확하게 지정할 수 있습니다.

### 1.3. 초기화되지 않은 변수

Dart에서는 변수를 선언하고 나중에 초기화할 수도 있습니다. 그러나 사용하기 전에 반드시 초기화해야 하기 때문에 주의해야합니다.

```dart
void main() {
  int age;
  
  // 초기화하지 않은 변수 사용 시 컴파일 오류 발생
  // print(age);  // Error: Non-nullable variable 'age' must be assigned before it can be used.

  age = 25;
  print(age);  // 출력: 25
}
```

## 2. 타입 시스템

### 2.1. 타입 추론

Dart에서는 타입 추론(`type inference`)이 있어서, 자동으로 변수의 타입을 결정해 줍니다. 이는 `var` 키워드를 사용하여 선언된 변수에서 발생합니다.

```dart
void main() {
  var name = '아이유';  // String으로 추론
  var age = 25;  // int로 추론
  var height = 1.75;  // double로 추론

  print(name.runtimeType);  // 출력: String
  print(age.runtimeType);  // 출력: int
  print(height.runtimeType);  // 출력: double
}
```

### 2.2. 동적 타입

Dart에서는 `dynamic` 키워드를 사용하여 동적 타입 변수를 선언할 수 있습니다. 동적 타입 변수는 모든 타입의 값을 가질 수 있습니다.

```dart
void main() {
  dynamic variable = 'Hello';
  print(variable);  // 출력: Hello

  variable = 123;
  print(variable);  // 출력: 123

  variable = true;
  print(variable);  // 출력: true
}
```

동적 타입 변수는 유연하지만, 타입 안전성이 떨어질 수 있으므로 주의해서 사용해야 합니다.

## 3. 상수와 변수

### 3.1. 상수

Dart에서는 상수를 선언할 때 `const`와 `final` 키워드를 사용합니다. 상수는 한 번 초기화되면 변경할 수 없습니다.

```dart
void main() {
  const int maxAge = 100;
  final double pi = 3.14159;

  print(maxAge);  // 출력: 100
  print(pi);  // 출력: 3.14159

  // 상수 값을 변경하려고 하면 오류 발생
  // maxAge = 101;  // Error: Can't assign to the const variable 'maxAge'.
  // pi = 3.14;  // Error: Can't assign to the final variable 'pi'.
}
```

- `const`: 컴파일 타임 상수로, 컴파일 시에 이미 값을 알아야 합니다.
- `final`: 런타임 상수로, 실행 시 한 번만 값을 설정할 수 있습니다.

### 3.2. 상수와 변수의 차이

변수는 값을 변경할 수 있지만, 상수는 한 번 설정된 값을 변경할 수 없습니다. 이는 안전성을 높이고, 의도치 않은 값 변경을 방지하는 데 유용합니다.

## 4. 변수의 유효 범위 (Scope)

### 4.1. 지역 변수

지역 변수는 함수나 블록 내에서 선언되며, 해당 범위 내에서만 접근할 수 있습니다.

```dart
void main() {
  int outerVariable = 10;

  void innerFunction() {
    int innerVariable = 20;
    print(outerVariable);  // 출력: 10
    print(innerVariable);  // 출력: 20
  }

  innerFunction();
  
  // print(innerVariable);  // Error: Undefined name 'innerVariable'.
}
```

### 4.2. 전역 변수

전역 변수는 함수 외부에서 선언되며, 프로그램 전체에서 접근할 수 있습니다.

```dart
int globalVariable = 5;

void main() {
  print(globalVariable);  // 출력: 5

  globalVariable = 10;
  print(globalVariable);  // 출력: 10
}

void anotherFunction() {
  print(globalVariable);  // 출력: 10
}
```

전역 변수는 어디서든 접근할 수 있지만, 남용하면 코드의 유지보수성이 떨어질 수 있습니다.

## 5. 변수의 유효 범위

### 5.1. 블록 유효 범위

변수는 선언된 블록 내에서만 유효합니다.

```dart
void main() {
  if (true) {
    var insideIf = 'Hello';
    print(insideIf);  // 출력: Hello
  }
  
  // print(insideIf);  // Error: Undefined name 'insideIf'.
}
```

### 5.2. 루프 내 변수

루프 내에서 선언된 변수는 루프 내에서만 유효합니다.

```dart
void main() {
  for (var i = 0; i < 3; i++) {
    print(i);  // 출력: 0 1 2
  }
  
  // print(i);  // Error: Undefined name 'i'.
}
```

## 6. 결론

모든 프로그래밍 언어에서 변수는 데이터를 저장하고 조작하는 기본적인 단위입니다. 이 글에서는 Dart 변수의 선언과 초기화, 타입 시스템, 상수와 변수의 차이, 변수의 유효 범위 등의 개념에 대해 살펴보았습니다.
