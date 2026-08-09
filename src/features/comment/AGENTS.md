# comment 규칙

- 댓글은 giscus와 GitHub Discussions를 사용한다.
- 번역 글은 locale이 달라도 같은 `article.id`를 discussion key로 사용한다.
- 저장소 ID와 category ID는 공개 설정이다. token과 secret은 두지 않는다.
- iframe은 지연 로드하고 Pagefind 색인에서 제외한다.
- site theme 변경 시 giscus theme도 즉시 맞춘다.
- 댓글 실패가 article 본문과 탐색을 막으면 안 된다.
- 댓글 UI는 article 상세에서만 사용한다.
