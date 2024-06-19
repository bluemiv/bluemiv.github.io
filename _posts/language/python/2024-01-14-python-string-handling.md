---
title: Python에서 기초부터 고급까지 문자열 다루기 
description: Python은 다양한 문자열 처리 기능들을 제공하여 개발자들이 텍스트 데이터를 쉽게 조작하고 변환할 수 있도록 합니다. 이 글에서는 Python에서 문자열을 다루는 방법을 기초부터 고급까지 설명합니다.
date: 2024-01-14 19:21:29 +0900
last_modified_at: 2024-01-14 19:21:29 +0900
categories: [ Language, Python ]
tags: [ python, string, 문자열 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/python/2024-01-14-python-string-handling/thumbnail.webp
  alt: Python에서 기초부터 고급까지 문자열 다루기
---

## 1. 문자열 기본 이해

Python에서 문자열은 `str` 타입으로 표현됩니다. 문자열은 작은따옴표(`'`)나 큰따옴표(`"`)로 감싸서 정의할 수 있습니다.

```python
greeting = "Hello, World!"
print(greeting)  # 출력: Hello, World!
```

## 2. 문자열 연결 (Concatenation)

두 개 이상의 문자열을 하나로 연결할 때는 더하기(`+`) 연산자를 사용합니다.

```python
first_name = "길동"
last_name = "홍"
full_name = first_name + " " + last_name
print(full_name)  # 출력: 길동 홍
```

## 3. 문자열 반복 (Repetition)

문자열을 여러 번 반복하려면 곱하기(`*`) 연산자를 사용합니다.

```python
word = "Hello"
repeated_word = word * 3
print(repeated_word)  # 출력: HelloHelloHello
```

## 4. 문자열 길이 구하기

문자열의 길이를 구하려면 `len()` 함수를 사용합니다.

```python
message = "Hello, Python!"
length = len(message)
print(length)  # 출력: 14
```

## 5. 문자열 인덱싱과 슬라이싱

Python의 인덱싱을 이용하여, 문자열에서 특정 위치의 문자에 접근하거나 부분 문자열을 추출할 수 있습니다.

```python
language = "Python"
first_char = language[0]
print(first_char)  # 출력: P

substring = language[1:4]
print(substring)  # 출력: yth
```

## 6. 문자열 메서드

Python은 문자열 조작을 위한 다양한 메서드를 제공합니다.

### 6.1. 대소문자 변환

- `upper()`: 문자열을 모두 대문자로 변환
- `lower()`: 문자열을 모두 소문자로 변환
- `title()`: 각 단어의 첫 글자를 대문자로 변환

```python
text = "hello, python!"
print(text.upper())  # 출력: HELLO, PYTHON!
print(text.lower())  # 출력: hello, python!
print(text.title())  # 출력: Hello, Python!
```

### 6.2. 공백 제거

- `strip()`: 문자열 양쪽 끝의 공백 제거
- `lstrip()`: 문자열 왼쪽 끝의 공백 제거
- `rstrip()`: 문자열 오른쪽 끝의 공백 제거

```python
text_with_spaces = "   Hello, Python!   "
print(text_with_spaces.strip())  # 출력: Hello, Python!
print(text_with_spaces.lstrip())  # 출력: Hello, Python!   
print(text_with_spaces.rstrip())  # 출력:    Hello, Python!
```

### 6.3. 문자열 검색 및 치환

- `find()`: 문자열 내에서 특정 문자열을 찾아 그 인덱스를 반환 (찾지 못하면 -1 반환)
- `replace()`: 문자열 내의 특정 문자열을 다른 문자열로 치환

```python
text = "Hello, Python!"
index = text.find("Python")
print(index)  # 출력: 7

new_text = text.replace("Python", "World")
print(new_text)  # 출력: Hello, World!
```

## 7. 문자열 응용

### 7.1. 정규 표현식 (Regular Expressions)

정규 표현식은 문자열 내에서 특정 패턴을 찾고, 검사하고, 치환할때 사용할 수 있습니다. 정규식으로 처리를 할때는 Python의 내장 라이브러리인 `re` 모듈을 사용합니다.

```python
import re

pattern = r"\d+"  # 하나 이상의 숫자를 찾는 패턴
text = "오늘은 1월 14일이야."
matches = re.findall(pattern, text)
print(matches)  # 출력: ['1', '14']
```

### 7.2. 문자열 포매팅 (String Formatting)

문자열 포매팅은 문자열 내에 변수의 값을 삽입하는 방법입니다.

#### 7.2.1. format() 메서드

`format()` 메서드를 사용하여 문자열 포매팅을 할 수 있습니다.

```python
name = "Hong"
age = 31
introduction = "내 이름은 {} 이고, {} 살이야!".format(name, age)
print(introduction)  # 출력: 내 이름은 Hong 이고, 31 살이야!
```

#### 7.2.2. f-문자열 (f-strings)

Python 3.6부터 도입된 f-strings는 `f` 접두사를 사용하여 변수의 값을 삽입합니다.

```python
name = "Hong"
age = 31
introduction = f"내 이름은 {name} 이고, {age} 살이야!"
print(introduction)  # 출력: 내 이름은 Hong 이고, 31 살이야!
```
