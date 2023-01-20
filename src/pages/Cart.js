import React from 'react';
import { getCartProducts } from '../services/addToCart';

class Cart extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProducts = getCartProducts();
    this.setState({
      cartProducts,
    });
    console.log(cartProducts);
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
              {cartProducts.map(({ name, quantity, image }, index) => (
                <div key={ index }>
                  <img src={ image } alt={ name } />
                  <p data-testid="shopping-cart-product-name">{name}</p>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${quantity}`}
                  </p>
                </div>
              ))}
            </div>)}

      </div>
    );
  }
}

export default Cart;
