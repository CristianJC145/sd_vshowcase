import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { toast } from "react-toastify";

import AppCard from "../../../shared/components/AppCard/AppCard";
import ImageUpload from "../components/ImageUpload";
import ProductField from "./ProductField";
import AppButton from "../../../shared/components/Buttons/AppButton";

import AppSwitch from "../../../shared/components/AppSwitch";
import RichTextEditor from "./RichTextEditor";

import { CreateOrUpdateProductService } from "../services/createOrUpdateProduct.service";
import { GetSubCategoriesByIdService } from "../services/getSubCategoriesById.service";
import { GetConditionsService } from "../services/getConditions.service";
import { TokenService } from "../../../shared/services/token.service";
import { GetSubCategoriesByProductService } from "../services/getSubcategoriesByProduct.service";

const createOrUpdateProduct = new CreateOrUpdateProductService();
const getSubCategoriesByIdService = new GetSubCategoriesByIdService();
const getConditionsService = new GetConditionsService();
const getSubCategoriesByProductService = new GetSubCategoriesByProductService();

const tokenSertice = new TokenService("");

interface ProductFormProps {
  dataProduct?: {
    productData?: {
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
    };
    subcategoryData?: number[];
  };
  categories: any[];
  initialSubcategories?: any[];
  fetchSubcategories?: (categoryId: number) => Promise<void>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre del producto es obligatorio"),
  productCategoryId: Yup.number().required("La categoría es obligatoria"),
  subcategoryId: Yup.array().required("Elige al menos una subcatería"),
  stock: Yup.number()
    .required("El stock es obligatorio")
    .min(0, "El stock debe ser mayor o igual a 0"),
  state: Yup.string().required("El estado es obligatorio"),
  conditionId: Yup.string().required(
    "La condición del producto es obligatorio"
  ),
  price: Yup.number().required("El precio es requerido"),
  images: Yup.array()
    .min(1, "Debes subir al menos una imagen")
    .max(5, "No puedes subir más de 5 imágenes a la vez")
    .test({
      name: "maxImages",
      message: "No puedes subir más de 5 imágenes a la vez",
      test: function (images) {
        return !images || images.length <= 5;
      },
    }),
});

