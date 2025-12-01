
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

Open [http://localhost:3000]((https://linkbrary-gilt.vercel.app/)) with your browser to see the result.
Frontend

*Next.js 14(App Router) / React 18
JWT 기반 인증 및 토큰 만료 처리
React Query 기반 서버 상태 관리 및 캐싱
Custom Hooks (useLinks, useFolders, useDebounce)
즐겨찾기 Optimistic Update
폴더/링크 CRUD 기능
Pagination & Debounce 검색 기능
Skeleton UI / Empty State 처리
URL SearchParams 기반 상태 동기화
모달 컴포넌트 기반 폴더 관리 기능

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

4. URL SearchParams를 통한 상태 동기화
폴더 선택, router.push(/links?folder=${id}) ,새로고침해도 상태 유지

5. Suspense Boundary로 CSR 관련 에러 해결
useSearchParams 사용 시 발생하는 CSR bail-out 문제 해결



