import api from "./api";

const categoryService = {
  createCategory: async (data) => {
    const response = await api.post("/api/categories", data);
    return response.data;
  },

  getUserCategories: async (userId, page = 0, size = 50) => {
    const response = await api.get(
      `/api/categories/user/${encodeURIComponent(userId)}`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },
};

export default categoryService;
