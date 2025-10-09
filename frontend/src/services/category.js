import api from "./api";

const categoryService = {
  createCategory: async (data) => {
    const response = await api.post("/api/categories", data);
    return response.data;
  },

  listMyCategories: async () => {
    const response = await api.get(`/api/categories`);
    return Array.isArray(response.data) ? response.data : [];
  },

  updateCategory: async (id, data) => {
    const response = await api.put(`/api/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/api/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
