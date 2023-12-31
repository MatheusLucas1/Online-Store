import React from 'react';
import PropTypes from 'prop-types';
import { getCartProducts, saveProducts } from '../services/addToCart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
    };
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.productRemove = this.productRemove.bind(this);
  }

  componentDidMount() {
    const cartProducts = getCartProducts();
    this.setState({
      cartProducts,
    });
  }

  getProduct = () => {
    const products = getCartProducts();
    console.log(products);
    this.setState({
      cartProducts: products || [],
    });
  };

  productRemove(name) {
    const { cartProducts } = this.state;
    console.log(cartProducts);
    const filter = cartProducts.filter((product) => product.name !== name);
    console.log(filter);
    saveProducts(filter);
    this.getProduct();
  }

  increaseQuantity({ target }) {
    const { value } = target;
    const { cartProducts } = this.state;
    const findProduct = cartProducts.find((prod) => prod.productId === value);
    findProduct.quantity += 1;
    this.setState({
      cartProducts,
    });
    saveProducts(cartProducts);
  }

  decreaseQuantity({ target }) {
    const { value } = target;
    const { cartProducts } = this.state;
    const findProduct = cartProducts.find((prod) => prod.productId === value);
    if (findProduct.quantity > 1) {
      findProduct.quantity -= 1;
    }
    this.setState({
      cartProducts,
    });
    saveProducts(cartProducts);
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <div>
        {cartProducts.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>)
          : (
            <div>
              {cartProducts.map(({ name, quantity, image, productId }, index) => (
                <div key={ index }>
                  <img src={ image } alt={ productId } />
                  <p data-testid="shopping-cart-product-name">{name}</p>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${quantity}`}
                  </p>
                  <p>
                    {`id: ${productId}`}
                  </p>
                  <button
                    type="button"
                    value={ productId }
                    data-testid="product-increase-quantity"
                    onClick={ this.increaseQuantity }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    value={ productId }
                    data-testid="product-decrease-quantity"
                    onClick={ this.decreaseQuantity }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    name={ name }
                    value={ productId }
                    data-testid="remove-product"
                    onClick={ () => this.productRemove(name) }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>)}

      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string,
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};

export default Cart;
