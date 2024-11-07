import { main } from "./main.js";
import { setDishesData } from "./store.js";

let api = "https://script.google.com/macros/s/AKfycbzQO98Ddw4JUXQpy036Axst0n9y-h3S3xEanj-V5k0egpsvOf7jGI5_KqlQuVu02fqR/exec";

function fetchDishesList() {
    return fetch(api)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            processData(data);
            document.getElementById('mainNav').classList.remove('hidden');
            document.querySelector('main.dishes').classList.remove('hidden');
            document.querySelector('section.cart').classList.remove('hidden');
            const loadingPlaceholder = document.getElementById('loadingPlaceholder');
            if (loadingPlaceholder) {
                loadingPlaceholder.remove();
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            const loadingPlaceholder = document.getElementById('loadingPlaceholder');
            if (loadingPlaceholder) {
                loadingPlaceholder.textContent = 'Ошибка загрузки меню. Пожалуйста, попробуйте позже.';
            }
        });
}

fetchDishesList();

function processData(data) {
    const keys = data[0];
    const objectsArray = data.slice(1).map(row => {
        let obj = {};
        row.forEach((value, index) => {
            obj[keys[index]] = value;
        });
        return obj;
    });

    const dishData = {};
    objectsArray.forEach(item => {
        const categoryKey = item['category-en'].split(' ').join('_');

        if (!dishData[categoryKey]) {
            dishData[categoryKey] = {
                name: {
                    ru: item['category-ru'],
                    en: item['category-en'],
                    de: item['category-de'],
                },
                items: [],
            };
        }

        const dish = {
            name: {
                ru: item['name-ru'],
                en: item['name-en'],
                de: item['name-de'],
            },
            price: {},
            description: {
                ru: item['description-ru'],
                en: item['description-en'],
                de: item['description-de'],
            },
        };

        for (let i = 1; i <= 3; i++) {
            const portionKey = `porirtion${i}`;
            const priceKey = `price${i}`;
            const portion = item[portionKey];
            const price = item[priceKey];

            if (portion && price) {
                dish.price[portion] = parseFloat(price);
            }
        }
        dishData[categoryKey].items.push(dish);
    });

    setDishesData(dishData);
    main();
}
