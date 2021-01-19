import React, { useState } from "react";

const initialState = {
  name: "",
  price: "",
};

const ProductForm = ({ addProductItem, editedProduct = {}, ...rest }) => {
  const [product, setProduct] = useState({ ...initialState, ...editedProduct });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onHadleSubmit = (e) => {
    e.preventDefault();
    editedProduct.id
      ? rest.submitEditedProduct(product)
      : addProductItem(product);
    setProduct({ ...initialState });
  };
  return (
    <form onSubmit={onHadleSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          onChange={onHandleChange}
          value={product.name}
        />
      </label>
      <label>
        Price:
        <input
          type='text'
          name='price'
          onChange={onHandleChange}
          value={product.price}
        />
      </label>
      <button type='submit'>{editedProduct.id ? "Edit" : "Add product"}</button>
    </form>
  );
};

export default ProductForm;
