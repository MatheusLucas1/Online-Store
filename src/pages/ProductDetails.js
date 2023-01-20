import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
// import { getCartProducts } from '../services/addToCart';

class ProductDetails extends React.Component {
  state = {
    details: [],
  };

  async componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    const { id } = state;
    const details = await getProductById(id);
    this.setState({
      details,
    });
  }

  render() {
    const { details } = this.state;
    return (
      <div>
        <h1
          data-testid="product-detail-name"
        >
          Titulo:
          {details.title}
        </h1>
        <img
          data-testid="product-detail-image"
          src={ details.thumbnail }
          alt={ details.title }
        />
        <h4
          data-testid="product-detail-price"
        >
          Preço:
          {details.price}
        </h4>
        <Link to="/cart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Voltar ao carrinho
          </button>
        </Link>

      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string,
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
