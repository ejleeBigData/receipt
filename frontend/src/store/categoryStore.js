import { useCallback, useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { stemApi } from "../services/category";

export default function useStem() {
  const { me, isAuthed, loading } = useAuth();
  const userId = me?.userId;

  const [stems, setStems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    if (loading || !isAuthed || !userId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await stemApi.getAllCategoryById();
      setStems(data ?? []);
    } catch (err) {
      setStems([]);
      //setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [loading, isAuthed]);

  const createStem = useCallback(
    async (stemData) => {
      setIsLoading(true);
      setError(null);
      try {
        await stemApi.createStem({ ...stemData });
        await reload();
        return true;
      } catch (err) {
        setError(err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [reload]
  );

  const updateStem = useCallback(
    async (id, payload) => {
      setIsLoading(true);
      setError(null);
      try {
        await stemApi.updateStem(id, payload);
        await reload();
        return true;
      } catch (err) {
        setError(err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [reload]
  );

  const deleteStem = useCallback(
    async (stemId) => {
      if (!stemId) {
        console.warn("삭제 호출에 id가 없습니다.");
        return;
      }
      if (
        !window.confirm(
          "해당 분류에 속한 데이터도 모두 삭제 됩니다. \n정말 삭제하시겠습니까?"
        )
      )
        return;

      try {
        await stemApi.deleteStem(stemId);
        try {
          await reload();
        } catch (reloadErr) {
          console.warn("삭제 후 목록 갱신 실패(무시):", reloadErr);
        }
      } catch (err) {
        setError("삭제 실패!🚧관리자에게 문의하세요.");
        console.error("Error delete category:", err);
      }
    },
    [reload]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    stems,
    isLoading,
    error,
    reload,
    createStem,
    updateStem,
    deleteStem,
  };
}
