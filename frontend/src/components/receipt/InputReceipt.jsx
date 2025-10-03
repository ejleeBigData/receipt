import { useState } from "react";
import UploadImage from "./UploadImage";

const InputReceipt = () => {
  const [uploadImage, setUploadImage] = useState(null);

  return (
    <div className="m-1 p-1 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <div className="mb-2 flex items-center gap-5 text-sky-600 border-b border-sky-200 pb-1">
        <h6>영수증 올리기</h6>
        <span className="text-xs text-gray-400 font-normal">
          📌 영수증은 품목부터 가격까지만 올리세요. 서버에는 일주일 후 자동
          삭제됩니다.
        </span>
      </div>

      <UploadImage onChange={(file) => setUploadImage(file)} />
      <UploadImage onChange={(file) => setUploadImage(file)} />
    </div>
  );
};

export default InputReceipt;
