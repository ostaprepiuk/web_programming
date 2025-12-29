const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const API_PREFIX = '/farms';

// --- НАЛАШТУВАННЯ MIDDLEWARE ---

// Дозволяє запити з вашого Front-end (замініть на реальний URL, якщо потрібно)
app.use(cors());

// Для парсингу JSON-тіла запитів (POST/PUT)
app.use(bodyParser.json());

// --- ІМІТАЦІЯ БАЗИ ДАНИХ (Дані в пам'яті) ---

let farms = [
    { id: 1, location: "Львів", animals: 25, power: 1200, description: "Спеціалізація на ВРХ та молочній продукції.", lastUpdate: "10:15:00" },
    { id: 2, location: "Тернопіль", animals: 15, power: 900, description: "Ферма для птиці. Екологічно чисте виробництво.", lastUpdate: "10:17:00" },
    { id: 3, location: "Київ", animals: 40, power: 2500, description: "Найбільша ферма. Орієнтація на інноваційне обладнання.", lastUpdate: "10:20:00" },
];
let nextId = farms.length + 1;


// --- CRUD ЕНДПОІНТИ ---

// 1. READ: Отримати всі ферми (GET /farms)
app.get(API_PREFIX, (req, res) => {
    // Відправляємо весь масив даних. Відповідає методу Read.
    console.log(`[GET] Повернуто ${farms.length} записів.`);
    res.json(farms);
});

// 2. READ: Отримати ферму за ID (GET /farms/:id)
app.get(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const farm = farms.find(f => f.id === id);

    if (farm) {
        res.json(farm);
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

// 3. CREATE: Створити нову ферму (POST /farms)
app.post(API_PREFIX, (req, res) => {
    // Отримуємо нові дані з тіла запиту
    const newFarmData = req.body;
    
    // Створюємо новий об'єкт з унікальним ID
    const newFarm = {
        id: nextId++,
        location: newFarmData.location,
        animals: parseInt(newFarmData.animals),
        power: parseInt(newFarmData.power),
        description: newFarmData.description,
        lastUpdate: new Date().toLocaleTimeString('uk-UA')
    };

    // Додаємо до нашої "бази даних"
    farms.push(newFarm);
    console.log(`[POST] Створено нову ферму: ID ${newFarm.id}`);
    
    // Відповідаємо статусом 201 (Created) та повертаємо створений об'єкт
    res.status(201).json(newFarm); 
});

// 4. UPDATE: Оновити існуючу ферму (PUT /farms/:id)
app.put(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const farmIndex = farms.findIndex(f => f.id === id);

    if (farmIndex !== -1) {
        // Оновлюємо об'єкт у масиві
        farms[farmIndex] = {
            ...farms[farmIndex], // Зберігаємо старі поля, якщо вони не передані
            ...updatedData,
            id: id, // Забезпечуємо, що ID залишається незмінним
            animals: parseInt(updatedData.animals),
            power: parseInt(updatedData.power),
            lastUpdate: new Date().toLocaleTimeString('uk-UA')
        };
        console.log(`[PUT] Оновлено ферму: ID ${id}`);
        // Повертаємо оновлений об'єкт
        res.json(farms[farmIndex]); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

// 5. DELETE: Видалити ферму (DELETE /farms/:id)
app.delete(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = farms.length;
    
    // Фільтруємо масив, залишаючи лише ті ферми, ID яких не збігається з тим, що видаляється
    farms = farms.filter(f => f.id !== id);

    if (farms.length < initialLength) {
        console.log(`[DELETE] Видалено ферму: ID ${id}`);
        // Відповідаємо статусом 204 (No Content)
        res.status(204).send(); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});


// --- ЗАПУСК СЕРВЕРА ---

app.listen(PORT, () => {
    console.log(`Сервер Node.js API запущено на порті ${PORT}.`);
    console.log(`API доступне за адресою: http://localhost:${PORT}${API_PREFIX}`);
});