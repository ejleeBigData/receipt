import { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import useCategoryStore from "../../store/categoryStore";
import Button from "../ui/Button";

const CategoryList = () => {
  const { user } = useAuthStore();
  const {
    categories,
    loading,
    error,
    listMyCategories,
    startEdit,
    deleteCategory,
  } = useCategoryStore();

  useEffect(() => {
    if (user?.id) void listMyCategories();
  }, [user?.id, listMyCategories]);

  if (!user?.id) {
    return (
      <div className="py-6 text-center text-gray-400">
        사용자 정보를 불러올 수 없습니다.
      </div>
    );
  }

  if (error) {
    return <div className="py-6 text-center text-red-500">{error}</div>;
  }

  const handleDelete = async (id, name) => {
    const ok = window.confirm(`'${name}' 카테고리를 삭제할까요?`);
    if (!ok) return;
    try {
      await deleteCategory(id);
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  useEffect(() => {
    //console.log("카테고리", categories);
  }, [categories]);

  return (
    <section className="overflow-x-auto" aria-label="카테고리 목록">
      <table className="w-full text-center text-sm text-gray-600">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2">명칭</th>
            <th className="py-2">순서</th>
            <th className="py-2">누적 표시</th>
            <th className="py-2">상한선</th>
            <th className="py-2 w-[12ch]">수정/삭제</th>
          </tr>
        </thead>

        <tbody>
          {loading && categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-gray-400">
                불러오는 중…
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-gray-400">
                등록된 카테고리가 없습니다.
              </td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr
                key={c.id}
                className="odd:bg-white even:bg-gray-50 last:border-0 hover:bg-lime-100 transition-colors"
              >
                <td>{c.name}</td>
                <td>{c.sort ?? "-"}</td>
                <td>{c.accrue ? "표시" : "-"}</td>
                <td>{c.cut != null ? Number(c.cut).toLocaleString() : "-"}</td>
                <td className="flex items-center gap-1 justify-center py-1">
                  <Button
                    type="button"
                    variant="base"
                    size="sm"
                    onClick={() => startEdit(c.id)}
                  >
                    수정
                  </Button>
                  <Button
                    type="button"
                    variant="base"
                    size="sm"
                    onClick={() => handleDelete(c.id, c.name)}
                    disabled={loading}
                    aria-label={`${c.name} 삭제`}
                  >
                    삭제
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryList;
