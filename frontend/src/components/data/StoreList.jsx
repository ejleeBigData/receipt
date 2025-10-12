// src/components/store/StoreList.jsx
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "../../store/authStore";
import useStoreStore from "../../store/storeStore";
import { RiDeleteBin5Line } from "react-icons/ri";
import { fmtDay } from "../../utils/date";

const toNum = (v) => (typeof v === "number" ? v : Number(v) || 0);

const StoreList = () => {
  // 기본값: 오늘 연/월
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const { user } = useAuthStore();
  const { stores, loading, error, listMyStoresItemByMonth } = useStoreStore();

  useEffect(() => {
    listMyStoresItemByMonth(year, month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  // 총합
  const grandTotal = useMemo(() => {
    return (stores || []).reduce((acc, it) => {
      const price = toNum(it.price);
      const qty = toNum(it.quantity);
      const sub = toNum(it.subtotal) || price * qty;
      return acc + sub;
    }, 0);
  }, [stores]);

  // 연/월 셀렉트 옵션, 필요에 따라 범위 조정
  const yearOptions = useMemo(() => {
    const base = now.getFullYear();
    return [base - 1, base, base + 1];
  }, []);

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

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
        {error && <span className="text-red-500 ml-2">{String(error)}</span>}
      </div>

      <div className="hidden md:grid md:grid-cols-[0.5fr_1fr_2fr_3fr_1fr_0.5fr_0.5fr_1fr_auto] gap-2 text-gray-600 border-b border-gray-200 pb-2">
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
            const id =
              it.id ?? `${it.payedAt}-${it.item}-${it.categoryId ?? ""}`;
            const storeName = it.storeName;
            const purchaseDate = fmtDay(it.purchaseDate);
            const categoryName = it.categoryName ?? it.category?.name ?? "-";
            const itemTitle = it.itemTitle ?? it.anyItemName ?? "-";
            const totalAmount = toNum(it.totalAmount);
            const price = toNum(it.price ?? 0);
            const qty = toNum(it.quantity);
            const subtotal = toNum(it.subtotal) || price * qty;
            const memo = it.memo ?? "-";

            return (
              <div
                key={id}
                className="py-2 grid grid-cols-1 md:grid-cols-[0.5fr_1fr_2fr_3fr_1fr_0.5fr_0.5fr_1fr_auto] gap-2 items-center"
              >
                {/* 구매일 */}
                <div className="text-gray-800">{purchaseDate}</div>
                <div className="text-gray-800">{storeName}</div>

                {/* 카테고리 */}
                <div>{categoryName}</div>

                <div className="break-words">{itemTitle}</div>
                <div className="tabular-nums">
                  {totalAmount.toLocaleString()}
                </div>

                <div className="tabular-nums">{qty.toLocaleString()}</div>

                {/* 부분합 */}
                <div className="font-medium tabular-nums">
                  {subtotal.toLocaleString()}
                </div>
                <div>{memo}</div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled
                    title="상점,내용 모두 삭제"
                    className="p-1 rounded opacity-40 cursor-not-allowed"
                  >
                    <RiDeleteBin5Line size={15} />
                  </button>
                </div>

                {/* 모바일 라벨 (md 미만일 때 보기 쉽게) */}
                <div className="md:hidden mt-2 text-xs text-gray-500 col-span-1">
                  <div>카테고리: {categoryName}</div>
                  <div>
                    가격×수량: {price.toLocaleString()} × {qty.toLocaleString()}
                  </div>
                  <div>부분합: {subtotal.toLocaleString()}</div>
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
