import { useState } from "react";
import UploadImage from "./UploadImage";

const InputReceipt = () => {
  const [uploadImage, setUploadImage] = useState(null);

  return (
    <>
      <div className="m-3 flex items-center gap-5 text-sky-600 border-b border-sky-200 pb-1">
        <span className="text-xs text-gray-400 font-normal">
          📌 영수증은 개인정보를 제외하고 품목부터 가격까지만 올리세요. 서버에는
          일주일 후 자동 삭제됩니다.
        </span>
      </div>

      <UploadImage onChange={(file) => setUploadImage(file)} />
    </>
  );
};

export default InputReceipt;
