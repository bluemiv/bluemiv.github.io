---
title: Python 주석 작성법, 코드의 가독성과 유지보수성 향상하기
description: 주석을 올바르게 사용하면 코드의 의미를 명확하게 전달할 수 있고, 협업하는 개발자들이 코드를 더 쉽게 이해할 수 있습니다. 이 글에서는 Python 주석 작성법에 대해 살펴봅니다.
date: 2024-01-16 16:24:04 +0900
last_modified_at: 2024-01-16 16:24:04 +0900
categories: [ Language, Python ]
tags: [ python, comment, 주석, 협업 ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/python/2024-01-16-python-commenting-guide/thumbnail.webp
  alt: Python 주석 작성법, 코드의 가독성과 유지보수성 향상하기
---

## 1. 주석이란?

주석은 `#` 기호로 시작합니다. `#` 뒤에 오는 모든 텍스트는 주석으로 간주되어 프로그램에 영향을 주지 않습니다.

```python
# 이 주석은 단일 라인 주석입니다.
print("Hello, World!")  # 이 주석은 코드 라인 끝에 추가된 주석입니다.
```

## 2. 여러 줄 주석 (Multi-line Comments)

Python에는 C나 Java와 같은 여러 줄 주석을 지원하는 특별한 구문은 없지만, 여러 줄 주석을 작성하려면 여러 개의 단일 라인 주석을 사용할 수 있습니다.

```python
# 첫 번째 줄 주석입니다.
# 두 번째 줄 주석입니다.
# 세 번째 줄 주석입니다.
```

다른 방법으로는, 긴 설명이 필요할 때는 여러 줄 문자열(`"""` 혹은 `'''`)을 사용할 수도 있습니다. 여러 줄 문자열은 주석이 아니지만, 문서화 문자열(docstring)으로 활용할 수 있습니다.

```python
"""
이것은 여러 줄 문자열로,
여러 줄 주석처럼 사용할 수 있습니다.
"""
```

## 3. 주석의 종류

주석은 코드의 목적과 상황에 따라 여러 종류로 나눌 수 있습니다.

### 3.1. 설명 주석 (Descriptive Comments)

설명 주석은 코드의 목적과 동작을 설명합니다. 주로 함수나 클래스의 시작 부분에 작성됩니다.

```python
def add(a, b):
    # 두 숫자의 합을 반환합니다.
    return a + b
```

### 3.2. TODO 주석

TODO 주석은 나중에 수정하거나 추가해야 할 작업을 표시합니다. 주로 `TODO` 키워드를 사용합니다.

```python
# TODO: 이 함수의 성능을 개선해야 합니다.
def process_data(data):
    pass
```

### 3.3. 디버깅 주석 (Debugging Comments)

디버깅 주석은 코드의 특정 부분을 디버깅하기 위해 임시로 추가하는 주석입니다. 디버깅이 끝난 후에는 제거하는 것이 좋습니다.

```python
def calculate_total(price, tax):
    total = price + (price * tax)
    # print(f"총합: {total}")  # 디버깅을 위해 추가한 주석
    return total
```

## 4. 주석 작성의 모범 사례

### 4.1. 명확하고 의미 있는 주석 작성

주석은 코드의 의도를 명확히 전달해야 합니다.

```python
# 좋지 않은 예
x = x + 1  # x에 1을 더합니다.

# 좋은 예
x = x + 1  # 사용자 입력 값을 반영하여 카운트를 증가시킵니다.
```

### 4.2. 코드와 주석의 일관성 유지하기

코드를 변경할 때는 주석도 함께 업데이트해야 합니다. 코드와 주석이 일치하지 않으면 오히려 혼란을 초래할 수 있습니다.

```python
# [초기 코드]
# 총합을 계산합니다.
total = price + tax

# [코드 변경 후 주석도 함께 업데이트]
# 세금을 포함하여 총합을 계산합니다.
total = price + (price * tax)
```

### 4.3. 중요한 로직에는 상세한 주석 달기

복잡한 알고리즘이나 중요한 로직에는 상세한 주석을 달아 다른 개발자가 쉽게 이해할 수 있도록 합니다.

```python
def binary_search(arr, target):
    """
    정렬된 배열에서 이진 검색을 수행합니다.
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

## 5. 주석과 문서화 문자열 (Docstrings)

Python에서는 문서화 문자열을 사용하여 함수, 클래스, 모듈의 설명을 작성할 수 있습니다. 문서화 문자열은 함수나 클래스의 첫 번째 줄에 작성합니다.

### 5.1. 함수 문서화 문자열

함수의 사용법과 매개변수, 반환 값을 설명합니다.

```python
def add(a, b):
    """
    두 숫자의 합을 반환합니다.

    params:
    a (int): 첫 번째 숫자
    b (int): 두 번째 숫자

    returns:
    int: 두 숫자의 합
    """
    return a + b
```

### 5.2. 클래스 문서화 문자열

클래스의 목적과 사용법을 설명합니다.

```python
class Calculator:
    """
    간단한 계산기 클래스입니다.
    
    method:
    add(a, b): 두 숫자의 합을 반환합니다.
    subtract(a, b): 두 숫자의 차를 반환합니다.
    """
    
    def add(self, a, b):
        """두 숫자의 합을 반환합니다."""
        return a + b
    
    def subtract(self, a, b):
        """두 숫자의 차를 반환합니다."""
        return a - b
```
