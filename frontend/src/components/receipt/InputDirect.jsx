import { useState } from "react";
import InputCategory from "./InputCategory";
import InputItem from "./InputItem";
import InputPrice from "./InputPrice";
import Subtotal from "./Subtotal";

const emptyRow = {
  category: { id: null, name: "" },
  content: "",
  price: "",
  quantity: 1,
};

const InputDirect = () => {
  const { me, isAuthed, loading } = useAuthStore();
  const userId = me?.userId;
  const { options, error } = userCategory(userId);

  // 5줄 초기화
  const [rows, setRows] = useState(
    Array.from({ length: 5 }, () => ({ ...emptyRow }))
  );

  const updateRow = (idx, patch) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, ...patch } : row))
    );
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <div className="m-1 p-1 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <h6 className="mb-3 text-sky-600 border-b border-sky-200 pb-1">
        직접 입력
      </h6>

      {rows.map((row, idx) => {
        const subtotal = (Number(row.price) || 0) * (Number(row.quantity) || 0);
        const showLabel = idx === 0; // 첫 번째 줄만 라벨 표시

        return (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center text-sm text-gray-600 mb-2"
          >
            <InputCategory
              label={showLabel ? "카테고리" : ""}
              value={row.category}
              onChange={(v) => updateRow(idx, { category: v })}
              options={options}
              className="w-full"
            />
            <InputItem
              label={showLabel ? "내용" : ""}
              value={row.content}
              onChange={(v) => updateRow(idx, { content: v })}
              placeholder="예: 한돈안심 660g"
            />
            <InputPrice
              label={showLabel ? "가격" : ""}
              value={row.price}
              onChange={(v) => updateRow(idx, { price: v })}
              placeholder="예: 21000"
              min={0}
              className="w-2/3 text-center"
            />
            <InputPrice
              label={showLabel ? "수량" : ""}
              value={row.quantity}
              onChange={(v) => updateRow(idx, { quantity: v })}
              placeholder="예: 1"
              className="w-1/2 text-center"
              min={0}
            />
            <Subtotal label={showLabel ? "부분합" : ""} value={subtotal} />
          </div>
        );
      })}
    </div>
  );
};

export default InputDirect;
