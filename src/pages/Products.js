import React, { useEffect, useState } from "react";
import HeadTitle from "../components/HeadTitle";
import Layout from "../components/Layout/Layout";
import { DataGrid } from "@material-ui/data-grid";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product.action";
import CreateProductModal from "../components/UI/createProductModal/CreateProductModal";
import UpdateProductModal from "../components/UI/updateProductModal/UpdateProductModal";

function Products() {
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [idForUpdateProduct, setIdForUpdateProduct] = useState("");
  const productState = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const openCreateModalHandler = () => {
    setCreateModal(true);
  };

  const closeCreateModalHandler = () => {
    setCreateModal(false);
  };

  const closeUpdateModalHandler = () => {
    setUpdateModal(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [createModal, updateModal]);

  let rows = productState.products && productState.products;

  // add index for id in rows
  rows.forEach((row, index) => {
    return (row.index = index + 1);
  });

  const columns = [
    { field: "index", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "نام محصول",
      width: 150,
      sortable: true,
    },
    {
      field: "category",
      headerName: "دسته بندی",
      width: 150,
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 110,
      sortable: true,
    },
    {
      field: "quantity",
      headerName: "تعداد محصول",
      sortable: false,
      width: 160,
    },
    {
      field: "descreption",
      headerName: "توضیحات محصول",
      width: 200,
    },
  ];
  return (
    <>
      <Layout>
        <HeadTitle
          title="محصولات"
          modalOpenHandler={openCreateModalHandler}
          withBtn
        />
        <div style={{ height: "650px", width: "100%", padding: "1rem 0" }}>
          <DataGrid
            rows={rows}
            pagination="server"
            columns={columns}
            pageSize={5}
            onRowClick={(param, e) => {
              setUpdateModal(true);
              setIdForUpdateProduct(param);
            }}
          />
        </div>
        <CreateProductModal
          openModalHandler={createModal}
          closeModalHandler={closeCreateModalHandler}
        />
        <UpdateProductModal
          openModalHandler={updateModal}
          closeModalHandler={closeUpdateModalHandler}
          idForUpdateProduct={idForUpdateProduct}
        />
      </Layout>
      ;
    </>
  );
}

export default Products;
