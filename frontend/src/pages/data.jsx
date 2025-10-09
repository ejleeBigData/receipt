import { useEffect, useState } from "react";
import InputToday from "../components/data/InputToday";
import InputText from "../components/category/InputText";
import InputDirect from "../components/data/InputDirect";
import InputReceipt from "../components/data/InputReceipt";
import Button from "../components/ui/Button";

const Data = () => {
  return (
    <div className="m-5 p-8 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <h1 className="text-2xl mb-6">💦데이터랑</h1>
      <InputToday />
      <InputText
        label="상점명"
        placeholder="상점명을 입력하세요. (예: 상점명_지점)"
        inputWidthClass="w-1/2"
        required
      />
      <InputDirect />
    </div>
  );
};

export default Data;
