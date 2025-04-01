import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const { cartItems, updateCart } = useCart();

  useEffect(() => {
    setLoading(false);
  }, [cartItems]);

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      await updateCart();
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemove(itemId);
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
        quantity: newQuantity
      });
      await updateCart();
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId.price * item.quantity), 0
  );

  if (loading) return <div className="spinner-border"></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty</div>
      ) : (
        <>
          <div className="list-group mb-3">
            {cartItems.map(item => (
              <div key={item._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                    <div>
                      <h5 className="mb-1">{item.productId.name}</h5>
                      <p className="mb-1 text-muted">
                      &#8377;{item.productId.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="input-group" style={{ width: '120px' }}>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="form-control text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-body text-end">
              <h4>
                Total: <span className="text-primary">&#8377;{total.toFixed(2)}</span>
              </h4>
              <button className="btn btn-success btn-lg mt-2">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;