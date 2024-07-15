---
title: MacOS에 Stable Diffusion WEB UI 설치하기
description: Stable Diffusion을 코드 단에서 사용할 수도 있지만, 일반 사용자도 쉽게 사용할 수 있도록, WEB UI 형태로 설치하여 사용할 수 있습니다. 이 글에서는 WEB UI를 설치하는 방법에 대해 소개합니다.
date: 2024-02-22 22:14:13 +0900
last_modified_at: 2024-02-22 22:14:13 +0900
categories: [ AI, Stable Diffusion ]
tags: [ ai, sb, stable diffusion, 인공지능, 이미지 생성, automatic1111, stable diffusion web ui ]
pin: false
math: false
mermaid: false
image:
  path: /assets/img/posts/ai/stable-diffusion/2024-02-22-install-stable-diffusion/ex3.webp
  alt: MacOS에 Stable Diffusion WEB UI 설치하기
---

## 1. 시스템 요구 사항

AUTOMATIC1111을 설치하기 전에, 가지고 있는 머신이 아래 권장 사항을 충족하는지 확인이 필요합니다. (반드시는 아니지만 권장)

- macOS 10.15 이상
- 최소 8GB 이상의 RAM (16GB 권장)
- Python 3.8 이상
- GPU가 있는 경우, NVIDIA GPU (CUDA 지원)

## 2. AUTOMATIC1111 설치

stable diffusion web ui는 [해당 github 저장소](https://github.com/AUTOMATIC1111/stable-diffusion-webui)에서 git clone 하여 다운로드 받을 수 있습니다. 

### 2.1. 프로젝트 다운로드

아래 명령어를 사용하여 다운로드를 진행합니다. 설치 이후 stable-diffusion-webui 디렉토리가 생성됩니다. change directory하여 해당 디렉토리로 들어갑니다.

```shell
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui
```

### 2.2. 안정적인 버전으로 checkout

master 브랜치에서 실행해도 되지만 안정성이 떨어질 수 있으므로, 해당 글에서는 `v1.10.0-RC` 버전으로 checkout 하여 초기 환경을 구성하도록 하겠습니다.

```shell
git checkout v1.10.0-RC
```

![버전 선택](/assets/img/posts/ai/stable-diffusion/2024-02-22-install-stable-diffusion/ex1.webp)
_버전 선택_

그리고 git status를 통해 제대로 checkout이 됐는지 확인합니다.

```shell
$ git status
HEAD detached at v1.10.0-RC
nothing to commit, working tree clean
```

### 2.3. 의존성 설치

pip install -r requirements.txt로 의존성을 설치할 수도 있지만, `webui.sh` 스크립트를 바로 실행하면, 알아서 의존성과 실행 환경이 구축됩니다.
따라서, 아래 명령어를 수행합니다.

```shell
./webui.sh
```

의존성을 설치하는데 약간의 시간이 소요될 수 있습니다. (저의 경우는 대략 10분 정도 걸린거 같습니다)

> 처음 실행할때는 필요한 의존성 라이브러리르 설치하고 환경을 셋팅하느라 오래 걸릴 수 있습니다. 이후부터 ./webui.sh 명령어를 사용하면, 바로 web ui가 실행됩니다.
{: .prompt-tip }

## 3. Stable Diffusion WEB UI 실행

설치까지 완료되면 실행도 되는데, 기본 실행 포트(`port`) 번호는 `7860`입니다. 따라서 브라우저를 열어서 주소창에 [http://127.0.0.1:7860](http://127.0.0.1:7860)으로 접속하면 됩니다. 

아래와 같이 실행이 되면 정상적으로 설치된겁니다.

![WEB UI 실행](/assets/img/posts/ai/stable-diffusion/2024-02-22-install-stable-diffusion/ex2.webp)
_WEB UI 실행_

### 3.1. 이미지 생성

이후 원하는 model을 적용할 수 있지만 우선 정상 동작을 위해, 고양이 한마리를 그려보겠습니다. `positive prompt`에 아래와 같이 입력합니다.

```text
masterpiece, best quality, cat
```
{: file='positive prompt'}

![첫번째 이미지 생성](/assets/img/posts/ai/stable-diffusion/2024-02-22-install-stable-diffusion/ex3.webp)
_첫번째 이미지 생성_

예쁜 고양이 이미지는 아니지만, 이미지를 생성되는 것을 확인했습니다.

> prompt를 효율적으로 작성하는 방법에 대해 궁금하시면 [이 글](/posts/stable-diffusion-prompt/)을 참고해주세요.
{: .prompt-info }
