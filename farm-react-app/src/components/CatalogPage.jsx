import React, { useState, useEffect, useCallback } from 'react';
import FarmList from './FarmList.js';
import Loader from './Loader.js';
import { fetchFarms } from '../services/api.js'; 

const CatalogPage = () => {
    const [farms, setFarms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [filterLocation, setFilterLocation] = useState('');

    const uniqueLocations = ['Всі регіони', 'Львівська обл.', 'Київська обл.', 'Одеська обл.', 'Полтавська обл.'];

    const loadFarms = useCallback(async () => {
        setIsLoading(true);
        
        const filters = {
            search: searchTerm,
            sort: sortBy,
            location: filterLocation !== 'Всі регіони' ? filterLocation : undefined,
        };

        try {
            const responseData = await fetchFarms(filters);

            let farmsArray = responseData; 
            
            if (responseData && responseData.farms) {
                farmsArray = responseData.farms; 
            } else if (responseData && responseData.data) {
                farmsArray = responseData.data; 
            }
            
            if (!Array.isArray(farmsArray)) {
                 farmsArray = [];
            }
            
            setFarms(farmsArray);
        } catch (error) {
            setFarms([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, sortBy, filterLocation]);

    useEffect(() => {
        loadFarms();
    }, [loadFarms]); 

    return (
        <>
            <h2 style={{ padding: '20px', color: '#007bff' }}>Каталог: Перелік усіх доступних ферм на продаж</h2>
            
            <div className="filter-panel">
                <input
                    type="text"
                    placeholder="Пошук за регіоном..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select 
                    value={filterLocation} 
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="filter-select"
                >
                    {uniqueLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>

                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="id">Сортувати за: За замовчуванням</option>
                    <option value="price">Сортувати за: Ціною</option>
                    <option value="animals">Сортувати за: Поголів'ям</option>
                    <option value="power">Сортувати за: Потужністю</option>
                </select>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <FarmList farms={farms} />
            )}
            
            {!isLoading && farms.length === 0 && (
                <p style={{textAlign: 'center', padding: '50px'}}>Не знайдено жодної ферми за вашим запитом.</p>
            )}
        </>
    );
};

export default CatalogPage;