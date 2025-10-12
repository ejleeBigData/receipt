import { useState, useEffect, useMemo } from "react";
import useAuthStore from "../store/authStore";
import useCategoryStore from "../store/categoryStore";
import useStoreStore from "../store/storeStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import LineItemHeader from "../components/data/LineItemHeader";
import LineItemRow from "../components/data/LineItemRow";

const newRow = () => ({
  id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
  category: "",
  categoryId: null,
  item: "",
  price: "",
  quantity: 1,
});

const Data = () => {
  const categoriesListId = "categories-datalist";
  const today = new Date().toISOString().split("T")[0];

  const { user } = useAuthStore();
  const { categories, error, listMyCategories } = useCategoryStore();
  const { createStore: createStoreAction } = useStoreStore();

  const [form, setForm] = useState({
    purchase_date: today,
    name: "",
    memo: "",
  });
  const [rows, setRows] = useState([newRow()]);

  useEffect(() => {
    if (user?.id) listMyCategories(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // 카테고리 이름→id 매핑
  const nameToId = useMemo(() => {
    const m = new Map();
    (categories || []).forEach((c) => {
      const key = c?.name?.trim();
      if (key) m.set(key, c.id);
    });
    return m;
  }, [categories]);

  // 카테고리 이름 목록 (중복 제거 + 정렬)
  const categoryNames = useMemo(() => {
    const names = new Set(
      (categories || []).map((c) => c?.name?.trim()).filter(Boolean)
    );
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [categories]);

  // 상단 기본 폼 핸들러
  const handleChangeTop = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 행 완성 여부
  const isRowComplete = (r) =>
    r.category?.trim() &&
    r.item?.trim() &&
    (Number(r.price) || 0) > 0 &&
    (Number(r.quantity) || 0) > 0;

  // 행 변경 핸들러
  const handleRowChange = (id, e) => {
    const { name, value, type } = e.target;
    setRows((prev) => {
      return prev.map((row) => {
        if (row.id !== id) return row;
        const changed = { ...row };
        if (name === "price" || name === "quantity") {
          changed[name] = value === "" ? "" : Number(value);
        } else if (name === "category") {
          changed.category = value;
          const trimmed = value.trim();
          changed.categoryId = nameToId.get(trimmed) ?? null;
        } else {
          changed[name] = value;
        }
        return changed;
      });
    });
  };

  // 카테고리 blur 시 id 보정
  const handleCategoryBlur = (id, e) => {
    const v = e.target.value.trim();
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, categoryId: nameToId.get(v) ?? null } : r
      )
    );
  };

  // 행 삭제
  const removeRow = (id) => {
    setRows((prev) =>
      prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)
    );
  };

  // 마지막 행이 완성되면 자동 추가
  useEffect(() => {
    const last = rows[rows.length - 1];
    if (isRowComplete(last)) setRows((prev) => [...prev, newRow()]);
  }, [rows, isRowComplete]);

  const subtotal = (r) => (Number(r.price) || 0) * (Number(r.quantity) || 0);
  const grandTotal = rows.reduce((acc, r) => acc + subtotal(r), 0);

  const handleReset = () => {
    setForm({ purchase_date: today, name: "", memo: "" });
    setRows([newRow()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성: 카테고리 미매칭 행 차단
    const invalid = rows.some(
      (r) =>
        r.item?.trim() &&
        (Number(r.price) || 0) > 0 &&
        (Number(r.quantity) || 0) > 0 &&
        !r.categoryId
    );
    if (invalid) {
      alert(
        "카테고리 이름이 목록과 매칭되지 않은 행이 있습니다. 목록에서 선택하거나 정확히 입력하세요."
      );
      return;
    }

    const items = rows
      .filter(isRowComplete) // 빈 마지막 줄 제외
      .map((r) => ({
        categoryId: r.categoryId,
        item: r.item?.trim(),
        price: Number(r.price) || 0,
        quantity: Number(r.quantity) || 0,
        //subtotal: subtotal(r),
      }));

    const payload = {
      purchaseDate: form.purchase_date,
      name: form.name?.trim(),
      memo: form.memo ?? "",
      items,
      //total: items.reduce((a, b) => a + b.subtotal, 0),
    };

    //console.log(JSON.stringify(payload, null, 2));
    try {
      await createStoreAction(payload);
      handleReset(); //성공 후 초기화
    } catch (err) {
      console.error("Error creating store:", err);
    }
  };

  return (
    <div className="mx-5 mb-5 p-3 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
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

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-[14rem_minmax(0,1fr)] gap-3 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="purchase_date" className="text-gray-700 shrink-0">
                <span className="text-red-500" aria-hidden="true">
                  *
                </span>{" "}
                구매일
              </label>
              <div className="w-[7rem]">
                <Input
                  id="purchase_date"
                  name="purchase_date"
                  type="date"
                  value={form.purchase_date}
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
          <div className="rounded-xs borde bg-gray-100 p-2">
            <LineItemHeader />
            <div>
              {rows.map((row, idx) => (
                <div key={row.id} className="py-1">
                  <LineItemRow
                    key={row.id}
                    idx={idx}
                    row={row}
                    onChange={(e) => handleRowChange(row.id, e)}
                    onCategoryBlur={(e) => handleCategoryBlur(row.id, e)}
                    onRemove={() => removeRow(row.id)}
                    datalistId={categoriesListId}
                    subtotal={subtotal}
                    canRemove={idx > 0}
                  />
                </div>
              ))}
            </div>
            {/* 총합 */}
            <div className="flex justify-end items-center">
              <div className="text-sm text-gray-600 mr-2">총합</div>
              <div className="font-semibold tabular-nums text-gray-600">
                {grandTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <datalist id={categoriesListId}>
          {categoryNames.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>

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

        <div className="mt-3 flex justify-center gap-3">
          <Button
            type="submit"
            variant="base"
            block={false}
            className="min-w-[5rem]"
          >
            저장
          </Button>
          <Button
            type="button"
            variant="basecancel"
            block={false}
            className="min-w-[5rem]"
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
