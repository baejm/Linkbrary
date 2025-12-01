
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000]([http://localhost:3000](https://linkbrary-gilt.vercel.app/)) with your browser to see the result.
Frontend

Next.js 14(App Router) / React 18

React Query(TanStack Query) – 서버 상태 관리, Optimistic Update

TypeScript – 타입 안전성 확보

React Hooks: useState, useEffect, useRef, useSearchParams, useRouter

Dynamic Routing, Client Components, Suspense Boundary 적용

React Query 글로벌 캐싱 & 쿼리 무효화(invalidateQueries)

Optimistic UI 업데이트(즐겨찾기 토글)

Custom Hooks(useLinks, useFolders, useDebounce)

Pagination 구현 (클라이언트 사이드 페이지네이션)

Debounce 검색 기능 구현

Error & Loading 상태 관리

UI 구성요소 모듈화(LinkCard, FolderHeader, Pagination 등)

API & Auth

JWT 기반 인증 처리

Access Token 만료 시 강제 로그아웃 처리

fetch wrapper 함수(fetchApi) 커스터마이징

REST API 기반 CRUD 구현 (폴더, 링크, 즐겨찾기)

Favorite API 연동 & PUT 메서드 적용

UI / UX

Skeleton Loading UI

Empty State 화면 구성

모달 UI(폴더 수정/삭제/추가)

Optimistic Update로 즉시 반응하는 UX 구성

이미지 썸네일 처리 + Next/Image 최적화

State & Business Logic

React Query Mutations

Folder/Links 상태 관리 분리

리스트 필터링 및 검색

클라이언트 사이드 파라미터 기반 UI 동기화

기타 기술

Vercel 배포

Git / GitHub 협업

ESLint / Prettier 설정

파일 구조 설계(feature-based structure)

TypeScript Domain Type 정의(LinkItem, Response 타입 등)



1. React Query를 이용한 서버 상태 관리
useQuery / useMutation 활용
Links와 Favorites의 캐싱을 분리하여 각 페이지 성능 최적화
성공 시 invalidateQueries로 전체 데이터 싱크 유지

2. Optimistic Update로 즉각적인 UI 반영
즐겨찾기 토글 시 서버 응답 전에도 UI가 즉시 반응

3. Custom Hook으로 관심사 분리
useLinks(folderId)
useFolders()
useDebounce(value)

URL SearchParams를 통한 상태 동기화
폴더 선택, router.push(/links?folder=${id}) ,새로고침해도 상태 유지

5. Suspense Boundary로 CSR 관련 에러 해결
useSearchParams 사용 시 발생하는 CSR bail-out 문제 해결



