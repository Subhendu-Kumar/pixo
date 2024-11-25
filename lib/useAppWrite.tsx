import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppWrite = (fn: (...args: any[]) => Promise<any>) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fn();
      if (!res) {
        throw new Error("Something went wrong");
      }
      setData(res.documents);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    fetchData();
  };

  return { data, isLoading, reFetch };
};

export default useAppWrite;
