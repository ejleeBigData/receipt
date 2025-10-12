import api from "./api";
import { toYyyyMMdd } from "../utils/date";

const storeService = {
  createStore: async (data) => {
    const payload = {
      purchaseDate: toYyyyMMdd(data.purchaseDate),
      name: data.name?.trim(),
      memo: data.memo ?? "",
      items: (data.items ?? []).map((it) => ({
        categoryId: it.categoryId,
        name: it.item?.trim(),
        price: it.price,
        quantity: it.quantity,
      })),
    };

    const response = await api.post("/api/stores", payload);
    return response.data;
  },

  listMyStoresItemByMonth: async (year, month) => {
    const response = await api.get(`/api/stores`, {
      params: { year, month },
    });
    return Array.isArray(response.data) ? response.data : [];
  },
};

export default storeService;