const ProductForm: React.FC<ProductFormProps> = ({
  dataProduct,
  categories,
  initialSubcategories,
}) => {
  const navigate = useNavigate();
  const [subcategoriesByProduct, setSubcategoriesByProduct] = useState<any[]>(
    []
  );
  const [subcategories, setSubcategories] = useState<any[]>(
    initialSubcategories ? initialSubcategories : []
  );
  const [conditions, setConditions] = useState<any[]>([]);
  const dataToken = tokenSertice.isAuthenticated();
  const UserId = dataToken.id;
  console.log("data recibida", dataProduct);

  const initialValues = {
    id: dataProduct?.productData?.id ?? "",
    images: dataProduct?.productData?.images ?? [],
    name: dataProduct?.productData?.product_name ?? "",
    state: dataProduct?.productData?.state ?? 0,
    productCategoryId: dataProduct?.productData?.category_id ?? "",
    subcategoryId: dataProduct?.subcategoryData ?? [],
    stock: dataProduct?.productData?.stock ?? "",
    price: dataProduct?.productData?.price ?? "",
    description: dataProduct?.productData?.description ?? "",
    conditionId: dataProduct?.productData?.condition_id ?? null,
    userId: UserId,
  };

  const fetchSubcategoriesByProduct = async (productId: number) => {
    try {
      const result = await getSubCategoriesByProductService.run(productId);

      if (Object.keys(result).length > 0) {
        setSubcategoriesByProduct(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConditions = async () => {
    try {
      const conditions = await getConditionsService.run();
      setConditions(conditions);
    } catch (error) {
      console.log(error);
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

  const handleSubmit = async (data: any) => {
    console.log("data para enviar", data);
    const selectedSubcategories = data.subcategoryId.map(
      (subcategory: { value: any }) => subcategory
    );
    const dataSend = data?.id
      ? {
          id: data.id,
          data: {
            ...data,
            subcategoryId: selectedSubcategories,
          },
          isFormData: true,
        }
      : {
          data: {
            ...data,
            subcategoryId: selectedSubcategories,
          },
          isFormData: true,
        };
    try {
      await createOrUpdateProduct.run(dataSend);
      toast.success("¡Producto creado con éxito!");
      const url = "../products";
      navigate(url);
    } catch (e) {
      console.log(e);
    }
  };

  const GoBack = () => {
    const url = "../products";
    navigate(url);
  };
  useEffect(() => {
    fetchConditions();
    if (initialValues.id) {
      console.log("id:_ ", dataProduct?.productData?.category_id);
      fetchSubcategoriesByProduct(initialValues.id as number);
      fetchSubCategories(dataProduct?.productData?.category_id as number);
    }
  }, [initialValues.id]);
  console.log(categories);

  return (
    <ProductFormStyle>
      <Formik
        className="vs-product-form"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div>
            <h4 className="fw-bold mt-2">{`${
              dataProduct?.productData ? "Editar" : "Crear"
            } Producto`}</h4>
            <Form className="d-flex flex-column gap-4 mt-4">
              <AppCard
                body={
                  <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                      Imagenes del Producto
                    </h5>
                    <ProductField
                      title="Subir Imagenes"
                      tipDescription="Los formatos admitidos para las imagenes son .jpg .png .webp y un tamaño minimo de 250 x 250 pixeles. Seleccione o arrastre hasta 5 imagenes del producto y procure que sean imagenes llamativas para que resalte su producto."
                      required
                    >
                      <Field name="images">
                        {({ field }: any) => (
                          <ImageUpload
                            images={field.value}
                            onRemoveImage={(index: number) => {
                              const newImages = [...field.value];
                              newImages.splice(index, 1);
                              setFieldValue(field.name, newImages);
                            }}
                            onAddImages={(newImages: File[]) => {
                              setFieldValue("images", newImages);
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="images"
                        component="div"
                      />
                    </ProductField>
                  </div>
                }
              ></AppCard>

              <AppCard
                body={
                  <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                      Información del Producto
                    </h5>
                    <ProductField
                      title="Nombre del Producto"
                      tipDescription="Incluya almenos 20 caracteres para que su producto sea mas descriptivo y facil de buscar, inlcuya información relevante del producto como su color, material o tipo"
                      required
                    >
                      <Field
                        type="text"
                        className="form-control py-2"
                        name="name"
                        placeholder="Nombre del Producto"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="name"
                        component="div"
                      />
                    </ProductField>
                    <ProductField
                      title="Categoría"
                      tipDescription="Recuerda seleccionar la caterogia correspondiente al producto"
                      required
                    >
                      {initialValues.id && initialValues.id != null ? (
                        <Field
                          className="py-2"
                          id="productCategoryId"
                          name="productCategoryId"
                        >
                          {() => (
                            <>
                              {Object.keys(categories).length && (
                                <Select
                                  defaultValue={{
                                    value: categories.find(
                                      (category) =>
                                        category.id == values.productCategoryId
                                    ),
                                    label:
                                      categories.find(
                                        (c) =>
                                          c.id ===
                                          initialValues.productCategoryId
                                      )?.name || "Seleccione una categoría",
                                  }}
                                  className="py-2"
                                  options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                  }))}
                                  onChange={(selectedOption: any) => {
                                    setFieldValue("subcategoryId", null);
                                    fetchSubCategories(
                                      selectedOption?.value || ""
                                    );
                                    setFieldValue(
                                      "productCategoryId",
                                      selectedOption?.value || ""
                                    );
                                  }}
                                />
                              )}
                            </>
                          )}
                        </Field>
                      ) : (
                        <Field
                          className="py-2"
                          id="productCategoryId"
                          name="productCategoryId"
                        >
                          {() => (
                            <Select
                              className="py-2"
                              options={categories.map((category) => ({
                                value: category.id,
                                label: category.name,
                              }))}
                              placeholder="Selecciona una Categoria"
                              onChange={(selectedOption: any) => {
                                setFieldValue(
                                  "productCategoryId",
                                  selectedOption?.value || ""
                                );
                                setFieldValue("subcategoryId", []);
                                fetchSubCategories(selectedOption?.value || "");
                              }}
                            />
                          )}
                        </Field>
                      )}
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="productCategoryId"
                        component="div"
                      />
                    </ProductField>
                    <ProductField
                      title="Subcategoria"
                      tipDescription=" Selecciona la subcategoría que mejor describe tu producto. La subcategoría proporciona detalles adicionales y ayuda a los compradores a encontrar tu producto más fácilmente. Asegúrate de elegir la subcategoría más relevante para garantizar una clasificación precisa en la plataforma."
                      required
                    >
                      {Object.keys(subcategoriesByProduct).length > 0 ? (
                        <Field
                          className=" py-2"
                          id="subcategoryId"
                          name="subcategoryId"
                        >
                          {() => (
                            <Select
                              className="py-2"
                              defaultValue={
                                subcategoriesByProduct
                                  ? subcategoriesByProduct.map(
                                      (subcategory) => ({
                                        value: subcategory.id,
                                        label: subcategory.name,
                                      })
                                    )
                                  : null
                              }
                              placeholder="Selecciona Subcategorias"
                              isMulti
                              options={subcategories.map((subCategory) => ({
                                value: subCategory.id,
                                label: subCategory.name,
                              }))}
                              onChange={(selectedOption: any) => {
                                setFieldValue(
                                  "subcategoryId",
                                  selectedOption.vale || ""
                                );
                              }}
                            />
                          )}
                        </Field>
                      ) : (
                        <>
                          <Field
                            className=" py-2"
                            id="subcategoryId"
                            name="subcategoryId"
                          >
                            {() => (
                              <Select
                                className="py-2"
                                placeholder="Selecciona Subcategorias"
                                isMulti
                                options={subcategories.map((subCategory) => ({
                                  value: subCategory.id,
                                  label: subCategory.name,
                                }))}
                                onChange={(selectedOption: any) => {
                                  setFieldValue(
                                    "subcategoryId",
                                    selectedOption
                                  );
                                }}
                                value={values.subcategoryId}
                              />
                            )}
                          </Field>
                        </>
                      )}
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="subcategoryId"
                        component="div"
                      />
                    </ProductField>
                  </div>
                }
              ></AppCard>
              <AppCard
                body={
                  <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                      Gestion del Producto
                    </h5>
                    <ProductField
                      title="Estado del producto"
                      tipDescription="Si el producto está activo, los compradores puedes encontrar tu producto facilmente"
                      required
                    >
                      <Field name="state">
                        {({ field, form }: any) => (
                          <div className="d-flex gap-3 align-items-center">
                            <AppSwitch
                              value={field.value ? 1 : 0}
                              onChange={(value: number) =>
                                form.setFieldValue("state", value)
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="state"
                        component="div"
                      />
                    </ProductField>

                    <ProductField title="Stock del Producto" required>
                      <Field
                        type="text"
                        className="form-control py-2"
                        name="stock"
                        placeholder="Ingrese Stock del Producto"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="stock"
                        component="div"
                      />
                    </ProductField>

                    <ProductField title="Precio del Producto" required>
                      <Field
                        type="text"
                        className="form-control py-2"
                        name="price"
                        placeholder="Ingrese precio del Producto"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="price"
                        component="div"
                      />
                    </ProductField>
                  </div>
                }
              ></AppCard>
              <AppCard
                body={
                  <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                      Detalles del Producto
                    </h5>
                    <ProductField title="Condición del Producto" required>
                      {initialValues.id && initialValues.id != null ? (
                        <Field name="conditionId" className="form-select">
                          {() => (
                            <>
                              {Object.keys(conditions).length && (
                                <Select
                                  defaultValue={{
                                    value:
                                      conditions[
                                        (values.conditionId as number) - 1
                                      ]?.id,
                                    label:
                                      conditions[
                                        (values.conditionId as number) - 1
                                      ]?.name,
                                  }}
                                  className="z-3"
                                  placeholder="Selecciona una Condicion"
                                  options={conditions.map((condition) => ({
                                    value: condition.id,
                                    label: condition.name,
                                  }))}
                                  onChange={(conditionId: any) => {
                                    setFieldValue(
                                      "conditionId",
                                      conditionId?.value ?? ""
                                    );
                                  }}
                                />
                              )}
                            </>
                          )}
                        </Field>
                      ) : (
                        <Field name="conditionId" className="form-select">
                          {() => (
                            <Select
                              defaultValue={conditions.find(
                                (condition) =>
                                  condition.id === values.conditionId
                              )}
                              className="z-3"
                              placeholder="Selecciona una Condicion"
                              options={conditions.map((condition) => ({
                                value: condition.id,
                                label: condition.name,
                              }))}
                              onChange={(conditionId: any) => {
                                setFieldValue(
                                  "conditionId",
                                  conditionId?.value ?? ""
                                );
                              }}
                            />
                          )}
                        </Field>
                      )}
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="conditionId"
                        component="div"
                      />
                    </ProductField>

                    <ProductField
                      title="Descripción del Producto"
                      tipDescription="Ingresa una descripción detallada de tu producto. Proporciona información relevante, como características, usos, materiales y cualquier detalle que pueda ser útil para los compradores."
                    >
                      <Field
                        name="description"
                        component={RichTextEditor}
                      ></Field>
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="description"
                        component="div"
                      />
                    </ProductField>
                  </div>
                }
              ></AppCard>
              <div className="d-flex flex-column flex-sm-row gap-sm-3 justify-content-sm-end">
                <AppButton
                  className="mt-3 px-5"
                  variant="dark"
                  outlined
                  label="Cancelar"
                  onClick={() => GoBack()}
                ></AppButton>
                <AppButton className="mt-3 px-5" label="Guardar"></AppButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </ProductFormStyle>
  );
};
export default ProductForm;

const ProductFormStyle = styled.div`
  .vs-errorMensage {
    padding: var(--p-4) 0;
    color: red;
  }
`;
