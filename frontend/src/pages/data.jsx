import { useState, useEffect, useMemo } from "react";
import useAuthStore from "../store/authStore";
import useCategoryStore from "../store/categoryStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Data = () => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    payed_at: today,
    name: "",
    memo: "",
    category: "", // 표시용 이름
    categoryId: null,
    item: "",
    price: "",
    quantity: 1,
  });

  const { user } = useAuthStore();
  const { categories, error, listMyCategories } = useCategoryStore();

  useEffect(() => {
    if (user?.id) listMyCategories(user.id);
  }, [user?.id]);

  // 이름->id 매핑
  const nameToId = useMemo(() => {
    const m = new Map();
    (categories || []).forEach((c) => {
      const key = c?.name?.trim();
      if (key) m.set(key, c.id);
    });
    return m;
  }, [categories]);

  // datalist 표시용: 입력값으로 필터링(부분일치, 대소문자 무시)
  const filteredCategoryNames = useMemo(() => {
    const q = form.category.trim().toLowerCase();
    const names = (categories || [])
      .map((c) => c?.name?.trim())
      .filter(Boolean);
    if (!q)
      return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
    return Array.from(new Set(names))
      .filter((n) => n.toLowerCase().includes(q))
      .sort((a, b) => a.localeCompare(b));
  }, [categories, form.category]);

  const subtotal = (Number(form.price) || 0) * (Number(form.quantity) || 0);

  // ✅ 변경 핸들러: 숫자 캐스팅 + 카테고리 이름→id 동기화
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      if (type === "checkbox") return { ...prev, [name]: checked };
      if (name === "price")
        return { ...prev, price: value === "" ? "" : Number(value) };
      if (name === "quantity")
        return { ...prev, quantity: value === "" ? "" : Number(value) };
      if (name === "category") {
        const trimmed = value.trim();
        const id = nameToId.get(trimmed) ?? null;
        return { ...prev, category: value, categoryId: id };
      }
      return { ...prev, [name]: value };
    });
  };

  // 카테고리 필드에서 포커스 아웃 시에도 동기화(타이핑만 하고 엔터 안친 경우)
  const handleCategoryBlur = (e) => {
    const v = e.target.value.trim();
    setForm((prev) => ({ ...prev, categoryId: nameToId.get(v) ?? null }));
  };

  const handleReset = () => {
    setForm({
      payed_at: today,
      name: "",
      memo: "",
      category: "",
      categoryId: null,
      item: "",
      price: "",
      quantity: 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ 전송 페이로드 예시 (SpringBoot API에 맞게 키만 맞추면 됨)
    const payload = {
      payedAt: form.payed_at,
      storeName: form.name,
      memo: form.memo,
      categoryId: form.categoryId, // ← 핵심: id 전송
      item: form.item,
      price: Number(form.price) || 0,
      quantity: Number(form.quantity) || 0,
      subtotal,
    };
    // TODO: 실제 저장 로직으로 교체
    alert(JSON.stringify(payload, null, 2));
  };

  const categoriesListId = "categories-datalist";

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

        <div className="space-y-3">
          {/* 1줄: 구매일 + 상점명 */}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="(예: 상점명_지점)"
                  variant="data"
                  required
                />
              </div>
            </div>
          </div>

          {/* 헤더 (md 이상) */}
          <div className="hidden md:grid md:grid-cols-[3fr_3fr_2fr_1fr_2fr] gap-2 px-1 text-sm text-gray-600 font-semibold">
            <div>카테고리</div>
            <div>내용</div>
            <div>가격</div>
            <div>수량</div>
            <div>부분합</div>
          </div>

          {/* 인풋 행 */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_2fr_1fr_2fr] gap-2 items-center">
            <div>
              <label
                htmlFor="category"
                className="md:hidden text-xs text-gray-500 mb-1"
              >
                카테고리
              </label>
              <Input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                onBlur={handleCategoryBlur}
                variant="data"
                placeholder="카테고리 선택"
                required
                list={categoriesListId} // datalist 연결
                onFocus={() => {
                  if (!categories?.length && user?.id)
                    listMyCategories(user.id);
                }}
              />
              <datalist id={categoriesListId}>
                {filteredCategoryNames.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            {/* 내용 */}
            <div>
              <label
                htmlFor="item"
                className="md:hidden text-xs text-gray-500 mb-1"
              >
                내용
              </label>
              <Input
                id="item"
                name="item"
                type="text"
                value={form.item}
                onChange={handleChange}
                variant="data"
                placeholder="예: 한돈 안심 600g"
              />
            </div>

            {/* 가격 */}
            <div>
              <label
                htmlFor="price"
                className="md:hidden text-xs text-gray-500 mb-1"
              >
                가격
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                variant="data"
                inputMode="numeric"
                min="0"
                placeholder="예: 21000"
              />
            </div>

            {/* 수량 */}
            <div>
              <label
                htmlFor="quantity"
                className="md:hidden text-xs text-gray-500 mb-1"
              >
                수량
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                variant="data"
                inputMode="numeric"
                min="0"
                placeholder="1"
              />
            </div>

            {/* 부분합 */}
            <div className="text-right md:text-left font-medium tabular-nums px-2">
              <span id="subtotal" className="text-gray-800 text-sm text-center">
                {subtotal.toLocaleString()}
              </span>
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
              onChange={handleChange}
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
