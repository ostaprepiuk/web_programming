import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
    const cartItems = useSelector(state => state.cart); 
    const dispatch = useDispatch();

    const calculateItemPrice = (item) => {
        return (item.animalCount * 100 + item.fanPowerWatts * 0.5).toFixed(0);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(calculateItemPrice(item));
            return total + price * item.quantity;
        }, 0).toFixed(0);
    };

    if (cartItems.length === 0) {
        return <h2 style={{ padding: '50px', textAlign: 'center' }}>Ваш кошик порожній.</h2>;
    }

    return (
        <div className="cart-page" style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
            <h2 style={{ color: '#007bff', marginBottom: '30px' }}>Ваш Кошик</h2>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3>Ферма ID: {item.id} ({item.location})</h3>
                        <p>Ціна за одиницю: {calculateItemPrice(item)} $</p>
                        <p>Кількість: {item.quantity}</p>
                    </div>
                    <div className="cart-actions" style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ padding: '5px 10px' }} onClick={() => dispatch(removeFromCart(item.id))}>-</button>
                        <button style={{ padding: '5px 10px' }} onClick={() => dispatch(addToCart(item))}>+</button>
                    </div>
                </div>
            ))}

            <h3 style={{ marginTop: '40px', textAlign: 'right', borderTop: '2px solid #007bff', paddingTop: '15px' }}>
                Загальна вартість: {calculateTotal()} $
            </h3>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <button 
                        style={{ 
                            padding: '15px 30px', 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}
                    >
                        ОФОРМИТИ ЗАМОВЛЕННЯ
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default Cart;