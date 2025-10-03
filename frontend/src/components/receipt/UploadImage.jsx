import { useId, useState } from "react";

const UploadImage = ({ label = "영수증", onChange, maxSizeMB = 5 }) => {
  const inputId = useId();
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      onChange?.(null);
      return;
    }

    // (옵션) 크기 검증
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`파일이 너무 큽니다. 최대 ${maxSizeMB}MB까지 업로드할 수 있어요.`);
      e.target.value = ""; // 선택 해제
      setFileName("");
      onChange?.(null);
      return;
    }

    setFileName(file.name);
    onChange?.(file); // 부모로 File 객체 전달
  };

  return (
    <div className="flex items-center gap-2 m-2">
      <label htmlFor={inputId} className="block mb-1 w-20">
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="border border-gray-300 rounded-lg p-2 text-sm focus:border-sky-400 
        focus:ring-2 focus:ring-sky-100 outline-none w-full"
        onChange={handleChange}
      />
      {fileName && (
        <p className="text-xs text-gray-500 mt-1">선택됨: {fileName}</p>
      )}
    </div>
  );
};

export default UploadImage;
