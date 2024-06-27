---
title: React 소개 및 장점
description: React는 페이스북에서 개발한 오픈 소스 라이브러리입니다. 이 글에서는 React를 소개하고 장점에 대해 설명합니다.
date: 2024-02-16 20:53:42 +0900
last_modified_at: 2024-02-16 20:53:42 +0900
categories: [ WEB, React ]
tags: [ 리액트, react, javascript, front-end, web, single pageapplications, spa, component, virtual dom, facebook ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-16-react-intro-n-advantages/thumbnail.webp
  alt: React 소개 및 장점
---

## 1. React란?

React는 페이스북에서 개발하고 유지 보수하는 자바스크립트(`JavaScript`) 기반의 오픈 소스 라이브러리입니다. 주로 단일 페이지 애플리케이션(`single-page applications`)을 구축하는 데
사용됩니다. React는 컴포넌트 기반 아키텍처와 가상 DOM(`virtual DOM`)을 활용하여 빠르고 효율적인 렌더링을 제공합니다.

## 2. React 장점

### 2.1. 컴포넌트 기반 아키텍처

React의 가장 큰 장점 중 하나는 컴포넌트 기반 아키텍처입니다. 컴포넌트(`Component`)는 UI를 재사용 가능한 조각으로 분리하여 개발 생산성을 높여주고, 유지 보수성을 향상시켜 줍니다.

코드로 예시를 들면,

```jsx
// 예시 1.
import React from 'react';

function WelcomeMessage({name}) {
  return <h1>안녕하세요, {name}님!</h1>;
}

export default WelcomeMessage;
```

```jsx
// 예시 2.
import React, {useState} from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
    </div>
  );
}

export default Counter;
```

위와 같이 컴포넌트를 생성하여, 다른 컴포넌트에서 재사용 할 수 있습니다.

### 2.2. 가상 DOM(Virtual DOM)

React는 가상 DOM을 사용하여 실제 DOM 조작의 성능을 극대화합니다. 가상 DOM은 메모리에서 관리되며, 상태가 변경되면 최소한의 변경된 부분만 실제 DOM 업데이트를 수행합니다.

![Virtual DOM](/assets/img/posts/web/react/2024-02-16-react-intro-n-advantages/virtual-dom.webp)
_Virtual DOM_

### 2.3. 선언형 프로그래밍

React는 선언형 프로그래밍을 사용하여 UI를 설명합니다. 이는 코드가 의도한 바를 명확히 표현하고, 상태에 따른 UI 변화를 쉽게 관리할 수 있도록 도와줍니다.

> 선언형 프로그래밍(declarative programming)은 무엇을 할 것인지를 기술하는 프로그래밍 패러다임입니다. 이 방식에서는 프로그램이 어떻게 동작해야 하는지에 대한 명령을 상세히 기술하는 것이 아니라, 프로그램이 어떤 상태가 되어야 하는지, 혹은 어떤 결과를 얻고자 하는지를 기술합니다.
{: .prompt-info }

### 2.4. 매우 큰 커뮤니티와 생태계

React는 매우 큰 커뮤니티와 방대한 생태계를 자랑합니다. 공식 문서와 수많은 오픈 소스 라이브러리와 도구들이 존재하여 개발자들이 쉽게 프로젝트를 확장할 수 있습니다.

### 2.5. JSX의 사용

React는 `JSX`(JavaScript XML)라는 문법을 사용하여 자바스크립트 코드 내에서 HTML과 유사한 코드를 작성할 수 있게 해줍니다. 이는 코드의 가독성을 높이고, 컴포넌트의 구조를 명확하게 표현할 수
있습니다.

```jsx
import React from 'react';

function App() {
  return (
    <div>
      <h1>나의 첫 React 앱</h1>
      <p>Hello React!</p>
    </div>
  );
}

export default App;
```

## 3. React를 사용하면 좋은 프로젝트

### 3.1. 단일 페이지 애플리케이션(Single Page Applications, SPA)

React는 SPA 구축에 특히 유용합니다. SPA는 사용자가 페이지를 이동할 때마다 전체 페이지를 다시 로드하지 않고, 필요한 데이터 및 UI만 갱신하여 빠른 사용자 경험을 제공합니다.

### 3.2. 대규모 웹 애플리케이션

React의 컴포넌트 기반 아키텍처는 복잡한 UI를 여러 컴포넌트로 나누어 관리할 수 있습니다. 코드의 가독성과 재사용성을 높일 수 있기 때문에, 대규모 웹 애플리케이션의 개발 및 유지 보수를 용이하게 해줍니다. 

### 3.3. 상호작용이 많은 웹 사이트

React는 상태(`state`) 관리를 통해 사용자와의 상호작용이 많은 웹 사이트를 개발하기 좋습니다. 예를들어, 아래와 같은 앱이 있습니다. 

- SNS 앱
- 채팅 앱
- 실시간 대시보드
