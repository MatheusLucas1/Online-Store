import React from 'react';
import { getCartProducts, removeProduct } from '../services/addToCart';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
      clicks: 1,
    };
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentDidMount() {
    const cartProducts = getCartProducts();
    this.setState({
      cartProducts,
    });
  }

  increaseQuantity() {
    const { clicks, cartProducts } = this.state;
    this.setState({
      clicks: clicks + 1,
    });
  }

  decreaseQuantity() {
    const { clicks, cartProducts } = this.state;
    this.setState({
      clicks: clicks - 1,
    });
  }

  productRemove() {
    const { cartProducts } = this.state;
    console.log(cartProducts);
  }

  render() {
    const { clicks, cartProducts } = this.state;
    return (
      <div>
        {cartProducts.length === 0 ? (
          <h3 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h3>)
          : (
            <div>
              {cartProducts.map(({ name, quantity, image }, index) => (
                <div key={ index }>
                  <img src={ image } alt={ name } />
                  <p data-testid="shopping-cart-product-name">{name}</p>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${quantity}`}
                  </p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.increaseQuantity }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.decreaseQuantity }
                  >
                    -
                  </button>
                  <p>{clicks}</p>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ this.productRemove }
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

export default Cart;
