import React from "react";

const ProductsList = ({
  products,
  deleteItem,
  editItem,
  isEditFormOpen,
  editedProduct,
}) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>Name: {product.name}</h2>
          <p>Price: {product.price}</p>

          <button data-id={product.id} onClick={editItem}>
            {isEditFormOpen && editedProduct.id === product.id
              ? "Cancel"
              : "Edit"}
          </button>

          {editedProduct.id !== product.id && (
            <button data-id={product.id} onClick={deleteItem}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
