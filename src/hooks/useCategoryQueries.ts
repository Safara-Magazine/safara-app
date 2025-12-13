import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data.data || [];
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes (categories change less frequently)
  });
};
