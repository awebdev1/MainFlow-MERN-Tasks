import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        productId,
        quantity: 1
      });
      await updateCart();
      toast.success('Added to cart!');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product._id} className="col">
            <div className="card h-100 shadow-sm border-0">
              {/* Product Image */}
              <div className="ratio ratio-1x1 bg-light">
                <img 
                  src={product.image} 
                  className="card-img-top p-3" 
                  alt={product.name}
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300?text=Product+Image';
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{product.name}</h5>
                
                {/* Description with read more/less */}
                <div className="card-text text-muted mb-2 line-clamp-3" 
                     style={{ 
                       display: '-webkit-box',
                       WebkitLineClamp: 3,
                       WebkitBoxOrient: 'vertical',
                       overflow: 'hidden'
                     }}>
                  {product.description || 'No description available'}
                </div>

                {/* Price and Stock */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <span className="fs-4 fw-bold text-primary">
                      &#8377;{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="btn btn-primary mt-3 w-100"
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;