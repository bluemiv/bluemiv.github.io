# adsense 규칙

- 공개 publisher와 slot ID만 코드에 둔다. 관리 credential 금지.
- local에서는 실제 광고를 요청하지 않고 placeholder를 표시한다.
- viewport에 보이는 slot만 초기화한다.
- layout shift 방지를 위해 크기를 예약한다.
- 광고 위치와 개수는 `docs/design-system.md`를 따른다.
