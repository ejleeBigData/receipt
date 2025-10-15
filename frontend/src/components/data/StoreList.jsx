import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../store/authStore";
import useStoreStore from "../../store/storeStore";
import { BiPen, BiTrash } from "react-icons/bi";
import { fmtDay } from "../../utils/date";

const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

const StoreList = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const { user } = useAuthStore();
  const { stores, loading, error, listMyStoresItemByMonth } = useStoreStore();

  useEffect(() => {
    listMyStoresItemByMonth(year, month).then((list) => {
      console.log("[StoreList] :", list);
    });
  }, [year, month, listMyStoresItemByMonth]);

  // 총합
  const grandTotal = useMemo(() => {
    return (stores || []).reduce((acc, it) => acc + toNum(it.totalAmount), 0);
  }, [stores]);

  // 연/월 셀렉트 옵션, 필요에 따라 범위 조정
  const yearOptions = useMemo(() => {
    const base = now.getFullYear();
    return [base - 1, base, base + 1];
  }, []);

  return (
    <div className="mx-5 mb-5 p-3 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun text-xs">
      <div className="flex items-center gap-2 mb-3">
        <label className="text-gray-700">조회</label>
        <select
          className="border border-gray-300 rounded px-1 py-1"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded px-1 py-1"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {monthOptions.map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>
        {loading && <span className="text-gray-500 ml-2">불러오는 중…</span>}
        {error && <span className="text-red-500 ml-2">🚩{String(error)}</span>}
      </div>

      <div className="hidden md:grid md:grid-cols-[0.5fr_1fr_1fr_2fr_1fr_0.5fr_0.5fr_1fr_auto] gap-2 text-gray-600 border-b border-gray-200 pb-2">
        <div>구매일</div>
        <div>상점</div>
        <div>카테고리</div>
        <div>내용</div>
        <div>가격</div>
        <div>수량</div>
        <div>부분합</div>
        <div>메모</div>
        <div></div>
      </div>

      <div className="divide-y divide-gray-100">
        {(stores || []).length === 0 && !loading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            데이터가 없습니다.
          </div>
        ) : (
          (stores || []).map((it) => {
            const id = it.itemId;
            const storeName = it.storeName;
            const purchaseDate = fmtDay(it.purchaseDate);
            const categoryName = it.categoryName ?? "-";
            const itemNames = it.itemNames ?? "-";
            const totalAmount = toNum(it.totalAmount);
            const quantity = toNum(it.itemQuantity);
            const memo = it.memo ?? "-";

            return (
              <div
                key={id}
                className="py-2 grid grid-cols-1 md:grid-cols-[0.5fr_1fr_1fr_2fr_1fr_0.5fr_0.5fr_1fr_auto] gap-2 items-center"
              >
                <div className="text-gray-800">{purchaseDate}</div>
                <div className="text-gray-800">{storeName}</div>
                <div>{categoryName}</div>
                <div className="break-words">{itemNames}</div>
                <div className="tabular-nums">
                  {totalAmount.toLocaleString()}
                </div>
                <div className="tabular-nums">{quantity.toLocaleString()}</div>
                <div className="font-medium tabular-nums">
                  {totalAmount.toLocaleString()}
                </div>
                <div>{memo}</div>

                <div className="flex justify-end">
                  <BiPen size={20} title="수정" className="cursor-pointer" />
                  <BiTrash size={20} title="삭제" className="cursor-pointer" />
                </div>

                {/* 모바일 라벨 (md 미만일 때 보기 쉽게) */}
                <div className="md:hidden mt-2 text-xs text-gray-500 col-span-1">
                  <div>카테고리: {categoryName}</div>
                  <div>
                    가격×수량: {totalAmount.toLocaleString()}
                    {quantity.toLocaleString()}
                  </div>
                  <div>부분합: {totalAmount.toLocaleString()}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 총합 */}
      <div className="flex justify-end items-center pt-3 mt-2 border-t border-gray-200">
        <div className="text-xs text-gray-600 mr-2">총합</div>
        <div className="font-semibold tabular-nums">
          {grandTotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default StoreList;
