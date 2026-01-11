import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="content-wrap" style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Про наш Каталог Ферм</h2>
            <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '1.1em' }}>
                Ми є провідною платформою для продажу сільськогосподарських активів в Україні. 
                Наша місія — забезпечити прозорість та доступність інформації про діючі ферми та їх потенціал.
            </p>
            <p>Дякуємо, що обрали нас!</p>
            <p style={{ marginTop: '30px' }}>
                <Link to="/catalog" style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 'bold' }}>Перейти до каталогу</Link>
            </p>
        </div>
    );
};

export default About;