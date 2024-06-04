import { Request, Response } from 'express';
import { CreateOrUpdateProductApp } from '../../src/product/app/createOrUpdateProduct.app';
import { CreateOrUpdateProductDto } from '../../src/product/domain/dtos/createOrUpdateUser.dto';
import { GetProductByIdApp } from '../../src/product/app/getProductById.app';

const CreateOrUpdateProduct = async (req: Request, res: Response) => {
  try {
    const getProductByIdApp = new GetProductByIdApp();
    const request = req.body;
    const id = req.params.id ? parseInt(req.params.id, 10) : null;

    let existingImages = []
    if (id) {
      const existingProduct = await getProductByIdApp.run(id);
      existingImages = existingProduct.productData[0].images?
      existingProduct.productData[0].images.split(',') : [];
    }

    console.log("resultado productos::::::::::::::", request);

    const files = req.files as any[];
    const subcategories = request.subcategoryId || [];
    const images = files.map((file) => file.path.replace('\\', '/'));

    const allImages = [...existingImages, ...images]

    const subcategoriesData = subcategories.map((subcategory: { value: any; }) => subcategory.value);

    const data : CreateOrUpdateProductDto = {
      product: request,
      images: allImages,
    };

    data.product.subcategoriesId = subcategoriesData;


    data.product.subcategoriesId = subcategories;
    const createOrUpdateProductApp = new CreateOrUpdateProductApp();
    const result = await createOrUpdateProductApp.run(data, id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error interno en el servidor' });
  }
};
export {
  CreateOrUpdateProduct,
};

