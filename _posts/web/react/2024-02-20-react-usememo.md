---
title: React useMemo를 활용한 성능 최적화
description: React에서 useMemo hook은 메모이제이션을 통해 불필요한 연산을 피하고 성능을 최적화하는 데 사용합니다. 이 글에서는 useMemo에 대해서 설명합니다.
date: 2024-02-20 23:33:46 +0900
last_modified_at: 2024-02-20 23:33:46 +0900
categories: [ WEB, React ]
tags: [ 리액트, web, front-end, react, hooks, usememo, optimization, performance, memoization ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/web/react/2024-02-20-react-usememo/thumbnail.webp
  alt: React useMemo를 활용한 성능 최적화
---

## 1. useMemo란?

`useMemo`는 React에서 기본으로 제공하는 훅(hook)입니다. 처음에 연산한 값을 메모리에 저장해두고, 그 이후부터는 메모이제이션된 값을 반환하여 불필요한 연산을 방지합니다.

`useEffect`와 비슷하게 `useMemo`도 두 번째 인자로 의존성 배열을 받습니다. 의존성 배열의 값이 변경되지 않는 한, 기존 메모이제이션된 값을 반환하게 됩니다.

> useEffect에 대한 내용이 궁금하시면 [이 글](/posts/react-useeffect/)을 참고해주세요.
{: .prompt-info }

```tsx
import React, { useMemo } from 'react';

interface TProps {
  numbers: number[];
}

function ExpensiveComponent({ numbers }: TProps) {
  const computedValue = useMemo(() => {
    // 아래 연산 매우 비싼 연산이라고 가정
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return (
    <div>
      <p>Computed Value: {computedValue}</p>
    </div>
  );
}

export default function App() {
  return (
    <ExpensiveComponent numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
  );
};
```

위 코드에서는 `numbers` 배열이 변경되지 않는 한 `computedValue`는 재계산되지 않습니다. 위와 같이 불필요한 연산을 줄이고, 성능을 최적화하는 데 사용할 수 있습니다.

## 2. useMemo의 사용 예시

### 2.1. 리스트 필터링

리스트를 필터링할 때 매번 필터링 로직이 실행되는 것을 피하기 위해 `useMemo`를 사용할 수 있습니다.

```tsx
import React, { useState, useMemo } from 'react';

interface TProps {
  users: { id: number; name: string }[];
}

function UserList({ users }: TProps) {
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.includes(search));
  }, [search, users]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <UserList
      users={[
        { id: 1, name: '아무개' },
        { id: 2, name: '홍길동' },
        { id: 3, name: '윈터' },
        { id: 4, name: '카리나' },
        { id: 5, name: '아이유' },
      ]}
    />
  );
};
```

위 코드에서 `searchTerm`이나 `users`가 변경되지 않는 한, `filteredUsers`는 재계산되지 않습니다.

## 3. useMemo 사용시 주의할 점

성능 최적화를 위한다고 `useMemo`를 남용하는건 오히려 독이 될 수 있습니다.

1. **과도한 사용 피하기**: 모든 값을 메모이제이션하는 것은 오히려 성능을 저하시킬 수 있습니다. 비용이 큰 계산이나 변하지 않는 값을 메모이제이션할때만 사용하는 것이 좋습니다.
2. **메모리 공간**: 메모이제이션된 값은 메모리에 저장되므로, 메모리 사용량도 같이 고려해야 합니다.
