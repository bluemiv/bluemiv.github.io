---
title: JavaScript 객체(object)의 개념과 사용법
description: JavaScript에서 객체(Object)는 중요한 데이터 구조 중 하나로, 속성(properties)과 메서드(methods)를 가집니다. 객체는 다양한 데이터를 하나의 단위로 묶어서 관리할 수 있게 해주며, 이를 통해 코드의 가독성과 유지보수성을 높일 수 있습니다.
date: 2024-01-12 16:15:21 +0900
last_modified_at: 2024-01-12 16:15:21 +0900
categories: [ Language, JavaScript ]
tags: [ javascript, js, 자바스크립트, web, 객체, object ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/javascript/2024-01-12-javascript-objects/thumbnail.webp
  alt: JavaScript 객체(object)의 개념과 사용법
---

## 1. 객체(object)란?

JavaScript 객체는 키(key)와 값(value)으로 이루어진 컬렉션입니다. 객체의 값은 원시 값(숫자, 문자열, 불리언 등)일 수도 있고, 다른 객체나 함수일 수도 있습니다.
객체는 실세계의 엔티티(entity)를 모델링하는 데 유용하며, 데이터를 구조화하고 조직화하는 데 사용됩니다.

### 1.1. 객체 생성

객체는 중괄호 `{}`를 사용하여 생성할 수 있습니다. 객체 리터럴(`Object Literal`) 문법을 사용하여 객체를 정의할 수 있습니다

```javascript
const person = {
    name: 'Kim',
    age: 31,
    isEmployed: true
};
```

위 예제에서 `person` 객체는 `name`, `age`, `isEmployed`라는 세 가지 속성을 가집니다.

### 1.2. 객체 생성자

객체 생성자를 사용하여 객체를 생성할 수도 있습니다. `Object` 생성자를 사용하여 빈 객체를 생성한 후, 속성을 추가할 수 있습니다

```javascript
const person = new Object();
person.name = 'Kim';
person.age = 31;
person.isEmployed = true;
```

> 보통은 객체 리터럴 문법이 더 간결하고 직관적이므로 일반적으로 객체 리터럴을 사용합니다.
{: .prompt-tip }

## 2. 객체 속성 접근 및 변경

객체의 속성에 접근하고 값을 변경하는 방법은, 아래와 같이 두 가지가 있습니다

- 점 표기법(dot notation)
- 대괄호 표기법(bracket notation)

### 2.1. 점 표기법 (dot notation)

점 표기법은 객체의 속성에 접근하고 값을 변경할 때 사용하는 일반적인 방법입니다:

```javascript
console.log(person.name); // 'Kim'
person.age = 35;
console.log(person.age); // 35
```

### 2.2. 대괄호 표기법 (bracket notation)

대괄호 표기법은 속성 이름에 변수를 사용하거나, 속성 이름에 공백이나 특수 문자가 포함된 경우에 유용합니다.

```javascript
console.log(person['name']); // 'Kim'
person['age'] = 40;
console.log(person['age']); // 40

const property = 'isEmployed';
console.log(person[property]); // true
```

## 3. 메서드 (Method)

객체의 메서드는 객체에 속한 함수입니다. 메서드를 사용하면 객체와 관련된 동작을 정의할 수 있습니다.

### 3.1. 메서드 정의

객체 리터럴 문법을 사용하여 메서드를 정의할 수 있습니다:

```javascript
const person = {
    name: 'Kim',
    age: 31,
    greet: function() {
        return `안녕하세요! 제 이름은 ${this.name} 입니다.`;
    }
};

console.log(person.greet()); // '안녕하세요! 제 이름은 Kim 입니다.'
```

### 3.2. ES6 축약 메서드 문법

ES6부터는 메서드를 정의할 때 함수 키워드를 생략하여 사용할 수 있습니다.

```javascript
const person = {
    name: 'Kim',
    age: 31,
    greet() {
        return `안녕하세요! 제 이름은 ${this.name} 입니다.`;
    }
};

console.log(person.greet()); // '안녕하세요! 제 이름은 Kim 입니다.'
```

## 4. 객체의 프로토타입 (prototype)

JavaScript 객체는 프로토타입(prototype)을 통해 다른 객체의 속성과 메서드를 상속할 수 있습니다.
모든 객체는 프로토타입 객체에 연결되며, 이 프로토타입 객체는 또 다른 객체를 프로토타입으로 가질 수 있습니다.

### 4.1. 프로토타입 체인

프로토타입 체인을 통해 객체는 자신의 프로토타입, 프로토타입의 프로토타입 등 상위 프로토타입의 속성과 메서드에 접근할 수 있습니다.

```javascript
const animal = {
    eat() {
        console.log('냠냠');
    }
};

const dog = {
    bark() {
        console.log('멍멍');
    }
};

Object.setPrototypeOf(dog, animal);
dog.bark(); // '멍멍'
dog.eat(); // '냠냠' (animal의 메서드를 상속받음)
```

### 4.2. 객체 생성자와 프로토타입

객체 생성자 함수를 사용하여 객체를 생성하고, 해당 생성자의 `prototype` 속성을 사용하여 메서드를 정의할 수 있습니다:

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    return `제 이름은 ${this.name}이고 나이는 ${this.age} 입니다.`;
};

const kim = new Person('Kim', 31);
console.log(kim.greet()); // '제 이름은 Kim이고 나이는 31 입니다.'
```

## 5. 객체에서 자주 사용하는 기능들

### 5.1. Object.keys와 Object.values

`Object.keys`와 `Object.values` 메서드는 객체의 속성 이름과 값을 배열로 반환합니다

```javascript
const person = {
    name: 'Kim',
    age: 31,
    isEmployed: true
};

console.log(Object.keys(person)); // ['name', 'age', 'isEmployed']
console.log(Object.values(person)); // ['Kim', 31, true]
```

### 5.2. Object.entries

`Object.entries` 메서드는 객체의 속성 이름과 값을 배열의 배열로 반환합니다

```javascript
const person = {
    name: 'Kim',
    age: 30,
    isEmployed: true
};

console.log(Object.entries(person)); // [['name', 'Kim'], ['age', 30], ['isEmployed', true]]
```

### 5.3. Object.assign

`Object.assign` 메서드는 하나 이상의 소스 객체로부터 타깃 객체로 속성을 복사합니다. 이를 통해 객체를 병합하거나 복사할 수 있습니다

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }
```

### 5.4. 객체 디스트럭처링 (Object destructuring)

객체 디스트럭처링은 객체의 속성을 개별 변수로 추출하는 문법입니다. 이를 구조화된 객체를 비구조화 한다고 합니다.

```javascript
const person = {
    name: 'Kim',
    age: 30,
    isEmployed: true
};

const { name, age } = person;
console.log(name); // 'Kim'
console.log(age); // 30
```

### 5.5. 스프레드 연산자

스프레드 연산자(spread operator)를 사용하면 객체를 쉽게 병합할 수 있습니다. `Object.assign`과 동일한 효과를 가집니다.

```javascript
const position = { x: 0, y: 10};
const user = { name: 'Kim', age: 30 };

const userPosition = { ...position, ...user };
console.log(userPosition); // {x: 0, y: 10, name: 'Kim', age: 30}
```


## 6. 결론

JavaScript 객체(object)는 키와 값의 컬렉션으로, 속성과 메서드를 포함할 수 있습니다. 객체는 점 표기법과 대괄호 표기법을 통해 속성에 접근하고 값을 변경할 수 있으며, 메서드를 정의하여 객체와 관련된 동작을 구현할 수 있습니다. 또한, 객체는 프로토타입을 통해 상속을 지원합니다.
