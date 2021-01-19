import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get(
      `https://rest-6b03b-default-rtdb.firebaseio.com/products.json`
    );
    if (!response.data) {
      return [];
    }

    const result = Object.keys(response.data).map((item) => ({
      id: item,
      ...response.data[item],
    }));

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      `https://rest-6b03b-default-rtdb.firebaseio.com/products.json`,
      product
    );
    return { id: response.data.name, ...product };
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await axios.delete(
      `https://rest-6b03b-default-rtdb.firebaseio.com/products/${id}.json`
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (product) => {
  const editedProduct = { ...product };
  delete editedProduct.id;
  console.log(editedProduct);
  try {
    return await axios.put(
      `https://rest-6b03b-default-rtdb.firebaseio.com/products/${product.id}.json`,
      editedProduct
    );
  } catch (error) {
    throw new Error(error);
  }
};
