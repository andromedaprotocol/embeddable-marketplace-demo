import { useCallback } from "react";
import useApp from "./useApp";

export const useAppUtils = () => {
  const { config } = useApp();

  const getCollections = useCallback(() => {
    return config.collections;
  }, [config]);

  const getCollection = useCallback(
    (id: string) => {
      return getCollections().find((col) => col.id === id);
    },
    [config]
  );

  return { getCollections, getCollection };
};
