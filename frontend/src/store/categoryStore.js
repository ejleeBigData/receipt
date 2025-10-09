import { create } from "zustand";
import categoryService from "../services/category";

const toNum = (v) => (v == null ? Number.MAX_SAFE_INTEGER : Number(v));
const sortByOrder = (list) =>
  [...list].sort((a, b) => {
    const sa = toNum(a.sort),
      sb = toNum(b.sort);
    if (sa !== sb) return sa - sb;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });

const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  editingId: null,
  startEdit: (id) => set({ editingId: id }),
  cancelEdit: () => set({ editingId: null }),

  //새로 추가된 카테고리를 정렬해서 반영
  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      set((state) => ({
        categories: sortByOrder([...state.categories, newCategory]),
        loading: false,
      }));
      return newCategory;
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ??
          err?.message ??
          "Failed to create category",
        loading: false,
      });
      throw err;
    }
  },

  listMyCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.listMyCategories();
      const list = Array.isArray(data) ? data : [];
      set({ categories: list, loading: false });
      return list;
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to get user categories",
        loading: false,
        categories: [],
      });
      return []; //throw err;
    }
  },

  updateCategory: async (id, categoryData) => {
    set({ loading: true, error: null });
    try {
      const updatedCategory = await categoryService.updateCategory(
        id,
        categoryData
      );

      set((state) => {
        const replaced = state.categories.map((cat) =>
          cat.id === id ? updatedCategory : cat
        );
        return {
          categories: sortByOrder(replaced), //수정된 순서로 재정렬
          loading: false,
          editingId: null, // 선택: 수정 완료 후 편집 종료
        };
      });

      return updatedCategory;
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ??
          err?.message ??
          "Failed to update category",
        loading: false,
      });
      throw err;
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true, error: null });
    try {
      await categoryService.deleteCategory(id);
      set((state) => {
        const filtered = state.categories.filter((cat) => cat.id !== id);
        return {
          categories: sortByOrder(filtered),
          loading: false,
          editingId: state.editingId === id ? null : state.editingId,
        };
      });
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ??
          err?.message ??
          "Failed to delete category",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useCategoryStore;
