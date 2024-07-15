---
title: React useEffect(), 컴포넌트 생명 주기 관리 방법
description: 리액트에서 useEffect는 함수형 컴포넌트에서 부수 효과(side effect)를 수행하기 위해 사용하는 훅(hook)입니다. 이 글에서는 useEffect에 대해 설명합니다.
date: 2024-02-19 22:01:04 +0900
last_modified_at: 2024-02-19 22:01:04 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, useeffect, react hooks, lifecycle, javascript, ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-19-react-useeffect/thumbnail.webp
  alt: React useEffect(), 컴포넌트 생명 주기 관리 방법
---

## 1. useEffect란?

`useEffect`는 **컴포넌트가 렌더링된 후**에 수행될 작업을 정의하는 훅입니다. (예를 들어, API 호출, DOM 조작, 타이머 시작 등)

> 클래스형 컴포넌트에서는 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`를 사용하면 동일한 효과를 얻을 수 있습니다.
{: .prompt-tip }

```jsx
import React, { useEffect } from 'react';

function ExampleComponent() {
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다!');
    return () => {
      console.log('컴포넌트가 언마운트되었습니다!');
    };
  }, []);

  return <div>Hello React!</div>;
}
```

위의 예제에서 `useEffect`는 컴포넌트가 처음 렌더링될 때 "컴포넌트가 마운트되었습니다!"가 콘솔에 출력됩니다.
그리고 페이지를 이동하거나 사용자 상호작용에 의해 컴포넌트가 언마운트될 때, "컴포넌트가 언마운트되었습니다!"가 콘솔에 출력됩니다.

![useEffect 결과1](/assets/img/posts/web/react/2024-02-19-react-useeffect/ex1-2.webp)
_useEffect 결과1_

![useEffect 결과2](/assets/img/posts/web/react/2024-02-19-react-useeffect/ex1-1.webp)
_useEffect 결과2_


## 2. useEffect 사용법

### 2.1. 기본 구조

`useEffect`의 기본 구조는 아래와 같습니다

```javascript
useEffect(() => {
  // 해당 부분에 코드를 작성합니다.
});
```

이 코드는 컴포넌트가 렌더링될 때마다 실행됩니다.

### 2.2. 의존성 배열

useEffect의 2번째 인자로 의존성 배열을 입력 받을 수 있는데, 의존성 배열을 사용하면 특정 값이 변경될 때만 `useEffect`가 실행되도록 할 수 있습니다.

```javascript
useEffect(() => {
  console.log('name이 변경되었습니다!');
}, [name]);
```

위의 예제에서는 `name` 값이 변경될 때만 `useEffect`가 실행됩니다.

만약, 의존성 배열을 비워두면 한번만 실행하게 됩니다.

```javascript
useEffect(() => {
  console.log('마운트 될 때 한번만 실행!');
}, []);
```

혹은 의존성 배열을 넣지 않으면, 컴포넌트가 렌더링될 때마다 실행됩니다.  

```javascript
useEffect(() => {
  console.log('컴포넌트가 렌더링될 때마다 실행!');
});
```

### 2.3. cleanup 함수

cleanup 함수는 `useEffect` 내에서 반환(return)되는 함수로, 컴포넌트가 언마운트될 때 호출됩니다.

setInterval이나 setTimeout과 같은 함수는 작업이 완료되면, `clearInterval` 혹은 `clearTimeout`과 같이 resource를 해제해주는 것이 좋습니다.

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    console.log('비지니스 로직 수행');
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

위의 예제에서는 setInterval을 수행하고, 컴포넌트가 언마운트될 때 setInterval을 리소스 해제(release)합니다.

### 2.4. 여러 개의 useEffect 사용

useEffect는 하나만 사용할 수 있는 것은 아니고, 하나의 컴포넌트에서 여러 개의 `useEffect`를 사용할 수 있습니다.

```javascript
useEffect(() => {
  console.log('컴포넌트가 마운트되었습니다!');
}, []);

useEffect(() => {
  console.log('name이 변경되었습니다!');
}, [name]);
```

각 `useEffect`는 독립적으로 동작하며, 서로 다른 의존성을 설정할 수 있습니다.

## 3. 응용

### 3.1. 데이터 가져오기 (fetch)

아래 코드는 API를 호출하여, 데이터를 가져오는 예제입니다. API는 [jsonplaceholder](https://jsonplaceholder.typicode.com/)를 사용했습니다

```tsx
import React, { useEffect, useState } from 'react';

function UserProfile() {
  const [data, setData] = useState<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  } | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>user id: {data.userId}</h1>
      <p>#{data.id}</p>
      <p>board title: {data.title}</p>
      <p>{data.completed ? '완료' : '미완료'}</p>
    </div>
  );
}
```

![데이터 가져오기](/assets/img/posts/web/react/2024-02-19-react-useeffect/ex2.webp)
_데이터 가져오기_

### 3.2. 이벤트 리스너 설정

아래 코드는 Scroll Event 리스너를 설정하는 예제입니다. 처음 컴포넌트가 마운트 될때는 스크롤 이벤트 리스너를 설정하고, 컴포넌트가 언마운트될 때 리스너를 제거합니다.

```tsx
import React, { useEffect, useState } from 'react';

function ScrollTracker() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>현재 스크롤 위치: {scrollY}</div>;
}
```

