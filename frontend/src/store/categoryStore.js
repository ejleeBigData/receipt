import { create } from "zustand";
import categoryService from "../services/category";

const useCategoryStore = create((set, get) => ({
  categories: [],
  page: 0,
  loading: false,
  error: null,

  createCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      set((state) => ({
        categories: [newCategory, ...state.categories],
        loading: false,
      }));
      return newCategory;
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to create category",
        loading: false,
      });
      throw err;
    }
  },

  getUserCategories: async (userId, page = 0, size = 50) => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getUserCategories(userId, page, size);
      set((state) => ({
        categories:
          page === 0 ? data.content : [...state.categories, ...data.content],
        page,
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to get user categories",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useCategoryStore;
