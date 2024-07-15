---
title: Stable Diffusion에서의 Prompt란?
description: Stable Diffusion을 사용하여 이미지를 생성할 때, '프롬프트(prompt)'를 사용합니다. 해당 글에서는 프롬프트에 대해 설명하고 효과적으로 프롬프트를 작성하는 방법에 대해 설명합니다.
date: 2024-02-23 16:42:50 +0900
last_modified_at: 2024-02-23 16:42:50 +0900
categories: [ AI, Stable Diffusion ]
tags: [ ai, sb, stable diffusion, 인공지능, prompt, 프롬프트, machine learning ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex3.webp
  alt: Stable Diffusion에서의 Prompt란?
---

## 1. 프롬프트(Prompt)란?

프롬프트(prompt)는 Stable Diffusion과 같은 텍스트-이미지 생성 모델에서 **이미지를 생성하기 위해 입력하는 텍스트**를 의미합니다. 프롬프트는 모델이 생성할 이미지의 내용을 설명하는 중요한 역할을 합니다.

예를 들어, "a beautiful sunset over a mountain range"라는 프롬프트를 입력하면, 모델은 해당 텍스트를 기반으로 "산맥 너머로 일몰" 이미지를 그리게 됩니다

![산맥 너머 일몰 이미지](/assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex1.webp)
_산맥 너머 일몰 이미지_

## 2. 프롬프트의 중요성

프롬프트는 모델이 어떤 이미지를 생성할지 결정하는 데 중요한 역할을 합니다. 잘 작성된 프롬프트는 원하는 결과를 얻는 데 도움이 되며, 반대로 추상적이거나 부정확한 프롬프트는 원하는 이미지를 얻을 수 없게 됩니다.

## 3. 효과적으로 프롬프트 작성하기

효과적인 프롬프트를 작성하는 방법은 아래와 같습니다.

### 3.1. 구체적으로 작성하기

프롬프트는 가능한 한 구체적으로 작성하는 것이 좋습니다. 구체적인 세부사항을 포함하면, 모델이 더 정확한 이미지를 생성할 수 있습니다.

예를들어, 고양이를 그린다고 했을때, 단순히 `a cat`이라고 입력하기 보단 아래와 같이 구체적으로 입력하면 좋습니다.

```text
a cat sitting on a red couch in a sunny living room
```

위 프롬프트는 `a cat` 보다 구체적이며, 모델이 생성할 이미지의 배경과 분위기를 명확하게 설정해주기 때문에 원하는 그림을 얻기 쉬워집니다.

![햇볕이 잘 드는 거실 빨간 소파에 앉아 있는 고양이](/assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex2.webp)
_햇볕이 잘 드는 거실 빨간 소파에 앉아 있는 고양이_

### 3.2. 키워드 사용

프롬프트에 중요한 키워드를 포함하면, 모델이 이미지의 핵심 요소를 쉽게 인식하고 생성할 수 있습니다.

```text
an astronaut riding a horse on the moon, with stars in the background
```

위 프롬프트는 `astronaut`, `horse`, `moon`, `stars`와 같은 키워드를 포함하여 모델이 어떤 요소를 포함해야 하는지 명확하게 알려줍니다.

![별을 배경으로 달에서 말을 타고 있는 우주비행사](/assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex3.webp)
_별을 배경으로 달에서 말을 타고 있는 우주비행사_

### 3.3. 스타일과 분위기 지정

프롬프트에 스타일이나 분위기를 지정하면, 모델이 이미지의 전체적인 느낌을 더 잘 표현할 수 있습니다.

```text
a futuristic cityscape in a cyberpunk style with neon lights
```

위 프롬프트는 `futuristic cityscape`, `cyberpunk style`, `neon lights`와 같은 요소를 포함하여 모델이 생성할 이미지의 분위기를 설정할 수 있습니다.

![네온 불빛이 있는 사이버펑크 스타일의 미래 도시 풍경](/assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex4.webp)
_네온 불빛이 있는 사이버펑크 스타일의 미래 도시 풍경_

### 3.4. 예술가나 참고 이미지 작성

특정 예술가의 스타일이나 참고 이미지를 언급하면, 모델이 더 특정한 스타일로 이미지를 생성할 수 있습니다.

```text
a portrait of a woman in the style of Vincent van Gogh
```

이 프롬프트는 `portrait of a woman`, `style of Vincent van Gogh`와 같은 Vincent van Gogh 예술가 스타일의 이미지를 생성할 수 있습니다.

![빈센트 반 고흐 스타일의 여성 초상화](/assets/img/posts/ai/stable-diffusion/2024-02-23-stable-diffusion-prompt/ex5.webp)
_빈센트 반 고흐 스타일의 여성 초상화_
