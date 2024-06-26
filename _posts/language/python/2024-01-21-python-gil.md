---
title: Python GIL (Global Interpreter Lock)
description: Python의 Global Interpreter Lock (GIL)은 파이썬의 메모리 관리를 단순화하고, 여러 스레드에서 동시에 Python 객체에 접근하는 문제를 방지하기 위해 존재합니다. 이 글에서는 GIL의 기본 개념, 작동 방식에 대해 설명합니다.
date: 2024-01-21 17:15:36 +0900
last_modified_at: 2024-01-21 17:15:36 +0900
categories: [ Language, Python ]
tags: [ python, gil, global interpreter lock ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/language/python/2024-01-21-python-gil/thumbnail.webp
  alt: Python GIL (Global Interpreter Lock)
---

## 1. GIL이란?

`GIL`은 **Global Interpreter Lock**의 약자로, 파이썬 인터프리터가 한 번에 하나의 스레드만 실행되도록 하는 **뮤텍스**(`Mutex`)입니다. GIL은 파이썬이 **CPython** 구현에서
메모리 관리를 효율적으로 하기 위해 도입되었습니다.

파이썬은 **동시성**(`concurrency`)을 지원하기 위해 **스레드**(`thread`)를 사용할 수 있지만, `GIL` 때문에 실제로는 한 번에 하나의 스레드만 실행됩니다. 이로 인해 멀티코어 CPU에서 기대한 성능
에 못미치는 결과가 발생할 수 있습니다.

## 2. GIL의 작동 방식

GIL의 작동 방식은 아래와 같습니다.

- **스레드 시작**: Python 인터프리터가 스레드를 시작할 때, GIL을 획득해야 합니다.
- **GIL 획득**: 스레드는 GIL을 획득한 후에만 Python 코드를 실행할 수 있습니다.
- **GIL 해제**: 스레드는 일정 시간 또는 특정 작업을 완료한 후 GIL을 해제합니다.

```python
import time
import threading


# CPU-bound task
def cpu_bound_task(n):
    total = 0
    for i in range(n):
        total += i * i
    return total


# 스레드를 사용하지 않았을 때,
def without_threading(n, repeat):
    start_time = time.time()
    for _ in range(repeat):
        cpu_bound_task(n)
    end_time = time.time()
    return end_time - start_time


# 스레드를 사용했을때,
def with_threading(n, repeat):
    start_time = time.time()
    threads = []
    for _ in range(repeat):
        thread = threading.Thread(target=cpu_bound_task, args=(n,))
        thread.start()
        threads.append(thread)

    for thread in threads:
        thread.join()
    end_time = time.time()
    return end_time - start_time


n = 1000000
repeat = 8  # 8번 반복

time_without_threading = without_threading(n, repeat)
print(f"스레드 사용하지 않았을때 걸린 시간: {time_without_threading:.4f} seconds")

time_with_threading = with_threading(n, repeat)
print(f"스레드 사용했을때 걸린 시간: {time_with_threading:.4f} seconds")
```

위 예제는 스레드를 사용하지 않고 순차적으로 8번 반복하여 CPU 바운드 작업을 수행할 때와 8 개의 스레드로 CPU 바운드 작업을 수행할 때와 걸리는 시간을 비교하는 예제 코드입니다.

![1회차](/assets/img/posts/language/python/2024-01-21-python-gil/ex2-1.webp)
_1회차_

![2회차](/assets/img/posts/language/python/2024-01-21-python-gil/ex2-2.webp)
_2회차_

![3회차](/assets/img/posts/language/python/2024-01-21-python-gil/ex2-3.webp)
_3회차_

실행 결과를 보면, GIL 때문에 실제로는 한 번에 하나의 스레드만 실행되어서 걸린 시간도 큰 차이없이 비슷한 것을 확인할 수 있습니다.

## 3. GIL의 장점

1. **메모리 관리 단순화**: GIL 덕분에 메모리 관리를 단순화할 수 있습니다. 이는 `refcount` 업데이트와 같은 작업이 안전하게 수행되도록 해줍니다.
2. **C 확장 모듈 호환성**: 많은 C 확장 모듈들이 GIL을 활용하여 스레드 안전성을 유지합니다.
3. **쉬운 구현**: GIL은 파이썬 인터프리터의 구현을 단순화하여 유지보수와 디버깅을 쉽게 합니다.

## 4. GIL의 단점

1. **멀티코어 성능 저하**: 멀티코어 CPU 환경에서는 병목 현상이 발생하여 성능이 저하됩니다. 이는 한 번에 하나의 스레드만 실행되기 때문에, 멀티코어를 효율적으로 활용하지 못합니다.
2. **스레드 경합**: 여러 스레드가 GIL을 획득하려고 경합하기 때문에, 성능이 떨어질 수 있습니다.
3. **높은 지연 시간**: GIL을 자주 해제하고 재획득하는 과정에서 추가적인 지연이 발생할 수 있습니다.

## 5. GIL의 단점 극복 방법

### 5.1. 멀티프로세싱 사용

멀티코어 성능을 활용하기 위해 멀티프로세싱을 사용할 수 있습니다. `multiprocessing` 모듈을 사용하면, 별도의 프로세스에서 코드를 실행하여 GIL의 영향을 피할 수 있습니다.

```python
from multiprocessing import Process

def worker():
    for _ in range(1000):
        pass

processes = [Process(target=worker) for _ in range(4)]
for process in processes:
    process.start()

for process in processes:
    process.join()
```

### 5.2. C 확장 모듈 사용

CPU 집약적인 작업을 C 확장 모듈로 구현하여 GIL을 해제할 수 있습니다. 예를 들어, `numpy`와 같은 라이브러리는 내부적으로 C로 작성되어 있어, GIL의 영향을 받지 않습니다.

### 5.3. asyncio 사용

`asyncio`를 사용하여 비동기 프로그래밍을 통해 GIL의 영향을 최소화할 수 있습니다. `asyncio`는 이벤트 루프를 사용하여 동시성을 처리합니다.

```python
import asyncio

async def worker():
    for _ in range(1000):
        pass

async def main():
    tasks = [asyncio.create_task(worker()) for _ in range(4)]
    await asyncio.gather(*tasks)

asyncio.run(main())
```
