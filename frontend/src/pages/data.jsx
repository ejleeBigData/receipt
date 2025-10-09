import { useEffect, useState } from "react";
import InputToday from "../components/data/InputToday";
import InputText from "../components/category/InputText";
import InputDirect from "../components/data/InputDirect";
import InputReceipt from "../components/data/InputReceipt";
import Button from "../components/ui/Button";

const Data = () => {
  return (
    <div className="m-5 p-8 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <h1 className="text-2xl mb-6 flex items-baseline gap-10">
        <span>💦데이터랑</span>
        <span className="text-xs text-gray-500">
          <span className="text-red-500">*</span> 필수 입력
        </span>
      </h1>

      <InputToday />
      <InputText
        label="상점명"
        placeholder="(예: 상점명_지점)"
        inputWidthClass="w-1/2"
        required
      />
      <InputText label="메모" inputWidthClass="w-2/3" />

      <InputDirect />
      <InputReceipt />

      <div className="flex gap-3 mt-5 justify-center w-1/3">
        <Button type="button" variant="base" onClick={() => alert("저장")}>
          저장
        </Button>
        <Button>취소</Button>
      </div>
    </div>
  );
};

export default Data;
