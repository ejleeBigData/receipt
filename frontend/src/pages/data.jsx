import { useState, useEffect, useMemo } from "react";
import useAuthStore from "../store/authStore";
import useCategoryStore from "../store/categoryStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LineItemHeader from "../components/data/LineItemHeader";
import LineItemRow from "../components/data/LineItemRow";

const Data = () => {
  const today = new Date().toISOString().split("T")[0];
  const categoriesListId = "categories-datalist";

  // 상단 기본 폼
  const [form, setForm] = useState({
    payed_at: today,
    name: "",
    memo: "",
  });

  // 하단 행 배열
  const [rows, setRows] = useState([
    { category: "", categoryId: null, item: "", price: "", quantity: 1 },
  ]);

  const { user } = useAuthStore();
  const { categories, error, listMyCategories } = useCategoryStore();

  useEffect(() => {
    if (user?.id) listMyCategories(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // 카테고리 이름 목록 (중복 제거 + 정렬)
  const categoryNames = useMemo(() => {
    const names = new Set(
      (categories || []).map((c) => c?.name?.trim()).filter(Boolean)
    );
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [categories]);

  // 이름→id 매핑
  const nameToId = useMemo(() => {
    const m = new Map();
    (categories || []).forEach((c) => {
      const key = c?.name?.trim();
      if (key) m.set(key, c.id);
    });
    return m;
  }, [categories]);

  // 상단 기본 폼 핸들러
  const handleChangeTop = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 행 변경 핸들러
  const handleRowChange = (idx, e) => {
    const { name, value, type } = e.target;
    setRows((prev) => {
      const next = [...prev];
      const row = { ...next[idx] };

      if (name === "price" || name === "quantity") {
        row[name] = value === "" ? "" : Number(value);
      } else if (name === "category") {
        row.category = value;
        const trimmed = value.trim();
        row.categoryId = nameToId.get(trimmed) ?? null;
      } else {
        row[name] = value;
      }

      next[idx] = row;
      return next;
    });
  };

  // 카테고리 blur 시 id 보정
  const handleCategoryBlur = (idx, e) => {
    const v = e.target.value.trim();
    setRows((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], categoryId: nameToId.get(v) ?? null };
      return next;
    });
  };

  // 행 완성 여부
  const isRowComplete = (r) =>
    r.category?.trim() &&
    r.item?.trim() &&
    (Number(r.price) || 0) > 0 &&
    (Number(r.quantity) || 0) > 0;

  // 마지막 행이 완성되면 자동으로 새 행 추가
  useEffect(() => {
    const last = rows[rows.length - 1];
    if (isRowComplete(last)) {
      setRows((prev) => [
        ...prev,
        { category: "", categoryId: null, item: "", price: "", quantity: 1 },
      ]);
    }
  }, [rows]); // rows가 바뀔 때마다 체크

  // 한 행 삭제(옵션)
  const removeRow = (idx) => {
    setRows((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== idx)
    );
  };

  const subtotal = (r) => (Number(r.price) || 0) * (Number(r.quantity) || 0);
  const grandTotal = rows.reduce((acc, r) => acc + subtotal(r), 0);

  const handleReset = () => {
    setForm({ payed_at: today, name: "", memo: "" });
    setRows([
      { category: "", categoryId: null, item: "", price: "", quantity: 1 },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 전송용 payload (SpringBoot에 맞게 필드명만 조정하면 됨)
    const items = rows
      .filter(isRowComplete) // 빈 마지막 줄 제외
      .map((r) => ({
        categoryId: r.categoryId,
        categoryName: r.category?.trim(),
        item: r.item?.trim(),
        price: Number(r.price) || 0,
        quantity: Number(r.quantity) || 0,
        subtotal: subtotal(r),
      }));

    const payload = {
      payedAt: form.payed_at,
      storeName: form.name,
      memo: form.memo,
      items,
      total: items.reduce((a, b) => a + b.subtotal, 0),
    };

    // TODO: 실제 저장 API 호출
    alert(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="m-5 p-8 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <h1 className="text-2xl mb-6 flex items-baseline gap-10">
        <span>💦데이터랑</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="m-1 p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
      >
        <div className="mb-3 border-b border-sky-200 pb-2 flex items-center gap-3">
          <h6 className="text-sky-600">신규 등록</h6>
          <span className="text-xs text-gray-500">
            <span className="text-red-500">*</span> 필수 입력
          </span>
          {error && (
            <span className="text-xs text-red-500">
              카테고리 로드 오류: {String(error)}
            </span>
          )}
        </div>

        {/* 1줄: 구매일 + 상점명 */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-[14rem_minmax(0,1fr)] gap-3 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="payed_at" className="text-gray-700 shrink-0">
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>{" "}
                구매일
              </label>
              <div className="w-[10.5rem]">
                <Input
                  id="payed_at"
                  name="payed_at"
                  type="date"
                  value={form.payed_at}
                  onChange={handleChangeTop}
                  variant="data"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="name" className="text-gray-700 shrink-0">
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>{" "}
                상점명
              </label>
              <div className="flex-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChangeTop}
                  placeholder="(예: 상점명_지점)"
                  variant="data"
                  required
                />
              </div>
            </div>
          </div>

          <LineItemHeader />

          {rows.map((row, idx) => (
            <LineItemRow
              key={idx}
              idx={idx}
              row={row}
              onChange={handleRowChange}
              onCategoryBlur={handleCategoryBlur}
              onRemove={removeRow}
              datalistId={categoriesListId}
              subtotal={subtotal}
              canRemove={rows.length > 1 && idx < rows.length - 1}
            />
          ))}

          {/* 공용 datalist (브라우저가 입력값에 맞춰 필터링) */}
          <datalist id={categoriesListId}>
            {categoryNames.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>

          {/* 총합 */}
          <div className="flex justify-end items-center pt-2 border-t border-gray-400">
            <div className="text-sm text-gray-600 mr-2">총합</div>
            <div className="font-semibold tabular-nums">
              {grandTotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 메모 */}
        <div className="flex items-center gap-2 mt-3">
          <label htmlFor="memo" className="text-gray-700 shrink-0">
            메모
          </label>
          <div className="flex-1">
            <Input
              id="memo"
              name="memo"
              type="text"
              value={form.memo}
              onChange={handleChangeTop}
              variant="data"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6 mb-3 flex justify-center gap-3">
          <Button
            type="submit"
            variant="base"
            block={false}
            className="min-w-28"
          >
            저장
          </Button>
          <Button
            type="button"
            variant="basecancel"
            block={false}
            className="min-w-28"
            onClick={handleReset}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Data;
