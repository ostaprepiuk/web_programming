const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const API_PREFIX = '/farms';

app.use(cors());

app.use(bodyParser.json());

let farms = [
    { id: 1, location: "Львів", animals: 25, power: 1200, description: "Спеціалізація на ВРХ та молочній продукції.", lastUpdate: "10:15:00" },
    { id: 2, location: "Тернопіль", animals: 15, power: 900, description: "Ферма для птиці. Екологічно чисте виробництво.", lastUpdate: "10:17:00" },
    { id: 3, location: "Київ", animals: 40, power: 2500, description: "Найбільша ферма. Орієнтація на інноваційне обладнання.", lastUpdate: "10:20:00" },
];
let nextId = farms.length + 1;

app.get(API_PREFIX, (req, res) => {
    console.log(`[GET] Повернуто ${farms.length} записів.`);
    res.json(farms);
});

app.get(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const farm = farms.find(f => f.id === id);

    if (farm) {
        res.json(farm);
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

app.post(API_PREFIX, (req, res) => {
    const newFarmData = req.body;
    
    const newFarm = {
        id: nextId++,
        location: newFarmData.location,
        animals: parseInt(newFarmData.animals),
        power: parseInt(newFarmData.power),
        description: newFarmData.description,
        lastUpdate: new Date().toLocaleTimeString('uk-UA')
    };

    farms.push(newFarm);
    console.log(`[POST] Створено нову ферму: ID ${newFarm.id}`);
    
    res.status(201).json(newFarm); 
});

app.put(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const farmIndex = farms.findIndex(f => f.id === id);

    if (farmIndex !== -1) {
        farms[farmIndex] = {
            ...farms[farmIndex],
            ...updatedData,
            id: id,
            animals: parseInt(updatedData.animals),
            power: parseInt(updatedData.power),
            lastUpdate: new Date().toLocaleTimeString('uk-UA')
        };
        console.log(`[PUT] Оновлено ферму: ID ${id}`);
        res.json(farms[farmIndex]); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

app.delete(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = farms.length;
    
    farms = farms.filter(f => f.id !== id);

    if (farms.length < initialLength) {
        console.log(`[DELETE] Видалено ферму: ID ${id}`);
        res.status(204).send(); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер Node.js API запущено на порті ${PORT}.`);
    console.log(`API доступне за адресою: http://localhost:${PORT}${API_PREFIX}`);
});