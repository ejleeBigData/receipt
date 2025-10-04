import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useCategoryStore from "../../store/categoryStore";
import Button from "../ui/Button";

const CategoryList = () => {
  const { user } = useAuthStore();
  const { categories, loading, error, getUserCategories } = useCategoryStore();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // Spring Page.last 기반으로 갱신,일단 사용안함

  useEffect(() => {
    if (!user.id) return;
    (async () => {
      const page0 = await getUserCategories(user.id, 0, 50);
      setPage(0);
      setHasMore(!page0?.last);
    })();
  }, [user.id, getUserCategories]);

  const loadMore = async () => {
    if (!user.id || !hasMore) return;
    const next = page + 1;
    const data = await getUserCategories(user.id, next, 50);
    setPage(next);
    setHasMore(!data?.last);
  };

  if (!user.id) {
    return (
      <div className="py-6 text-center text-gray-400">
        사용자 정보를 불러올 수 없습니다.
      </div>
    );
  }

  if (error) {
    return <div className="py-6 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="overflow-x-auto" aria-label="카테고리 목록">
      <table className="w-full text-center text-sm text-gray-600">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2">명칭</th>
            <th className="py-2">순서</th>
            <th className="py-2">누적 표시</th>
            <th className="py-2">상한선</th>
            <th className="py-2 w-[14ch]">수정/삭제</th>
          </tr>
        </thead>

        <tbody>
          {loading && categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-gray-400">
                불러오는 중…
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-gray-400">
                등록된 카테고리가 없습니다.
              </td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr
                key={c.id}
                className="odd:bg-white even:bg-gray-50 last:border-0 hover:bg-lime-100 transition-colors"
              >
                <td className="py-2">{c.name}</td>
                <td className="py-2">{c.sort ?? "-"}</td>
                <td className="py-2">{c.accrue ? "표시" : "숨김"}</td>
                <td className="py-2">
                  {c.cut != null ? Number(c.cut).toLocaleString() : "-"}
                </td>
                <td className="flex items-center gap-2 justify-center py-1">
                  <Button type="button" variant="base" size="sm" blcok={false}>
                    수정
                  </Button>
                  <Button type="button" variant="base" size="sm" block={false}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/*
      <div className="flex justify-center py-4">
        <Button
          type="button"
          variant="base"
          size="sm"
          onClick={loadMore}
          disabled={loading || !hasMore}
        >
          {loading ? "불러오는 중…" : hasMore ? "더 불러오기" : "더 이상 없음"}
        </Button>
      </div>
      */}
    </section>
  );
};

export default CategoryList;
