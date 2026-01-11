import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2 style={{ color: '#28a745', marginBottom: '20px' }}>Замовлення Успішно Оформлено!</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                Дякуємо за ваше замовлення. Ми зв'яжемося з вами найближчим часом для уточнення деталей доставки.
            </p>
            <Link 
                to="/catalog" 
                style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    textDecoration: 'none', 
                    borderRadius: '5px' 
                }}>
                Повернутися до Каталогу
            </Link>
        </div>
    );
};

export default SuccessPage;