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

  updateStore: async (storeId, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await storeService.updateStore(storeId, data);
      set((state) => ({
        stores: state.stores.map((s) =>
          s.id === storeId ? { ...s, ...updated } : s
        ),
        loading: false,
      }));
      return updated;
    } catch (err) {
      set({
        error: err?.response?.data?.message ?? "Failed to update store",
        loading: false,
      });
      throw err;
    }
  },

  deleteStore: async (storeId) => {
    set({ loading: true, error: null });
    try {
      await storeService.deleteStore(storeId);
      set((state) => ({
        stores: state.stores.filter((s) => s.id !== storeId),
        loading: false,
      }));
      return true;
    } catch (err) {
      set({
        error: err?.response?.data?.message ?? "Failed to delete store",
        loading: false,
      });
      throw err;
    }
  },
}));

export default useStoreStore;
