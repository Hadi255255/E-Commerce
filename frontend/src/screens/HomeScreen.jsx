import { useEffect, useReducer, useRef, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import logger from 'use-reducer-logger';
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FECTCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FECTCH_SUCCESS':
//       return { ...state, products: action.payload, loading: false };
//     case 'FECTCH_FAIL':
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

const HomeScreen = () => {
  // const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
  //   products: [],
  //   loading: true,
  //   error: '',
  // });
  const [products, setProduts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const one = useRef(true);
  useEffect(() => {
    if (one.current) {
      one.current = false;
      const url = 'http://localhost:5000/api/products';
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
      const fetchData = async () => {
        // dispatch({ type: 'FECTCH_REQUEST' });
        setLoading(true);
        const result = await axios
          .get(url, config)
          .then((pro) => {
            // dispatch({ type: 'FECTCH_SUCCESS', payload: pro.data });
            setProduts(pro.data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            console.log(error);
            // dispatch({ type: 'FECTCH_FAIL', payload: error.message });
          });
      };
      fetchData();
    }
  }, [products.length]);

  return (
    <div>
      <h1>Features Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product, i) => (
            <div key={i} className="product">
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product_info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
