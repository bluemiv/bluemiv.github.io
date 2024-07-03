---
title: React Props란?
description: props는 React에서 컴포넌트 간에 데이터를 전달하는 데 사용되는 개념입니다. 이 글에서는 React의 props에 대해 설명합니다.
date: 2024-02-17 22:29:25 +0900
last_modified_at: 2024-02-17 22:29:25 +0900
categories: [ WEB, React ]
tags: [ 리액트, react, javascript, front-end, web, props, properties ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-17-react-props/thumbnail.webp
  alt: React Props란?
---

## 1. React Props란?

`props`는 "properties"의 줄임말로, 부모 컴포넌트에서 자식 컴포넌트로 값을 전달할 때 사용합니다.

### 1.1. Props의 특징

1. **읽기 전용**: `props`는 읽기 전용입니다. 자식 컴포넌트는 전달받은 `props`를 수정할 수 없습니다. 이는 데이터 흐름의 일관성을 유지하고, 부작용(side effect)을 방지합니다.
2. **불변성**: `props`는 컴포넌트가 렌더링될 때 설정되며, 부모 컴포넌트가 재렌더링되지 않는 한 변경되지 않습니다.
3. **단방향 데이터 흐름**: `props`를 통해 데이터는 부모에서 자식으로 단방향으로 흐릅니다. 이는 상태 관리의 복잡성을 줄여줍니다.

## 2. Props 사용 방법

### 2.1. Props 전달하기

먼저, 간단한 `React` 컴포넌트 2개를 생성합니다.

- ParentComponent
- ChildComponent

이 ParentComponent 컴포넌트는 `props`를 통해 데이터를 ChildComponent로 전달합니다.

```jsx
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  return (
    <div>
      <h1>React Props 전달 예제</h1>
      <ChildComponent name="아이유" age={30}/>
    </div>
  );
};

export default ParentComponent;
```

```jsx
import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
};

export default ChildComponent;
```

위 예제에서 `ParentComponent`는 `ChildComponent`에게 `name`과 `age`라는 `props`를 전달합니다. `ChildComponent`는 이 `props`를 받아 화면에 보여줍니다.

### 2.2. Props의 기본값 설정

`props`에 기본값을 설정하면 부모 컴포넌트에서 `props`를 전달하지 않았도, 사용할 default 값을 지정할 수 있습니다.
기본값을 설정할 때, `prop-types` 라이브러리의 PropTypes를 사용합니다.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
};

ChildComponent.defaultProps = {
  name: '이름 없음',
  age: 0,
};

export default ChildComponent;
```

위 예제에서는 `name`과 `age`의 기본값을 각각 `'이름 없음'`과 `0`으로 설정했습니다.

### 2.3. Props 타입 검증

`PropTypes`를 사용하면 `props`의 타입을 검증할 수 있습니다. 컴포넌트에 예상치 못한 타입의 `props`를 전달 받았는지 확인할 수 있습니다.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = (props) => {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
};

ChildComponent.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
};

export default ChildComponent;
```

위 예제에서는 `propTypes`를 사용하여 `name`이 `string` 타입이고, `age`가 `number` 타입이라고 정의했습니다.

#### 2.3.1. 복잡한 구조체 props

조금 더 응용하면, 아래와 같이 복잡한 구조체도 타입을 지정할 수 있습니다.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ChildComponent = (props) => {
  const {name, age, address} = props.user;
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Address: {address}</p>
    </div>
  );
};

ChildComponent.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    address: PropTypes.string,
  }),
};

export default ChildComponent;
```

#### 2.3.2. 함수 props

또는 함수도 props로 전달 할 수 있습니다.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>카운트 증가</button>
    </div>
  );
};

Counter.propTypes = {
  onClick: PropTypes.func,
};

export default Counter;
```

부모 컴포넌트에서 `Counter` 컴포넌트로 `onClick` 버튼 이벤트 핸들러 함수를 `props`로 전달합니다.

## 3. 결론

이와 같이 `React`에서 `props`를 사용하면 부모와 자식 컴포넌트 간에 데이터를 주고받을 수 있습니다. `props`는 단순한 데이터 전달뿐 아니라, 함수와 객체, 상태를 포함하는 복잡한 데이터 구조를 전달할 수도 있습니다.

> 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 것이 아닌, 컴포넌트 내에서 데이터를 관리하고 싶은 경우, State를 사용합니다. State에 대해 자세한 내용이 궁금하시면 [이 글](/posts/react-state/)을 참고해주세요.
{: .prompt-tip }
