---
title: React State란? (상태관리)
description: 리액트(React)의 핵심 개념 중 하나는 바로 state(상태)입니다. state는 컴포넌트의 동적인 데이터를 관리하며, 사용자 상호 작용할 수 있게 만드는 중요한 역할을 합니다. 이번 글에서는 React의 state에 대해 설명합니다.
date: 2024-02-18 21:20:24 +0900
last_modified_at: 2024-02-18 21:20:24 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, state, 상태관리, 상태, 훅, hooks, react hooks ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-18-react-state/thumbnail.webp
  alt: React State란? (상태관리)
---

## 1. 리액트의 상태(`state`)란?

React의 `state`는 컴포넌트의 동적 데이터를 관리할 때 사용합니다. 예를 들어, 사용자가 입력한 form 데이터, 서버에서 가져온 데이터, 버튼 클릭 등의 이벤트에 따라 변하는 값을 저장하합니다.
`state`는 React의 핵심 개념 중 하나로, 객체의 값이 변경될 때마다 해당 컴포넌트는 다시 렌더링됩니다.

## 2. State의 초기화 및 사용 방법

React 컴포넌트에서 `state`를 사용하려면, 함수형 컴포넌트에서는 `useState` 훅(hook)을 사용하여 `state`를 관리할 수 있습니다.

아래 예시는 `useState`를 사용하여 State를 선언 및 초기화하고, 상태를 변경하는 코드입니다.

```jsx
import React, {useState} from 'react';

function Counter() {
  // State를 초기화하고, 초기값으로 0을 설정
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

위 예제에서 `useState`는 상태 변수인 `count`와 상태를 업데이트하는 함수인 `setCount`를 반환합니다. 버튼에는 onClick 이벤트 핸들러를 정의하여, 클릭할 때마다 `setCount`를 호출하여 `count` 값을 증가시킵니다.
React는 State가 변경될 때마다 컴포넌트를 다시 렌더링합니다.

## 3. 상태 관리시 주의할 점

React의 `state`를 사용할 때는 몇 가지 중요한 규칙이 있습니다.

### 3.1. State는 불변해야 함

React에서 상태는 직접 변경하면 안 됩니다. 대신, 상태를 업데이트할 때는 `setState` 혹은 `useState`를 사용하여, 새로운 State로 업데이트 해야 합니다.
React의 State 업데이트 함수가 새로운 State로 업데이트하고, 변경된 State를 기반으로 컴포넌트를 다시 렌더링합니다.

> React의 State 업데이트 함수 종류
> - `setState`: 클래스 컴포넌트에서 사용하는 State 업데이트 함수
> - `useState`: 함수형 컴포넌트에서 사용하는 State 업데이트 함수
{: .prompt-info }

아래 예시는 State를 직접 변경하는 잘못된 예시입니다.

```jsx
// 직접 상태를 변경하면 안됨 (변경 하더라도 렌더링이 발생하지 않음)
this.state.count = this.state.count + 1;
```

아래 예시는 `setState` 혹은 `useState`를 사용하여 변경하는 올바른 예시입니다.

```jsx
// useState를 사용하여 상태를 업데이트
function Counter() {
  const [count, setCount] = useState(0);
  
  const onClickButton = () => {
    setCount(count + 1);
  }
  //...
}

// setState를 사용하여 상태를 업데이트
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  onClickButton = () => {
    this.setState({ count: this.state.count + 1 });
  };
  //...
}
```

### 3.2. 상태 업데이트는 비동기로 처리 됨

React의 상태 업데이트는 비동기적으로 처리됩니다. 따라서, 상태 업데이트를 하더라도, 즉시 변경되지 않을 수 있습니다.
따라서, 상태 업데이트 직후의 상태 값을 사용해야 하는 경우에는 콜백 함수를 사용하는 것이 좋습니다.

잘못된 예시

```jsx
setCount(count + 1);
console.log(count); // 이전 상태 값이 출력될 수 있음
```

올바른 예시

```jsx
setCount(prevCount => {
  console.log(prevCount); // 이전 상태 값
  return prevCount + 1;
});
```

## 4. State와 props의 차이

React에서 `state`와 `props`는 모두 컴포넌트의 데이터를 관리하는 데 사용되지만, 그 목적과 사용 방법은 다릅니다.

- **`state`**: 컴포넌트 내부에서 관리되는 동적인 데이터입니다. 상태는 컴포넌트 내부에서 변경될 수 있으며, 컴포넌트의 재렌더링을 트리거합니다.
- **`props`**: 부모 컴포넌트로부터 전달받은 데이터입니다. `props`는 읽기 전용이며, 자식 컴포넌트에서는 변경할 수 없습니다. `props`를 통해 컴포넌트 간에 데이터를 전달합니다.

> Props에 대해 좀 더 자세한 내용이 궁금하시면 [이 글](/posts/react-props/)을 참고해주세요.
{: .prompt-tip }
