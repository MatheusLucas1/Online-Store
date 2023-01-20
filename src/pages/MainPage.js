/* eslint-disable no-lone-blocks */
// route: "/"
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { addCart } from '../services/addToCart';

import ProductCard from '../components/ProductCard';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      fetchResult: [],
      product: '',
      didSearch: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCategoryId = this.getCategoryId.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      product: value,
    });
  }

  async handleClick() {
    const { product } = this.state;
    const fetchQueryItems = await getProductsFromCategoryAndQuery('', product);
    const fetchResult = fetchQueryItems.results;
    this.setState({
      fetchResult,
      didSearch: true,
    });
  }

  async getCategoryId({ target }) {
    const { value } = target;
    const fetchCategoryItems = await getProductsFromCategoryAndQuery(value, '');
    const fetchResult = fetchCategoryItems.results;
    this.setState({
      fetchResult,
      didSearch: true,
    });
  }

  addToCart = async (productId) => {
    const { fetchResult } = this.state;
    const cartProductFound = fetchResult.find((product) => product.id === productId);
    addCart(cartProductFound);
  };

  render() {
    const { categories, product, fetchResult, didSearch } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">
            carrinho
          </button>
        </Link>
        <label htmlFor="search-input">
          <input
            id="search-input"
            data-testid="query-input"
            type="text"
            defaultValue={ product }
            onChange={ this.handleChange }
            placeholder="Digite o produto que deseja"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </label>
        <ul>
          {categories.map(({ id, name }) => (
            <li key={ id }>
              <button
                data-testid="category"
                type="button"
                id="button"
                onClick={ this.getCategoryId }
                value={ id }
              >
                { name }
              </button>

            </li>
          ))}
        </ul>
        {didSearch ? fetchResult.map((
          {
            title,
            price,
            thumbnail,
            id },
        ) => (
          <ProductCard
            key={ id }
            id={ id }
            price={ price }
            title={ title }
            thumbnail={ thumbnail }
            router={ history }
            addToCart={ this.addToCart }
          />
        )) : <h1>Nenhum produto foi encontrado</h1>}
      </div>
    );
  }
}

MainPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.string,
      price: PropTypes.number,
      thumbnail: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};

export default MainPage;
