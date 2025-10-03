import api from "./api";

const stemApi = {
  getCategoryById: async () => {
    const response = await api.get(`/categories`);
    return response.data;
  },

  getAllCategoryById: async () => {
    const response = await api.get(`/categories/all`);
    return response.data;
  },

  createStem: async (stemData) => {
    const response = await api.post("/categories", stemData);
    return response.data;
  },

  updateStem: async (stemId, stemData) => {
    const response = await api.put(`/categories/${stemId}`, stemData);
    return response.data;
  },

  deleteStem: async (stemId) => {
    const response = await api.delete(`/categories/${stemId}`);
    return response.data;
  },
};

export default stemApi;
