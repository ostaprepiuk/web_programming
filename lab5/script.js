const API_URL = 'http://localhost:3000/farms'; 

const cardsContainer = document.querySelector("#cardsContainer");
const searchInputHeader = document.querySelector("#searchInputHeader");
const totalPower = document.querySelector("#totalPower");

const listView = document.querySelector("#listView");
const formView = document.querySelector("#formView");
const formTitle = document.querySelector("#formTitle");

const farmForm = document.querySelector("#farmForm");
const farmIdInput = document.querySelector("#farmId");
const locationInput = document.querySelector("#location");
const animalsInput = document.querySelector("#animals");
const powerInput = document.querySelector("#power");
const descriptionInput = document.querySelector("#description");

let farms = []; 

async function apiCall(method, path = '', body = null) {
    const url = `${API_URL}${path}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(url, options);

        if (response.status === 204) { 
            return null; 
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Помилка API (${response.status}): ${errorData.message || 'Невідома помилка'}`);
        }

        return response.json();

    } catch (error) {
        console.error(`Помилка під час виконання ${method} запиту на ${url}:`, error);
        throw error;
    }
}

async function fetchFarms() {
    try {
        const data = await apiCall('GET');
        return data;
    } catch (error) {
        alert("Помилка підключення до Back-end. Перевірте консоль та запуск server.js.");
        return [];
    }
}

async function saveFarm(e) {
    e.preventDefault();
    
    const id = farmIdInput.value;
    const isUpdating = !!id;

    const farmData = {
        location: locationInput.value,
        animals: parseInt(animalsInput.value),
        power: parseInt(powerInput.value),
        description: descriptionInput.value,
        lastUpdate: new Date().toLocaleTimeString('uk-UA')
    };

    if (!validateForm(farmData)) {
        return;
    }
    
    const path = isUpdating ? `/${id}` : '';
    const method = isUpdating ? 'PUT' : 'POST'; 

    try {
        await apiCall(method, path, farmData);

        alert(`Ферму успішно ${isUpdating ? 'оновлено' : 'додано'}!`); 
        switchView('list'); 

    } catch (error) {
        alert("Помилка збереження даних на сервері. Див. консоль.");
    }
}

async function deleteFarm(id) {
    if (!confirm("Ви впевнені, що хочете видалити цю ферму?")) return;

    try {
        await apiCall('DELETE', `/${id}`);

        alert("Ферму успішно видалено!");
        initializeApp(); 
    } catch (error) {
        alert("Помилка видалення даних на сервері. Див. консоль.");
    }
}

function switchView(viewName) {
    if (viewName === 'list') {
        listView.style.display = 'flex';
        formView.style.display = 'none';
        initializeApp(); 
    } else if (viewName === 'form') {
        listView.style.display = 'none';
        formView.style.display = 'block';
    }
}

function renderCards(data) {
    cardsContainer.innerHTML = "";
    data.forEach(farm => {
        cardsContainer.insertAdjacentHTML("beforeend", `
            <div class="farm-card" data-id="${farm.id}"> 
                <div class="card-image-placeholder">
                    ${farm.animals} Тварин | ${farm.power} Вт
                </div>
                <div class="card-content">
                    <h3>${farm.location}</h3>
                    <p>${farm.description || 'Опис відсутній.'}</p>
                    <p><strong>Оновлення:</strong> ${farm.lastUpdate || 'Невідомо'}</p>
                </div>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${farm.id}">Редагувати</button>
                    <button class="remove-btn" data-id="${farm.id}">Видалити</button>
                </div>
            </div>
        `);
    });
    attachCardListeners();
    updateTotalPower(data);
}

function updateTotalPower(data) {
    const total = data.reduce((sum, f) => sum + f.power, 0);
    totalPower.textContent = `${total} Вт`;
}

async function initializeApp() {
    farms = await fetchFarms(); 
    renderCards(farms);
}

function validateForm(data) {
    if (data.location.length < 2) {
        alert("Помилка: Місцезнаходження має містити щонайменше 2 символи.");
        return false;
    }
    if (data.animals < 1 || data.animals > 1000) {
        alert("Помилка: Кількість тварин має бути від 1 до 1000.");
        return false;
    }
    if (data.power < 100) {
        alert("Помилка: Потужність вентиляторів має бути більше 100 Вт.");
        return false;
    }
    return true;
}

function openCreateForm() {
    farmForm.reset();
    farmIdInput.value = '';
    formTitle.textContent = 'Створити нову ферму';
    switchView('form');
}

function openEditForm(id) {
    const farm = farms.find(f => f.id == id); 
    if (farm) {
        farmIdInput.value = farm.id;
        locationInput.value = farm.location;
        animalsInput.value = farm.animals;
        powerInput.value = farm.power;
        descriptionInput.value = farm.description;
        formTitle.textContent = `Редагувати ферму: ${farm.location}`;
        switchView('form');
    }
}

function attachCardListeners() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.onclick = () => deleteFarm(button.dataset.id);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.onclick = () => openEditForm(button.dataset.id);
    });
}

document.querySelector("#addFarmBtn").addEventListener('click', openCreateForm);
document.querySelector("#viewCreateBtn").addEventListener('click', openCreateForm);
document.querySelector("#viewListBtn").addEventListener('click', () => switchView('list'));

document.querySelector("#cancelFormBtn").addEventListener('click', () => {
    switchView('list');
});

farmForm.addEventListener('submit', saveFarm);

document.querySelector("#searchBtnHeader").addEventListener("click", () => {
    const term = searchInputHeader.value.trim().toLowerCase();
    const filtered = farms.filter(f => f.location.toLowerCase().includes(term));
    renderCards(filtered);
});

document.querySelector("#sortBtn").addEventListener("click", () => {
    const sortBy = document.querySelector("#sortSelect").value;
    farms.sort((a, b) => {
        if (typeof a[sortBy] === "string") {
            return a[sortBy].localeCompare(b[sortBy]);
        }
        return a[sortBy] - b[sortBy];
    });
    renderCards(farms);
});

initializeApp();