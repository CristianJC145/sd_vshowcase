import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import { GetAllProducts } from './getAllProducts';
import { GetProductsWithPagination } from './getProductsWithPagination';

import upload from '../../src/shared/domain/services/multer.service';
import { DeleteProductById } from './deleteProductById';

const productRouter = Router();

const basePathApi = '/api/products';

productRouter.get(`${basePathApi}`, GetAllProducts);
productRouter.get(`${basePathApi}/list`, GetProductsWithPagination);

productRouter.post(`${basePathApi}/product`, upload.array('images', 5), CreateOrUpdateProduct);

productRouter.put(`${basePathApi}/product/:id`, upload.array('images', 5), CreateOrUpdateProduct);

productRouter.delete(`${basePathApi}/product/:id`, DeleteProductById);

export {
  productRouter,
};
