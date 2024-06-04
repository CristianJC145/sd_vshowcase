import { useEffect, useState } from "react";
import ProductForm from "../components/ProductsForm";
import { GetProductByIdService } from "../services/getProductById.service";
import { useParams } from "react-router-dom";
import { services } from "../../../shared/constant/services";
import { GetAllCategoriesService } from "../services/getAllCategories.service";
import { GetSubCategoriesByIdService } from "../services/getSubCategoriesById.service";

const getProductByIdService = new GetProductByIdService();
const getAllCategoriesService = new GetAllCategoriesService();
const getSubCategoriesByIdService = new GetSubCategoriesByIdService();

interface ProductData {
  id: number;
  images: string[];
  state: number;
  stock: string;
  user_id: number;
  price: string;
  product_name: string;
  condition_id: number;
  category_id: number;
  description: string;
}

interface EditProductPageState {
  productData?: ProductData;
  subcategoryData?: number[];
}

const EditProductPage = () => {
  const [productById, setproductById] = useState<EditProductPageState>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const { id = "0" } = useParams<{ id: string }>();

  const fetchProduct = async () => {
    try {
      const idProduct = parseInt(id, 10);

      const { productData, subcategoryData } = await getProductByIdService.run(
        idProduct
      );

      const updateProductData = productData.map((prod: any) => ({
        ...prod,
        images: prod.images
          .split(",")
          .map((image: string) => `${services.api_url}/${image}`),
      }));

      const dataSend: EditProductPageState = {
        productData: updateProductData[0],
        subcategoryData: subcategoryData.map(
          (item: { subcategory_id: any }) => item.subcategory_id
        ),
      };

      setproductById(dataSend);

      if (productData.productData?.category_id) {
        fetchSubCategories(productData.productData.category_id);
      }
    } catch (error) {}
  };

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
  const fetchSubCategories = async (categoryId: number) => {
    try {
      const result = await getSubCategoriesByIdService.run(categoryId);
      setSubcategories(result);
    } catch (error) {
      console.error("Error al obtener subcategorías:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  return (
    <>
      {Object.keys(productById).length > 0 && (
        <ProductForm
          dataProduct={productById}
          categories={categories}
          initialSubcategories={subcategories}
          fetchSubcategories={fetchSubCategories}
        ></ProductForm>
      )}
    </>
  );
};
export default EditProductPage;
