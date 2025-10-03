import { useMemo, useEffect, useState } from "react";
import Button from "../ui/Button";
import InputText from "./InputText";

const CategoryForm = () => {
  const orders = useMemo(() => Array.from({ length: 50 }, (_, i) => i + 1), []);
  return (
    <form className="m-1 p-3 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <div className="mb-3 border-b border-sky-200 pb-1 flex items-center gap-3">
        <h6 className="text-sky-600">신규 등록</h6>
        <span className="text-xs text-gray-500">
          <span className="text-red-500">*</span> 은 필수 입력 항목입니다.
        </span>
      </div>

      <div className="overflow-x-auto md:overflow-visible">
        <div className="inline-flex items-center md:gap-4 whitespace-nowrap md:whitespace-normal w-max">
          <div className="flex items-center gap-2">
            <InputText
              id="name"
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
            <label htmlFor="sort_order" className="text-gray-700 flex-shrink-0">
              순서
            </label>
            <select
              id="sort_order"
              name="sort_order"
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
              htmlFor="showed"
              className="min-w-18 text-gray-700 flex-shrink-0"
            >
              누적 표시
            </label>
            <input
              id="showed"
              name="showed"
              type="checkbox"
              className="scale-110"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <InputText
              id="cut_price"
              label={<>상한선</>}
              type="number"
              value=""
              onChange={() => {}}
              placeholder="9999999"
              inputWidthClass="w-[12ch]"
              required
            />
          </div>
          <Button type="submit" variant="base" size="sm">
            등록
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
