const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 5000;

const FARMS = require('./src/data/FarmData.js');

let farmsArray = Array.isArray(FARMS) ? FARMS : [];

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/farms', (req, res) => {
    const { search, sort, location } = req.query;

    let filteredFarms = farmsArray;

    if (search) {
        const searchTermLower = search.toLowerCase();
        filteredFarms = filteredFarms.filter(farm => 
            farm.location.toLowerCase().includes(searchTermLower)
        );
    } else if (location && location !== 'Всі регіони') {
        filteredFarms = filteredFarms.filter(farm => 
            farm.location.includes(location)
        );
    }
    
    if (sort && filteredFarms.length > 0) { 
        filteredFarms.sort((a, b) => {
            switch (sort) {
                case 'price':
                    const priceA = (a.animalCount * 100 + a.fanPowerWatts * 0.5);
                    const priceB = (b.animalCount * 100 + b.fanPowerWatts * 0.5);
                    return priceA - priceB;
                case 'animals':
                    return a.animalCount - b.animalCount;
                case 'power':
                    return a.fanPowerWatts - b.fanPowerWatts;
                case 'id':
                default:
                    return a.id - b.id;
            }
        });
    }

    res.json(filteredFarms);
});

app.get('/api/farms/:id', (req, res) => {
    const farmId = parseInt(req.params.id);
    const farm = farmsArray.find(f => f.id === farmId);

    if (farm) {
        res.json(farm);
    } else {
        res.status(404).send({ message: "Farm not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});