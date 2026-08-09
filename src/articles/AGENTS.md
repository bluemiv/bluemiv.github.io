# article 규칙

## 경로와 용어

- 경로: `src/articles/{slug}/{locale}.mdx`.
- 긴 글 용어는 `article`만 사용한다. `post`, `content` 금지.
- slug는 발행 후 바꾸지 않는 소문자 ASCII kebab-case다.

## metadata

- metadata는 루트 `AGENTS.md` 스키마를 따른다.
- `author`를 생략하면 SSG build에서 `SITE_CONFIG.author`가 적용된다.
- 1차 분류는 단일 `category`, 2차 세부 주제 분류는 `topics` 배열, 보조 검색어는 `tags`다.
- `category`와 `topics`는 `features/article/articleTaxonomy.ts`에 정의된 조합만 사용한다.
- `topics`는 한 개 이상이며 중복 값을 넣지 않는다.
- `topics[0]`에는 목록과 상세 화면에 먼저 표시할 대표 topic을 둔다.
- 교차 분야 검색어는 다른 category의 topic 대신 `tags`에 둔다.
- tag는 `features/tag/tagRegistry.ts`에 등록된 key만 사용한다.
- tag key는 소문자 ASCII kebab-case다. 공식 대소문자 표기를 metadata에 직접 쓰지 않는다.
- article의 category·topic과 중복되는 tag를 넣지 않는다.
- title은 검색어를 나열하지 말고 article의 질문이나 결과를 구체적으로 표현한다.
- description은 문제와 독자가 얻을 내용을 1–2문장으로 요약한다.

## 문체

- 한국어 article 본문은 차분하고 담백한 해요체를 기본으로 한다.
- 한 article 안에서 해요체와 합니다체를 섞지 않는다. 인용문, UI 문구, code와 출력은 예외다.
- `~해요`, `~돼요`, `~있어요`, `~할 수 있어요`를 문맥에 맞게 사용하고 같은 어미를 연속해서 반복하지 않는다.
- `알아볼게요`, `해볼까요?`, `정말`, `엄청`, 이모티콘처럼 진행자 말투나 과한 친근함을 쓰지 않는다.
- `것 같아요`, `아마`, `뭔가` 같은 모호한 표현은 근거나 불확실성 설명 없이 쓰지 않는다.
- 확인한 사실, 직접 겪은 경험, 작성자의 판단을 구분한다. 판단에는 선택 이유와 trade-off를 함께 적는다.
- 기존 이관 article은 별도 요청 없이 문체 통일만을 위해 대규모 수정하지 않는다.
- 영어와 일본어 article은 해요체를 직역하지 않고 해당 언어의 차분한 editorial 문체를 사용한다.

## 본문 구성

- 도입부에서 문제, 배경, article에서 다룰 범위를 짧게 밝힌다.
- 한 문단에는 하나의 핵심만 담고 불필요하게 같은 결론을 반복하지 않는다.
- heading은 명사형 또는 짧은 질문형으로 쓰고 문장형 설명을 길게 넣지 않는다.
- 본문 heading은 `##`부터 시작한다.
- 신규 heading에 `1.`, `1.1.` 같은 번호를 직접 쓰지 않는다. 화면에서 자동 생성한다.
- 이관 article의 기존 heading 번호는 과거 anchor 호환을 위해 유지할 수 있다.
- 절차는 실행 순서대로 작성하고, 선택지가 있으면 기준과 차이를 먼저 설명한다.
- 결론은 본문을 다시 나열하지 말고 실제 선택, 한계, 다음 판단을 짧게 정리한다.

## code와 link

- code fence에 언어를 지정한다.
- code fence는 상세 화면에서 language label과 코드 복사 action이 자동 적용된다. 본문에 별도 복사 UI를 넣지 않는다.
- code block 앞에는 목적, 뒤에는 핵심 줄과 결과를 설명한다. code를 문장으로 그대로 반복하지 않는다.
- 실행되지 않는 축약 code에는 생략 부분을 명확히 표시하고 완성 code처럼 설명하지 않는다.
- route·layout·navigation용 JSX를 MDX에 넣지 않는다.
- 내부 article link는 canonical route와 trailing slash를 사용한다.
- link 문구는 목적을 설명한다. `여기`, `링크`, `참고`만 단독으로 쓰지 않는다.

## 이미지

- cover 이미지는 `32:17` 비율을 지킨다. 권장 크기는 `1600×850px` WebP다.
- cover의 핵심 요소는 잘림과 반응형 축소를 고려해 가장자리에서 충분히 띄운다.
- cover는 overlay 공간을 만들기 위해 일부 영역을 인위적으로 비우거나 구도를 왜곡하지 않는다.
- cover 자체만으로 완성된 구성을 만들고 title 가독성은 화면의 dim, mask, text 처리로 해결한다.
- 본문 이미지는 주변 문장에서 목적을 설명하고 같은 내용을 alt에 반복하지 않는다.

## 변경 검증

- 본문 수정 없이 이관할 때 원문 byte 동일성을 검증한다.
- metadata 변경 후 build-time schema와 category/topic/tag 관계 검증을 실행한다.
