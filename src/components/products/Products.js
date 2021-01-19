import React, { useState, useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../api";
import ProductForm from "../productForm/ProductForm";
import ProductsList from "../productsList/ProductsList";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
  isEditFormOpen: false,
  editedProduct: {},
};

const Products = () => {
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    setLoading();
    getProducts()
      .then((data) => {
        setState((prev) => ({ ...prev, products: [...data] }));
      })
      .catch((error) => {
        if (error.data) {
          setState((prev) => ({ ...prev, error: error.data }));
        } else setState((prev) => ({ ...prev, error: "something went wrong" }));
      })
      .finally(setLoading);
  }, []);

  const setLoading = () => {
    setState((prev) => ({ ...prev, isLoading: !prev.isLoading }));
  };
  const setEdit = () => {
    setState((prev) => ({ ...prev, isEditFormOpen: !prev.isEditFormOpen }));
  };

  const resetError = () => {
    setState((prev) => ({ ...prev, error: "" }));
  };

  const addProductItem = (product) => {
    resetError();
    setLoading();
    addProduct(product)
      .then((data) =>
        setState((prev) => ({ ...prev, products: [...prev.products, data] }))
      )
      .catch((error) => {
        if (error.data) {
          setState((prev) => ({ ...prev, error: error.data }));
        } else setState((prev) => ({ ...prev, error: "something went wrong" }));
      })
      .finally(setLoading);
  };

  const deleteItem = (e) => {
    const id = e.target.dataset.id;
    resetError();
    setLoading();
    deleteProduct(id)
      .then(
        (res) =>
          res.status === 200 &&
          setState((prev) => ({
            ...prev,
            products: [...prev.products.filter((product) => product.id !== id)],
          }))
      )
      .catch((error) => {
        if (error.data) {
          setState((prev) => ({ ...prev, error: error.data }));
        } else setState((prev) => ({ ...prev, error: "something went wrong" }));
      })
      .finally(setLoading);
  };

  const editItem = (e) => {
    const id = e.target.dataset.id;
    setEdit();
    setState((prev) => ({
      ...prev,
      editedProduct: prev.products.find((product) => product.id === id),
    }));
    if (state.editedProduct.id) {
      setState((prev) => ({ ...prev, editedProduct: {} }));
    }
  };

  const submitEditedProduct = (product) => {
    updateProduct(product);
    setState((prev) => ({
      ...prev,
      products: [
        ...prev.products.map((item) =>
          item.id === state.editedProduct.id ? { ...product } : item
        ),
      ],
      editedProduct: {},
    }));
    setEdit();
  };

  return (
    <>
      <ProductForm addProductItem={addProductItem} />

      {state.isLoading && <h2>...Loading</h2>}
      {state.error && <h2>{state.error}</h2>}
      {state.isEditFormOpen && (
        <ProductForm
          addProductItem={addProductItem}
          editedProduct={state.editedProduct}
          submitEditedProduct={submitEditedProduct}
        />
      )}
      {state.products.length ? (
        <ProductsList
          products={state.products}
          deleteItem={deleteItem}
          editItem={editItem}
          isEditFormOpen={state.isEditFormOpen}
          editedProduct={state.editedProduct}
        />
      ) : (
        <>{!state.isLoading && <h2>No products</h2>}</>
      )}
    </>
  );
};

export default Products;
