---
title: Tag Complete, Stable Diffusion Extension 추천 
description: Stable Diffusion을 사용하여 이미지를 생성할 때, '프롬프트(prompt)'를 작성하는 것은 중요합니다. 단어 몇개만 입력해도 자동으로 prompt를 추천해주는 Tag Complete에 대해 설명합니다.
date: 2024-02-25 22:50:57 +0900
last_modified_at: 2024-02-25 22:50:57 +0900
categories: [ AI, Stable Diffusion ]
tags: [ ai, sb, stable diffusion, 인공지능, prompt, 프롬프트, sd webui tagcomplete, tagcomplete ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex4.webp
  alt: Tag Complete, Stable Diffusion Extension 추천
---

## 1. SD WebUI Tagcomplete

`SD WebUI Tagcomplete` extension은 prompt 일부분만 입력해도 자동으로 prompt를 추천해주는 Extension입니다.

## 2. Extension 설치 방법

Stable Diffusion에서 `easy-prompt-selector` Extension을 설치하는 방법은 아래와 같습니다.

- 메뉴 탭에서 `Extensions`를 클릭합니다.

![Extensions 클릭](/assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex1.webp)
_Extensions 클릭_

- 서브 메뉴 탭에서 `install from URL` 을 클릭한 뒤, 아래 사진과 같이 입력 창에 주소를 입력합니다. 그리고, `Installed` 를 클릭합니다.

```text
https://github.com/DominikDoom/a1111-sd-webui-tagcomplete
```

![install from URL](/assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex2.webp)
_install from URL_

- 이후, Installed 서브탭에서 `Apply and restart UI`를 클릭합니다. Stable Diffusion Web UI가 재시작이 됩니다. 

![Installed 클릭](/assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex3.webp)
_Installed 클릭_

## 3. 사용 방법

Stable Diffusion Web UI가 재시작이 된 뒤에, prompt 입력창에 원하는 단어를 입력해보면 관련된 prompt가 밑에 추천으로 나오게 됩니다.

![prompt 자동 완성 (1)](/assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex4.webp)
_prompt 자동 완성 (1)_

![prompt 자동 완성 (2)](/assets/img/posts/ai/stable-diffusion/2024-02-25-sd-webui-tagcomplete-extension/ex5.webp)
_prompt 자동 완성 (2)_

## 4. Reference

- [https://github.com/DominikDoom/a1111-sd-webui-tagcomplete](https://github.com/DominikDoom/a1111-sd-webui-tagcomplete)
