---
title: Python의 변수와 데이터 타입
description: Python에서 변수와 데이터 타입의 기본 개념을 이해하는 것은 프로그래밍의 기초입니다. 이 글에서는 Python의 변수 선언과 주요 데이터 타입에 대해 상세히 설명합니다.
date: 2024-01-04 12:18:45 +0900
last_modified_at: 2024-01-04 12:18:45 +0900
categories: [ Language, Python ]
tags: [ python, 파이썬, 변수, 타입, variable, type ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/python/2024-01-04-python-variable-and-data-type/thumbnail.webp
  alt: Python의 변수와 데이터 타입
---

## 1. 변수 선언

변수는 값을 저장하는 메모리 공간의 이름을 말합니다. Python에서는 변수의 타입을 명시적으로 선언하지 않고, 값을 할당하면 자동으로 타입이 결정됩니다.

```python
# 정수형 변수 선언
age = 25

# 실수형 변수 선언
height = 175.5

# 문자열 변수 선언
name = "John Doe"
```

변수를 선언할 때는 `=` 연산자를 사용하여 값을 할당합니다. 변수 이름은 알파벳, 숫자, 밑줄(`_`)을 사용할 수 있으며, 숫자로 시작할 수 없습니다.

## 2. 데이터 타입

Python은 다양한 데이터 타입이 있습니다. 주요 데이터 타입으로는 정수(`int`), 실수(`float`), 문자열(`str`)이 있습니다.

### 2.1. 정수 (`int`)

정수는 소수점이 없는 숫자를 의미합니다. Python에서는 정수를 `int` 타입으로 처리합니다.

```python
# 정수형 변수 선언
num_apples = 10
temperature = -5
```

정수 타입의 변수는 덧셈, 뺄셈, 곱셈, 나눗셈 등의 산술 연산을 수행할 수 있습니다.

```python
# 정수 연산 예제
a = 15
b = 4

# 덧셈
sum_result = a + b  # 19

# 뺄셈
sub_result = a - b  # 11

# 곱셈
mul_result = a * b  # 60

# 나눗셈
div_result = a / b  # 3.75

# 몫
quotient = a // b  # 3

# 나머지
remainder = a % b  # 3
```

### 2.2. 실수 (`float`)

실수는 소수점을 포함하는 숫자를 의미합니다. Python에서는 실수를 `float` 타입으로 처리합니다.

```python
# 실수형 변수 선언
pi = 3.14159
gravity = 9.81
```

정수 타입과 동일하게 실수 타입의 변수 역시, 다양한 산술 연산을 수행할 수 있습니다.

```python
# 실수 연산 예제
x = 5.75
y = 2.5

# 덧셈
sum_result = x + y  # 8.25

# 뺄셈
sub_result = x - y  # 3.25

# 곱셈
mul_result = x * y  # 14.375

# 나눗셈
div_result = x / y  # 2.3
```

### 2.3. 문자열 (`str`)

문자열은 문자들의 집합으로, 일반적으로 텍스트 데이터를 저장하는 데 사용됩니다. Python에서는 문자열을 `str` 타입으로 처리합니다.
문자열을 표현할 때는 쌍따옴표(") 혹은 홑따옴표(')로 표현할 수 있습니다.

```python
# 문자열 변수 선언
greeting = "Hello, world!"
language = 'Python'
```

문자열은 다양한 연산과 메서드를 사용할 수 있습니다.

```python
# 문자열 연산 예제
first_name = "John"
last_name = "Doe"

# 문자열 연결
full_name = first_name + " " + last_name  # "John Doe"

# 문자열 반복
repeat_name = first_name * 3  # "JohnJohnJohn"

# 문자열 길이
length_of_name = len(first_name)  # 4

# 문자열 포맷팅
age = 30
formatted_string = f"My name is {first_name} and I am {age} years old."  # "My name is John and I am 30 years old."

# 문자열 메서드
upper_case = first_name.upper()  # "JOHN"
lower_case = first_name.lower()  # "john"
capitalized = first_name.capitalize()  # "John"
```

## 3. 타입 변환

Python에서는 변수의 타입을 다른 타입으로 변환할 수 있습니다. 이를 **형변환**이라고 합니다.

```python
# 정수를 문자열로 변환
num = 100
str_num = str(num)  # "100"

# 문자열을 정수로 변환
str_value = "250"
int_value = int(str_value)  # 250

# 문자열을 실수로 변환
str_float = "3.14"
float_value = float(str_float)  # 3.14

# 실수를 정수로 변환
float_num = 9.99
int_float = int(float_num)  # 9
```

형변환을 통해 서로 다른 데이터 타입 간의 연산을 보다 유연하게 수행할 수 있습니다.

## 4. 결론

Python에서 변수와 데이터 타입은 프로그래밍의 기본 요소입니다. 변수는 데이터를 저장하고 처리하는 데 사용되며, 데이터 타입은 변수에 저장된 값의 종류를 나타냅니다.
정수, 실수, 문자열은 Python에서 가장 많이 사용되는 데이터 타입으로, 각각의 특성과 사용 방법을 이해하는 것이 중요합니다.
