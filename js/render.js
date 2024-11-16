import { data, cartData, languageData, getDishesData } from "./store.js";

let dishesData = getDishesData();

export function renderMenu() {
    dishesData = getDishesData();
    const dishesContainer = document.querySelector('.dishes');
    const navContainer = document.querySelector('.dishes__nav');
    navContainer.innerHTML = '';

    Object.keys(dishesData).forEach(categoryKey => {
        const category = dishesData[categoryKey];
        const navLink = document.createElement('a');
        navLink.href = `#${categoryKey}`;
        navLink.textContent = category.name[data.language];
        navLink.classList.add('dishes__link');
        navLink.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.dishes__link').forEach(link => link.classList.remove('_active'));
            navLink.classList.add('_active');
            document.querySelector(`#${categoryKey}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        navContainer.appendChild(navLink);

        const section = document.createElement('section');
        section.classList.add('section');
        section.id = categoryKey;
        section.innerHTML = `<h2>${category.name[data.language]}</h2>`;

        const dishesList = document.createElement('div');
        dishesList.classList.add('section__list');

        category.items.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card', `card-num_${index}`, `${categoryKey}-${index}`);
            card.id = `dish-${index}`;

            if (cartData[categoryKey]) {
                const cartItem = cartData[categoryKey].items.find(ci => ci.name[data.language] === item.name[data.language]);
                if (cartItem && Object.values(cartItem.count).some(cnt => cnt > 0)) {
                    card.classList.add('_inCart');
                };
            };
            card.innerHTML = `
                <div class="card__img">
                    <img src="${item.img}" alt="">
                </div>
                <div class="card__content">
                    <div class="card__info">
                        <h3 class="card__name">${item.name[data.language]}</h3>
                        <p class="card__description">${item.description[data.language]}</p>
                    </div>
                    <div class="card__price">
                        ${Object.keys(item.price).map(key => {
                            let value = 0;
                            if (cartData[categoryKey]) {
                                const cartItem = cartData[categoryKey].items.find(ci => ci.name[data.language] === item.name[data.language]);
                                if (cartItem && cartItem.count[key]) {
                                    value = cartItem.count[key];
                                };
                            };
                            return `
                                <div class="card__portion">
                                    <p class="portion__name">${languageData[data.language].forJs.portion} <span class="portion__size">${key}</span> — <span class="portion__price">${item.price[key]}</span>$</p>
                                    <div class="portion__management">
                                        <button class="portion__remove" data-category="${categoryKey}" data-index="${index}" data-size="${key}">-</button> 
                                        <input type="number" disabled id="_input-${categoryKey}-${index}-${key}" class="portion__count size-${key}" data-category="${categoryKey}" data-index="${index}" data-size="${key}" value="${value}">
                                        <button class="portion__add" data-category="${categoryKey}" data-index="${index}" data-size="${key}">+</button> 
                                    </div>
                                </div>`;
                        }).join('')}
                    </div>
                </div>`;

            const addButtons = card.querySelectorAll('.portion__add');
            const removeButtons = card.querySelectorAll('.portion__remove');

            addButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    const index = button.getAttribute('data-index');
                    const dishData = dishesData[category].items[index];
                    dishData.index = index;
                    const portionName = button.getAttribute('data-size');
                    updateMenu(category, dishData, index, portionName, 'add');
                });
            });

            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    const index = button.getAttribute('data-index');
                    const dishData = dishesData[category].items[index];
                    dishData.index = index;
                    const portionName = button.getAttribute('data-size');
                    const input = document.querySelector(`input[data-category="${category}"][data-index="${index}"][data-size="${portionName}"]`);
                    const currentValue = parseInt(input.value, 10) || 0;
                    updateMenu(category, dishData, index, portionName, 'remove');
                });
            });

            dishesList.appendChild(card);
        });

        section.appendChild(dishesList);
        dishesContainer.appendChild(section);
    });

    const firstNavLink = navContainer.querySelector('.dishes__link');
    if (firstNavLink) {
        firstNavLink.classList.add('_active');
    };
};

function updateMenu(categoryName, dishData, index, portionName, action) {
    if (!cartData[categoryName]) {
        cartData[categoryName] = { items: [], name: dishesData[categoryName].name };
    };
    const input = document.querySelector(`input[data-category="${categoryName}"][data-index="${index}"][data-size="${portionName}"]`);
    const cardDom = input.parentNode.parentNode.parentNode.parentNode.parentNode;
    let cartItem = cartData[categoryName].items.find(item => item.name[data.language] === dishData.name[data.language]);

    if (!cartItem && action === 'add') {
        cartItem = { ...dishData, count: {}, index };
        cartData[categoryName].items.push(cartItem);
    };

    if (cartItem) {
        if (!cartItem.count[portionName]) {
            cartItem.count[portionName] = 0;
        };

        if (action === 'add') {
            cartItem.count[portionName] += 1;
        } else if (action === 'remove' && cartItem.count[portionName] > 0) {
            cartItem.count[portionName] -= 1;
            if (cartItem.count[portionName] <= 0) {
                delete cartItem.count[portionName];
            };
        };

        if (Object.keys(cartItem.count).length === 0) {
            cartData[categoryName].items = cartData[categoryName].items.filter(item => item.name[data.language] !== cartItem.name[data.language]);
        };
    };

    if (cartData[categoryName] && cartData[categoryName].items.length === 0) {
        delete cartData[categoryName];
    };

    if (input) {
        const value = cartItem && cartItem.count[portionName] ? cartItem.count[portionName] : 0;
        input.value = value;
    };

    const card = document.querySelector(`.${categoryName}-${index}`);
    if (card) {
        if (cartData[categoryName] && cartData[categoryName].items.some(item => item.name[data.language] === dishData.name[data.language])) {
            card.classList.add('_inCart');
        } else {
            card.classList.remove('_inCart');
        };
    };

    renderCart();
};

function showConfirmationPopup(onConfirm) {
    const popup = document.querySelector('.popup_sure');
    popup.classList.add('_active');

    const okButton = popup.querySelector('.popup__button_ok');
    const cancelButton = popup.querySelector('.popup__button_cancel');

    const confirmHandler = () => {
        popup.classList.remove('_active');
        okButton.removeEventListener('click', confirmHandler);
        cancelButton.removeEventListener('click', cancelHandler);
        onConfirm();
    };

    const cancelHandler = () => {
        popup.classList.remove('_active');
        okButton.removeEventListener('click', confirmHandler);
        cancelButton.removeEventListener('click', cancelHandler);
    };

    okButton.addEventListener('click', confirmHandler);
    cancelButton.addEventListener('click', cancelHandler);
};

export function renderCart() {
    const cartList = document.querySelector('.cart__list');
    cartList.innerHTML = '';

    Object.keys(cartData).forEach(categoryKey => {
        const category = cartData[categoryKey];
        const categorySection = document.createElement('section');
        categorySection.classList.add('section');
        categorySection.id = categoryKey;

        const header = document.createElement('h2');
        header.textContent = category.name[data.language];

        const itemsList = document.createElement('div');
        itemsList.classList.add('section__list');

        category.items.forEach(item => {
            const itemIndex = item.index;
            const itemCard = document.createElement('div');
            itemCard.classList.add('card', `card-num_${itemIndex}`, `${categoryKey}-${itemIndex}`);
            itemCard.id = `dish-${itemIndex}`;

            const portions = Object.keys(item.price).filter(key => item.count[key] && item.count[key] > 0);

            if (portions.length > 0) {
                itemCard.innerHTML = `
                    <div class="card__img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="card__content">
                        <div class="card__info">
                            <h3 class="card__name">${item.name[data.language]}</h3>
                            <p class="card__description">${item.description[data.language]}</p>
                        </div>
                        <div class="card__price">
                            ${portions.map(key => `
                                <div class="card__portion">
                                    <p class="portion__name">${languageData[data.language].forJs.portion} <span class="portion__size">${key}</span> — <span class="portion__price">${item.price[key]}</span>$</p>
                                    <div class="portion__management">
                                        <button class="portion__remove" data-category="${categoryKey}" data-index="${itemIndex}" data-size="${key}">-</button> 
                                        <input type="number" disabled class="portion__count size-${key}" data-category="${categoryKey}" data-index="${itemIndex}" data-size="${key}" value="${item.count[key]}">
                                        <button class="portion__add" data-category="${categoryKey}" data-index="${itemIndex}" data-size="${key}">+</button> 
                                    </div>
                                </div>`).join('')}
                        </div>
                    </div>`;

                const addButtons = itemCard.querySelectorAll('.portion__add');
                const removeButtons = itemCard.querySelectorAll('.portion__remove');

                addButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const category = button.getAttribute('data-category');
                        const index = button.getAttribute('data-index');
                        const dishData = dishesData[category].items[index];
                        dishData.index = index;
                        const portionName = button.getAttribute('data-size');
                        updateMenu(category, dishData, index, portionName, 'add');
                    });
                });

                removeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const category = button.getAttribute('data-category');
                        const index = button.getAttribute('data-index');
                        const dishData = dishesData[category].items[index];
                        dishData.index = index;
                        const portionName = button.getAttribute('data-size');
                        const input = document.querySelector(`input[data-category="${category}"][data-index="${index}"][data-size="${portionName}"]`);
                        const currentValue = parseInt(input.value, 10) || 0;
                        if (currentValue === 1) {
                            showConfirmationPopup(() => {
                                updateMenu(category, dishData, index, portionName, 'remove');
                            });
                        } else {
                            updateMenu(category, dishData, index, portionName, 'remove');
                        };
                    });
                });

                itemsList.appendChild(itemCard);
            };
        });

        if (itemsList.childElementCount > 0) {
            categorySection.appendChild(header);
            categorySection.appendChild(itemsList);
            cartList.appendChild(categorySection);
        };
    });

    const totalPrice = calculateTotalPrice();
    const totalElement = document.createElement('div');
    totalElement.classList.add('cart__total');
    totalElement.innerHTML = `<h2>${languageData[data.language]['forJs'].total} ${totalPrice}${data.valute}</h2>`;
    cartList.appendChild(totalElement);
};

function calculateTotalPrice() {
    return Object.keys(cartData).reduce((total, categoryKey) => {
        return total + cartData[categoryKey].items.reduce((sum, item) => {
            return sum + Object.keys(item.price).reduce((subTotal, size) => {
                const count = item.count[size] || 0;
                return subTotal + item.price[size] * count;
            }, 0);
        }, 0);
    }, 0);
};

export function renderText() {
    Object.keys(languageData[data.language]).forEach(el => {
        if (el !== 'forJs') {
            const element = document.querySelector(el);
            if (element) {
                element.innerHTML = languageData[data.language][el];
            };
        };
    });
};
