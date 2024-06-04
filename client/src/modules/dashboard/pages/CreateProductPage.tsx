import { useEffect, useState } from "react";
import ProductForm from "../components/ProductsForm";
import { GetAllCategoriesService } from "../services/getAllCategories.service";

const getAllCategoriesService = new GetAllCategoriesService();

const CreateProductPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const fetchCategories = async () => {
    try {
      const result = await getAllCategoriesService.run();

      if (Object.keys(result).length > 0 && result !== undefined) {
        setCategories(result);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return <ProductForm categories={categories}></ProductForm>;
};
export default CreateProductPage;
