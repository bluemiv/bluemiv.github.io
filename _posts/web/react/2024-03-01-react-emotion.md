---
title: React에서 Emotion 사용하기
description: Emotion은 React 애플리케이션에서 스타일링을 위해 사용하는 라이브러리입니다. CSS-in-JS 방식으로 스타일을 작성할 수 있게 해주며, 컴포넌트 수준에서 스타일을 정의할 수 있습니다. 본 글에서는 emotion에 대해 설명합니다.
date: 2024-03-01 22:47:17 +0900
last_modified_at: 2024-03-01 22:47:17 +0900
categories: [ WEB, React ]
tags: [ react, web, 리액트, 이모션, emotion, css ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-03-01-react-emotion/thumbnail.webp
  alt: React에서 Emotion 사용하기
---

## 1. Emotion 설치

먼저 Emotion을 사용하기 의존성을 추가해야 합니다. 자신의 React 프로젝트에 다음 명령어를 수행합니다.

```bash
npm install @emotion/react @emotion/styled
```

혹은 yarn을 사용할 경우, 다음 명령어를 수행합니다.

```bash
yarn add @emotion/react @emotion/styled
```

## 2. Emotion 사용하기

`Emotion`을 사용하는 방식에는 두 가지 주요 방식이 있습니다.

- `styled components`
- `css prop`

## 2.1. styled components로 사용하기

Emotion의 `styled` 함수를 사용하면, React 컴포넌트를 사용하듯이 스타일이 적용된 컴포넌트를 생성할 수 있습니다.

컴포넌트를 생성할 때, `CSS`를 작성하듯 유사한 방식으로 스타일을 지정할 수 있습니다. (`scss` 와 `less` 동일하게 작성 가능)

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background-color: hotpink;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: darkmagenta;
  }
`;

function App() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
```

위 코드에서 `Button`은 스타일이 지정된 컴포넌트입니다. 이 컴포넌트를 사용할 때 별도의 클래스명을 지정할 필요가 없습니다.

### 2.2. css prop 방식으로 사용하기

Emotion에서는 `css` prop을 사용하여 컴포넌트에 스타일을 직접 적용할 수도 있습니다.

```jsx
import React from 'react';
import {css} from '@emotion/react';

function App() {
  return (
    <div>
      <button
        css={css`
          background-color: hotpink;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;

          &:hover {
            background-color: darkmagenta;
          }
        `}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
```

`css` prop을 사용하면 스타일을 별도의 styled component로 분리하지 않고도 인라인 스타일링이 가능합니다.

> css prop을 사용하는 방식과 일반 css 방식이 비슷한데, 왜 사용할까?
> CSS 파일을 사용할 경우 스타일이 전역적으로 적용되기 때문에, 특정 컴포넌트의 스타일이 다른 컴포넌트에 영향을 줄 수 있습니다. 반면, Emotion을 사용하면 스타일이 컴포넌트에 국한되어 적용되기 때문에 스타일의 충돌을 방지할 수 있습니다.
{: .prompt-tip }
