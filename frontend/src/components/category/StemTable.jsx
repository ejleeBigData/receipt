import Button from "../common/ui/Button";

const StemsTable = ({
  stems = [],
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="py-6 text-center text-gray-400">불러오는 중…</div>;
  }
  if (error) {
    return (
      <div className="py-6 text-center text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <section className="overflow-x-auto" aria-label="카테고리 목록">
      <table className="w-full text-center text-sm text-gray-600">
        <thead>
          <tr className="border-b">
            <th className="py-2">카테고리</th>
            <th className="py-2">순서</th>
            <th className="py-2">누적 합계 보이기</th>
            <th className="py-2">상한금액 표시</th>
            <th className="py-2">수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {stems.length === 0 ? (
            <tr>
              <td className="py-6 text-gray-400" colSpan={5}>
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            stems.map((stem) => (
              <tr
                key={stem.id ?? `${stem.name}-${stem.sortOrder}`}
                className="odd:bg-gray-50 even:bg-white last:border-0 hover:bg-yellow-100 transition-colors"
              >
                <td className="py-2">{stem.name}</td>
                <td className="py-2">{stem.sort_order}</td>
                <td className="py-2">{stem.showed ? "예" : "아니오"}</td>
                <td className="py-2">
                  {typeof stem.cut_price === "number"
                    ? stem.cut_price.toLocaleString()
                    : "-"}
                </td>
                <td className="py-2">
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={() => onEdit?.(stem)}>
                      수정
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => stem.id && onDelete?.(stem.id)}
                      disabled={!stem.id}
                      title={!stem.id ? "ID 없음" : undefined}
                    >
                      삭제
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default StemsTable;
