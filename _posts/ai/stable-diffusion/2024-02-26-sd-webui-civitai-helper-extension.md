---
title: Civitai Helper, Stable Diffusion Extension 추천
description: Stable Diffusion에서 사용할 수 있는 모델을 다운로드 받을 수 있는 Civitai 공유 사이트가 있습니다. 이 글에서는 쉽게 모델을 다운로드 받을 수 있게 도와주는 Civitai Helper extension에 대해 설명합니다.
date: 2024-02-26 04:14:33 +0900
last_modified_at: 2024-02-26 04:14:33 +0900
categories: [ AI, Stable Diffusion ]
tags: [ ai, sb, stable diffusion, 인공지능, prompt, 프롬프트, civitai, civitai helper ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex8.webp
  alt: Civitai Helper, Stable Diffusion Extension 추천
---

## 1. Civitai란?

[Civitai](https://civitai.com/)는 Stable Diffusion와 같이 다양한 AI 이미지 생성 모델을 공유하고 다운로드할 수 있는 공유 사이트입니다.
부연 설명을 더하자면, 프롬프트(prompt)를 입력받아 이미지를 생성하는 `text-to-image` model들을, Civitai에서는 개발자와 사용자 간에 쉽게 공유할 수 있습니다.

> 주의 할 점으로는 선정적인 모델이나 이미지도 많기 때문에 주의가 필요합니다.
{: .prompt-danger }

## 2. Civitai Helper란?

모델을 적용할 때는 Civitai 사이트에서 직접 다운로드 받아서 Stable Diffusion의 특정 경로에 복사하여 model들을 적용할 수 있습니다.
`Civitai Helper`는 사이트에 들어갈 필요없이 Stable Diffusion WebUI에서 바로 모델, 체크포인트, LORA(LoRA), Textual Inversion 등을 다운로드 받을 수 있게 도와주는 Extension입니다.

## 3. Extension 설치 방법

Stable Diffusion에서 `easy-prompt-selector` Extension을 설치하는 방법은 아래와 같습니다.

- 메뉴 탭에서 `Extensions`를 클릭합니다.

![Extensions 메뉴 클릭](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex1.webp)
_Extensions 메뉴 클릭_

- 서브 메뉴 탭에서 `install from URL` 을 클릭한 뒤, 아래 사진과 같이 입력 창에 주소를 입력합니다. 그리고, `Installed` 를 클릭합니다.

```text
https://github.com/butaixianran/Stable-Diffusion-Webui-Civitai-Helper
```

![Install from URL 서브 메뉴 클릭](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex2.webp)
_Install from URL 서브 메뉴 클릭_

- 이후, Installed 서브탭에서 `Apply and restart UI`를 클릭합니다.

![Apply and restart UI 버튼 클릭](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex3.webp)
_Apply and restart UI 버튼 클릭_

- Stable Diffusion Web UI가 재시작이 됩니다.

![재시작 중](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex4.webp)
_재시작 중_

## 3. 사용 방법

재시작이 되면 못보던 탭이 하나 생성됩니다.

![Civitai Helper 탭 (1)](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex5.webp)
_Civitai Helper 탭 (1)_

![Civitai Helper 탭 (2)](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex6.webp)
_Civitai Helper 탭 (2)_

Download Model에 다운로드 받고 싶은 모델의 civitai 주소를 입력하고 `Get Model Info by Civitai Url` 버튼을 클릭합니다.

그리고, `Model Name`, `Model Type`, `Sub-foler`, `Model Version` 을 선택하고, `Download Model` 버튼을 누르면 알아서 모델을 다운로드 받아옵니다.

![Download Model](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex7.webp)
_Download Model_

> 모델의 크기에 따라 시간이 다소 소요될 수 있습니다. 큰 모델의 경우는 10~20분 넘게 걸릴 수 있습니다.
{: .prompt-info }

### 3.1. 이미지 생성

다운로드 받은 모델로 이미지를 생성해보겠습니다.

```text
city street, neon, fog, volumetric, closeup photo of a 50 y.o man in dark clothes, serious face
```
{: file='positive prompt'}

```text
(nsfw, naked, nude, deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation
```
{: file='negative prompt'}

![결과물](/assets/img/posts/ai/stable-diffusion/2024-02-26-sd-webui-civitai-helper-extension/ex8.webp)
_결과물_

## 4. Reference

- [https://github.com/butaixianran/Stable-Diffusion-Webui-Civitai-Helper](https://github.com/butaixianran/Stable-Diffusion-Webui-Civitai-Helper)
