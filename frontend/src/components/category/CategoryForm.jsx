import { useMemo, useState, useEffect } from "react";
import Button from "../ui/Button";
import InputText from "./InputText";
import useCategoryStore from "../../store/categoryStore";

const CategoryForm = () => {
  const orders = useMemo(() => Array.from({ length: 50 }, (_, i) => i + 1), []);
  const {
    categories,
    createCategory,
    updateCategory,
    loading,
    editingId, //수정 타깃
    cancelEdit, //수정 취소
  } = useCategoryStore();

  const [form, setForm] = useState({
    name: "",
    sort: 1,
    accrue: false,
    cut: "",
  });

  useEffect(() => {
    if (editingId) {
      const target = categories.find((c) => c.id === editingId);
      if (target) {
        setForm({
          name: target.name ?? "",
          sort: target.sort ?? 1,
          accrue: !!target.accrue,
          cut: target.cut ?? "",
        });
      }
    } else {
      setForm({ name: "", sort: 1, accrue: false, cut: "" });
    }
  }, [editingId, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDup) return;
    try {
      if (editingId) {
        await updateCategory(editingId, form);
        cancelEdit(); // 완료 후 편집 종료
      } else {
        await createCategory(form);
      }
      setForm({ name: "", sort: 1, accrue: false, cut: "" });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const nameKey = form.name.trim().toLowerCase();
  const isDup = useMemo(() => {
    if (!nameKey) return false;
    return categories.some(
      (c) =>
        c.name?.trim().toLowerCase() === nameKey &&
        (!editingId || c.id !== editingId)
    );
  }, [nameKey, categories, editingId]);

  return (
    <form
      onSubmit={handleSubmit}
      className="m-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun"
    >
      <div className="mb-3 border-b border-sky-200 pb-1 flex items-center gap-3">
        <h6 className="text-sky-600">{editingId ? "수정" : "신규 등록"}</h6>
        <span className="text-xs text-gray-500">
          <span className="text-red-500">*</span> 필수 입력
        </span>
        {"    "}
        {isDup && (
          <p className="text-xs text-red-500 mt-1">
            '{form.name}'은(는) 이미 등록된 명칭입니다.
          </p>
        )}
      </div>

      <div className="overflow-x-auto md:overflow-visible">
        <div className="inline-flex items-center md:gap-4 whitespace-nowrap md:whitespace-normal w-max">
          <div className="flex items-center gap-2">
            <InputText
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              label={
                <>
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>{" "}
                  명칭
                </>
              }
              placeholder="카테고리명"
              inputWidthClass="w-[24ch]"
              required
            />
          </div>
          <div className="flex items-center gap-2 ml-3">
            <label htmlFor="sort" className="text-gray-700 flex-shrink-0">
              순서
            </label>
            <select
              id="sort"
              name="sort"
              value={form.sort}
              onChange={handleChange}
              className="border border-gray-400 rounded px-2 py-1 text-sm focus:border-sky-400 focus:outline-none"
            >
              {orders.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 ml-5">
            <label
              htmlFor="accrue"
              className="min-w-18 text-gray-700 flex-shrink-0"
            >
              누적 표시
            </label>
            <input
              id="accrue"
              name="accrue"
              type="checkbox"
              checked={form.accrue}
              onChange={handleChange}
              className="scale-110"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <InputText
              id="cut"
              name="cut"
              label={<>상한선</>}
              type="number"
              value={form.cut}
              onChange={handleChange}
              placeholder="9999999"
              inputWidthClass="w-[12ch]"
              min="0"
            />
          </div>
          <div className="min-w-20 flex items-center gap-1">
            <Button
              type="submit"
              variant="base"
              size="sm"
              disabled={loading || isDup || !nameKey}
            >
              {loading
                ? editingId
                  ? "수정 중..."
                  : "등록 중..."
                : editingId
                ? "저장"
                : "등록"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="basecancel"
                size="sm"
                onClick={cancelEdit}
              >
                취소
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
