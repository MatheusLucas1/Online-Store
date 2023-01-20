import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  handleImportProps = () => {
    const { id, title, price, thumbnail, router } = this.props;
    router.push({
      pathname: `/product-details/${id}`,
      state: { title, price, thumbnail, id },
    });
  };

  render() {
    const { title, price, thumbnail, id, addToCart } = this.props;
    return (
      <div key={ id }>
        <h1 data-testid="product">{title}</h1>
        <img
          src={ thumbnail }
          alt={ title }
        />
        <p>{price}</p>
        <button
          type="button"
          onClick={ this.handleImportProps }
          data-testid="product-detail-link"
        >
          Ver
        </button>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart(id) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
