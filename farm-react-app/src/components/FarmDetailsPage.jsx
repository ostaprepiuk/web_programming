import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFarmById } from '../services/api.js'; 
import Loader from './Loader.js';
import { addToCart } from '../redux/cartSlice.js';

const FarmDetailsPage = () => {
    const { id } = useParams();
    const [farm, setFarm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadFarm = async () => {
            setIsLoading(true);
            const farmData = await fetchFarmById(id);
            setFarm(farmData);
            setIsLoading(false);
        };

        if (id) {
            loadFarm();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (farm) {
            dispatch(addToCart(farm));
            alert(`Ферма ${farm.location} додана до кошика!`);
        }
    };

    if (isLoading) {
        return <Loader />;
    }
    
    if (!farm) {
        return (
            <div className="content-wrap" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>404 - Ферму не знайдено</h2>
                <p>Поверніться до <Link to="/catalog">Каталогу</Link>.</p>
            </div>
        );
    }

    const sellingPrice = (farm.animalCount * 100 + farm.fanPowerWatts * 0.5).toFixed(0); 
    const imageUrl = farm.imageUrl || '/images/default.jpg'; 

    return (
        <div className="content-wrap" style={{ padding: '40px', maxWidth: '900px', margin: 'auto' }}>
            <h2 style={{ color: '#007bff' }}>Деталі активу: {farm.location}</h2>
            
            <div className="farm-details-container">
                <img 
                    src={imageUrl} 
                    alt={`Ферма ${farm.location}`} 
                    className="details-image"
                />
                
                <div className="details-content">
                    <p><strong>ID пропозиції:</strong> {farm.id}</p>
                    <p><strong>Місцезнаходження:</strong> {farm.location}</p>
                    <p><strong>Поголів'я/Об'єм:</strong> {farm.animalCount} гол.</p>
                    <p><strong>Потужність обладнання:</strong> {farm.fanPowerWatts} Вт</p>
                    
                    <div className="details-description">
                        <h3>Міні-опис:</h3>
                        <p>{farm.description}</p>
                    </div>

                    <div className="details-price-tag">
                        Загальна Ціна: <span>{sellingPrice} $</span>
                    </div>

                    <button 
                        className="buy-now-btn"
                        onClick={handleAddToCart} 
                    >
                        ДОДАТИ ДО КОШИКА
                    </button>

                    <Link to="/catalog" className="back-btn">← Повернутися до каталогу</Link>
                </div>
            </div>
        </div>
    );
};

export default FarmDetailsPage;