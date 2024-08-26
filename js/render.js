function generatePortions(price) {
    let result = '';
    for (let key in price) {
        result += `
                            <div class="card__portion">
                                <p class="portion__name _size1">
                                    Порция <span class="portion__size">${key}</span> — <span class="portion__price">${price[key]}</span>${data.valute}
                                </p>
                                <div class="portion__management">
                                    <button>-</button>
                                    <p>0</p>
                                    <button>+</button>
                                </div>
                            </div>
        `;
    };
    return result;
};

for (let i = 0; i < Object.keys(dishesData).length; i++) {
    const el = Object.keys(dishesData)[i];
    let section = document.createElement('section');
    section.classList.add('dishes__section');
    section.id = el;
    section.innerHTML = `<h2>${dishesData[el].name[data.language]}</h2>`;
    let dishesList = document.createElement('div');
    dishesList.classList.add('dishes__list');


    for (let j = 0; j < dishesData[el].items.length; j++) {
        const item = dishesData[el].items[j];
        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <div class="card__img">
            ${/*`<img src="./img/menu/${i}/dish${j}.jpg" alt="">`*/ '<img src="./img/menu/dish1.jpg" alt="">'}
        </div>

        <div class="card__content">
            <div class="card__info">
                <h3 class="card__name">${item.name[data.language]}</h3>
                <p class="card__description">${item.description[data.language]}</p>
            </div>

            <div class="card__price">
                ${generatePortions(dishesData[el].items[j].price)}
            </div>
        </div>`;
        dishesList.appendChild(card);
    };


    let link = document.createElement('a');
    link.href = `#.#${el}`;
    link.innerHTML = dishesData[el].name[data.language];

    if (i == 0) {
        link.classList.add('_active');
    };





    section.appendChild(dishesList);
    document.querySelector('.dishes__nav').appendChild(link);
    if (i + 1 < Object.keys(dishesData).length) {
        document.querySelector('.dishes__nav').innerHTML += '|';
    };
    document.querySelector('.dishes').appendChild(section);


};
