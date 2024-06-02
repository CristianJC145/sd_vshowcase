import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

import AppButton from "../../../shared/components/Buttons/AppButton";
import AppDataTable from "../../../shared/components/DataTable/AppDataTable";

import { GetProductsWithPaginationService } from "../services/getProductsWithPagination.service";
import { DeleteProductByIdService } from "../services/deleteProductById.service";
import { TokenService } from "../../../shared/services/token.service";

import AppModal from "../../../shared/components/Modal/AppModal";
import { UpdateDatatableService } from "../../../shared/services/updateDatatable.service";
import AppIcon from "../../../shared/components/AppIcon";

const getProductsWithPaginationService = new GetProductsWithPaginationService();
const deleteProductByIdService = new DeleteProductByIdService();
const updateDatatableService = new UpdateDatatableService();
const tokenService = new TokenService("");

const ProductsPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idDataDelete, setIdDataDelete] = useState<number>();
  const navigate = useNavigate();
  const dataToken = tokenService.isAuthenticated();
  const handleEdit = (row: number) => {
    let url = `/dashboard/products/edit-product/${row}`;
    navigate(url);
  };

  const handleDelete = (id: number) => {
    setIsDeleteModalOpen(true);
    setIdDataDelete(id);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (idDataDelete) {
      await deleteProductByIdService.run(idDataDelete);
      updateDatatableService.run();
    }
    toast.success("¡Producto eliminado correctamente!");
    setIsDeleteModalOpen(false);
  };

  const params = {
    id: dataToken.id,
  };
  const columns = [
    {
      Header: "Imagenes",
      Cell: ({ value }: any) => {
        const imagesArray = value.images.toString().split(",");
        return (
          <div className="d-flex ms-4">
            {imagesArray.map((image: string) => (
              <div key={image} style={{ marginLeft: "-1.75rem" }}>
                <img
                  key={image}
                  src={image}
                  width={45}
                  height={45}
                  className="object-fit-cover rounded-circle"
                  style={{ boxShadow: "0 0 0 2px #fff" }}
                  alt="Imagen Producto"
                />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      Header: "Nombre",
      accessor: "product_name",
      columnClassName: "text-center",
      HeaderClassName: "text-center",
      truncate: true,
      maxChars: 40,
    },
    {
      Header: "Stock",
      accessor: "stock",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Precio",
      accessor: "price",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Estado",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
      Cell: ({ value }: any) => {
        const stateMap: { [key: number]: string } = {
          0: "Inactivo",
          1: "Activo",
        };
        const className = `${
          stateMap[value.state] === "Activo" ? "vs-active" : "vs-inactive"
        }`;
        return (
          <ProductsPageStyles>
            <div
              className={`${className} d-flex align-items-center justify-content-center gap-2`}
            >
              <AppIcon icon="square-check"></AppIcon>
              <span>{stateMap[value.state] || "Desconocido"}</span>
            </div>
          </ProductsPageStyles>
        );
      },
    },
    {
      Header: "Acciones",
      HeaderClassName: "text-center",
      Cell: ({ value }: any) => (
        <div className="d-flex justify-content-center">
          <AppButton
            variant="dark"
            className="bg-transparent"
            icon="check-square"
            onClick={() => handleEdit(value.id)}
          >
            Editar
          </AppButton>
          <AppButton
            className="text-danger bg-transparent"
            icon="trash-alt"
            onClick={() => handleDelete(value.id)}
          >
            Eliminar
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
      <div className="d-flex align-items-center mb-3">
        <AppButton
          label="Agregar Producto"
          to={"/dashboard/products/create"}
        ></AppButton>
      </div>
      <AppDataTable
        columns={columns}
        params={params}
        service={getProductsWithPaginationService}
      ></AppDataTable>

      <AppModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      ></AppModal>
    </>
  );
};
export default ProductsPage;

const ProductsPageStyles = styled.span`
  .vs-active {
    color: var(--color-success);
  }
  .vs-inactive {
    color: var(--color-danger);
  }
`;
