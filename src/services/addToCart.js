const PRODUCT_LOCAL = 'product_Id';

if (!JSON.parse(localStorage.getItem(PRODUCT_LOCAL))) {
  localStorage.setItem(PRODUCT_LOCAL, JSON.stringify([]));
}
const readProductCart = () => JSON.parse(localStorage.getItem(PRODUCT_LOCAL));

export const saveProducts = (cartProducts) => localStorage
  .setItem(PRODUCT_LOCAL, JSON.stringify(cartProducts));

export const getCartProducts = () => {
  const cartProducts = readProductCart();
  return cartProducts;
};

export const addCart = (product) => {
  const productInfo = {
    productId: product.id,
    image: product.thumbnail,
    name: product.title,
    quantity: 1,
  };
  if (product) {
    const cartProducts = readProductCart();
    saveProducts([...cartProducts, (productInfo)]);
  }
};

export const removeProduct = (product) => {
  const cartProducts = readProductCart();
  const filter = cartProducts.filter((s) => s.productId !== (product).productId);
  saveProducts(filter);
};
