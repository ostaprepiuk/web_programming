import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const handleToggleContent = () => {
        setIsContentVisible(prev => !prev);
    };
    
    const mainContentStyle = { padding: '40px', textAlign: 'center', maxWidth: '800px', margin: 'auto' };
    
    // Базові стилі для кнопки
    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: isContentVisible ? '#dc3545' : '#007bff', // Червона, коли згортаємо
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginBottom: '20px', // Щоб відштовхнути від наступної секції
    };

    // Стиль для динамічного контенту (для імітації transition, якщо немає CSS)
    const extendedContentStyle = {
        padding: '40px 20px',
        backgroundColor: '#e9ecef',
        margin: '0 auto',
        width: '100%',
        borderRadius: '0',
        transition: 'max-height 0.5s ease, opacity 0.5s ease',
        overflow: 'hidden',
        maxHeight: isContentVisible ? '500px' : '0', // Імітація 'content-visible'
        opacity: isContentVisible ? 1 : 0,
    };
    
    const linkButtonStyle = {
        padding: '12px 25px',
        backgroundColor: '#28a745',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
        display: 'inline-block',
        marginTop: '20px'
    };


    return (
        <div className="content-wrap">
            <div style={mainContentStyle}>
                <h2 style={{color: '#007bff'}}>Ласкаво просимо до AgroInvestUA!</h2>
                <p style={{ margin: '30px auto', fontSize: '1.2em' }}>
                    Ми пропонуємо вам унікальні пропозиції діючих фермерських активів 
                    та земельних ділянок в Україні. Кожна пропозиція містить детальні 
                    характеристики активу та його потенціал.
                </p>
                
                <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                    {/* Примітка: Зображення `/images/farm1.jpg` має існувати у папці public/images */}
                    <img 
                        src="https://via.placeholder.com/800x300?text=Farm+Investment+Opportunity" // Тимчасовий плейсхолдер
                        alt="Фермерський пейзаж" 
                        style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
                
                <button onClick={handleToggleContent} style={buttonStyle}>
                    {isContentVisible ? 'Згорнути інформацію' : 'Переглянути більше інформації'}
                </button>
            </div>

            <div 
                style={extendedContentStyle} // <-- Використовуємо динамічний стиль
            >
                
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Контент відображається завжди, але контролюється maxHeight/opacity */}
                    <>
                        <h3 style={{ color: '#007bff' }}>Наші переваги та особливості</h3>
                        <p style={{ fontSize: '1.1em', marginBottom: '30px' }}>
                            Дізнайтеся більше про те, як ми гарантуємо якість та прозорість угод. 
                            Ми забезпечуємо повну юридичну підтримку та оцінку активів.
                        </p>
                        
                        <Link to="/catalog" style={linkButtonStyle}>
                            Перейти до повного Каталогу
                        </Link>
                    </>
                </div>
            </div>
        </div>
    );
};

export default HomePage;