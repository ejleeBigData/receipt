import { create } from "zustand";
import storeService from "../services/store";

const useStoreStore = create((set, get) => ({
  stores: [],
  loading: false,
  error: null,

  createStore: async (data) => {
    set({ loading: true, error: null });
    try {
      const created = await storeService.createStore(data);
      set((state) => ({
        stores: state.stores, // 필요시 조건부로 [created, ...state.stores]
        loading: false,
      }));
      return created;
    } catch (err) {
      set({
        error:
          err?.response?.data?.message ??
          err?.message ??
          "Failed to create store",
        loading: false,
      });
      throw err;
    }
  },

  listMyStoresItemByMonth: async (year, month) => {
    set({ loading: true, error: null });
    try {
      const list = await storeService.listMyStoresItemByMonth(year, month);
      set({ stores: list, loading: false });
      //console.log(list);
      return list;
    } catch (err) {
      set({
        error: err.response?.data.message || "Failed to get user stores",
        loading: false,
      });
      return [];
    }
  },
}));

export default useStoreStore;
