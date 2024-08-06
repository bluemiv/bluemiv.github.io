---
title: 웹(WEB)이란?
description: 웹(Web)은 월드 와이드 웹(World Wide Web, WWW)의 줄임말입니다. 인터넷 상에서 문서들이 서로 연결되어 있는 거대한 시스템을 가리킵니다. 본 글에서는 웹의 역사, 기술적 요소, 작동 원리에 대해 설명합니다.
date: 2024-02-29 20:51:13 +0900
last_modified_at: 2024-02-29 20:51:13 +0900
categories: [ WEB ]
tags: [ css, web, javascript, html, 웹, 브라우저, browser ]
pin: false
math: false
mermaid: false
image:
  path: https://github.com/user-attachments/assets/e6ae8968-f24a-4eaa-8176-c8c6a364da8d
  alt: 웹(WEB)이란?
---

## 1. 웹의 역사

웹은 1989년 영국의 컴퓨터 과학자 팀 버너스 리(`Tim Berners-Lee`)가 제안하고 개발했습니다. 팀 버너스 리는 CERN(유럽 입자 물리 연구소)에서 일하면서 연구자들이 서로 정보를 쉽게 공유할 수 있는
시스템을 만들고자 했습니다. 1990년에 처음으로 웹 서버와 웹 브라우저가 개발되었고, 1991년에 처음으로 대중에게 공개되었습니다.

![Tim Berners Lee](https://github.com/user-attachments/assets/2b602438-8a81-4e37-81d0-6b791cf2a2d5)
_Tim Berners Lee_

## 2. 웹의 기술적 요소

웹은 여러 기술적 요소로 구성되어 있으며, 이 요소들에 의해 웹 페이지가 브라우저에 표시됩니다. 기술적 요소는 다음과 같습니다.

- HTML
- CSS
- JavaScript
- Browser

![웹의 기술적 요소](https://github.com/user-attachments/assets/7298532e-911d-442d-872d-18e48a1214f3)
_웹의 기술적 요소_

이제 이 기술적 요소에 대해 살펴보겠습니다.

### 2.1. HTML (HyperText Markup Language)

HTML은 웹 페이지의 구조를 정의하는 마크업 언어입니다. 웹 페이지는 HTML 태그로 구성되며, 이 태그들은 텍스트, 이미지, 링크, 그리고 다른 멀티미디어 요소들을 페이지에 배치하는 역할을 합니다.
쉽게 정리하면 HTML은 웹 페이지의 뼈대라고 할 수 있습니다.

### 2.2. CSS (Cascading Style Sheets)

CSS는 HTML 요소들의 스타일을 지정하는 데 사용됩니다. 즉, 웹 페이지의 시각적 표현을 담당합니다. 
CSS를 통해 텍스트의 글꼴, 색상, 레이아웃 등을 정의하여 웹 페이지를 더 아름답고 사용하기 쉽게 만들어줍니다.

### 2.3. JavaScript

JavaScript는 웹 페이지에 동적 기능을 추가하는 스크립트 언어입니다. 이를 통해 웹 페이지가 사용자와 상호작용할 수 있습니다. 예시를 들면,

- 서버로 부터 비동기로 데이터를 불러오는동안 로딩 표시
- 입력 폼 유효성 검사
- 요소의 애니메이션
- ...

### 2.4. 웹 브라우저

웹 브라우저는 사용자가 웹 페이지를 탐색할 수 있게 하는 소프트웨어입니다.
브라우저는 사용자가 입력한 URL(`Uniform Resource Locator`)을 통해 웹 서버에 요청을 보내고,
HTML, CSS, JavaScript 파일을 받아와 이를 해석하고 화면에 출력합니다.

대표적인 웹 브라우저로는 Google Chrome, Mozila Firefox, Apple Safari 등이 있습니다.

![웹 브라우저](https://github.com/user-attachments/assets/9b8b13b6-5bf4-4729-85e0-b026bf8b0868)
_웹 브라우저_

### 3. 웹의 작동 원리

웹이 작동하는 기본 원리는 client-server 모델 구조입니다. 사용자가 브라우저를 통해 웹 페이지를 요청하면, 브라우저는 HTTP(`Hypertext Transfer Protocol`)나 HTTPS(`HTTP Secure`)
프로토콜을 사용해 서버에 요청을 보냅니다. 서버는 요청을 처리한 후 `HTML`, `CSS`, `JavaScript` 파일을 브라우저에 전송합니다. 브라우저는 이 파일들을 해석하여 사용자에게 웹 페이지를 표시합니다.

용어 정리

- **HTTP/HTTPS**: 웹에서 데이터를 주고받기 위한 프로토콜 (HTTPS는 HTTP보다 보안을 강화한 버전)
- **URL**: 웹 페이지의 주소를 나타내는 문자열
- **웹 서버**: 사용자의 요청을 처리하고, 필요한 리소스를 제공하는 서버
- **DNS**: Domain Name을 IP 주소로 변환해주는 시스템

### 4. 웹의 진화와 현재

웹은 처음에는 정적인 문서들을 링크로 연결하는 방식으로 시작되었지만, 시간이 지나면서 기술의 발전과 함께 크게 변화해왔습니다.

웹 2.0 시대로 넘어가면서 사용자가 생성한 콘텐츠와 소셜 미디어의 등장으로 더욱 양방향으로 상호작용적인 웹이 되었습니다.
현재는 블록체인, 인공지능, 그리고 머신러닝 등의 기술을 활용한 웹 3.0과 분산형 웹의 시대를 맞이하고 있습니다.
