# tag 규칙

- article과 note가 공유하는 tag key와 공개 label을 관리한다.
- tag key는 소문자 ASCII kebab-case다.
- 화면에는 `tagRegistry.ts`의 공식 label만 표시한다.
- metadata 검증은 `tagSchema.ts`를 재사용한다.
- 같은 의미의 alias를 만들지 않는다.
- 새 tag는 registry와 test를 함께 갱신한다.
- article의 category·topic과 중복되는 tag는 metadata 검증에서 거부한다.
