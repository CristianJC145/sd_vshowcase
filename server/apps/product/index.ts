import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import { GetAllProducts } from './getAllProducts';
import { GetAllCategories } from './getAllCategories';
import { GetSubCategoriesById } from './getSubCategoriesById';
import { GetProductsWithPagination } from './getProductsWithPagination';
import { GetProductConditions } from './getProductConditions';
import { GetProductById } from './getProductById';
import { GetSubcategoriesByProduct } from './getSubcategoriesByProduct';


import upload from '../../src/shared/domain/services/multer.service';
import { DeleteProductById } from './deleteProductById';

const productRouter = Router();

const basePathApi = '/api/products';

productRouter.get(`${basePathApi}`, GetAllProducts);
productRouter.get(`${basePathApi}/list`, GetProductsWithPagination);
productRouter.get(`${basePathApi}/categories`, GetAllCategories);
productRouter.get(`${basePathApi}/product/:id`, GetProductById);
productRouter.get(`${basePathApi}/conditions`, GetProductConditions);
productRouter.get(`${basePathApi}/sub-categories/:id`, GetSubCategoriesById);
productRouter.get(`${basePathApi}/sub-categories-product/:id`, GetSubcategoriesByProduct);
productRouter.post(`${basePathApi}/product`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.put(`${basePathApi}/product/:id`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.delete(`${basePathApi}/product/:id`, DeleteProductById);

export {
  productRouter,
};
