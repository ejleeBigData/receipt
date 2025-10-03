import { useMemo, useState } from "react";
import CategoryForm from "../components/category/CategoryForm";

const Category = () => {
  return (
    <div className="m-5 p-8 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
      <h1 className="text-2xl mb-6">🌱 카테고리랑</h1>
      <CategoryForm />
      <div className="m-1 mt-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white font-gowun">
        목록
      </div>
    </div>
  );
};

export default Category;
