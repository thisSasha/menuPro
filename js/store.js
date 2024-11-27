export let data = {
    valute: '$',
    language: document.documentElement.lang,
    name: 'Shakespeare'
};


export let languageData = {
    ru: {
        'title': 'Меню | ' + data.name,
        '#menuTitle': 'Меню',
        '#orderTitle': 'Ваш заказ',
        '#callOfficiant': 'Вызвать официанта',
        '#sendMenu': 'Отправить заказ',
        '#sureCall': 'Вы уверены в вызове официанта?',
        '#popup_order__confirm': 'Да',
        '#popup_order__cancel': 'Отмена',
        '.popup__button_ok': 'Да',
        '.popup__button_cancel': 'Отмена',
        '#surePortions': 'Вы хотите удалить эту порцию?',
        'forJs': {
            total: 'Итого',
            canceled: 'Отменено',
            portion: 'Порция',
            count: 'Количество',
            sureOrder: 'Вы уверены в отправке заказа?',
        },
    },
    en: {
        'title': 'Menu | ' + data.name,
        '#menuTitle': 'Menu',
        '#orderTitle': 'Your Order',
        '#callOfficiant': 'Call the waiter',
        '#sendMenu': 'Send Order',
        '#sureCall': 'Are you sure you want to call the waiter?',
        '#popup_order__confirm': 'Yes',
        '#popup_order__cancel': 'Cancel',
        '.popup__button_ok': 'Yes',
        '.popup__button_cancel': 'Cancel',
        '#surePortions': 'Do you want to remove this portion?',
        'forJs': {
            total: 'Total',
            canceled: 'Cancelled',
            portion: 'Portion',
            count: 'Count',
            sureOrder: 'Are you sure you want to send the order?',
        },
    },
    de: {
        'title': 'Menü | ' + data.name,
        '#menuTitle': 'Menü',
        '#orderTitle': 'Ihre Bestellung',
        '#callOfficiant': 'Kellner rufen',
        '#sendMenu': 'Bestellung senden',
        '#sureCall': 'Sind Sie sicher, dass Sie den Kellner rufen möchten?',
        '#popup_order__confirm': 'Ja',
        '#popup_order__cancel': 'Abbrechen',
        '.popup__button_ok': 'Ja',
        '.popup__button_cancel': 'Abbrechen',
        '#surePortions': 'Möchten Sie diese Portion entfernen?',
        'forJs': {
            total: 'Gesamt',
            canceled: 'Abgebrochen',
            portion: 'Portion',
            count: 'Anzahl',
            sureOrder: 'Sind Sie sicher, dass Sie die Bestellung senden möchten?',
        },
    },
};




export let dishesData = {
    'category1': {
        name: {
            ru: 'Основные блюда',
            en: 'Main dishes',
            de: 'Hauptgericht',
        },
        items: [
            {
                name: {
                    ru: 'Молочный суп',
                    en: 'Milk soup',
                    de: 'Milchsuppe',
                },
                price: {
                    1: 2,
                    2: 5,
                    3: 52,
                },
                description: {
                    ru: 'Он очень молочный',
                    en: 'It is very milk',
                    de: 'Es ist sehr Milch',
                },
            },
            {
                name: {
                    ru: 'Говядина с овощами',
                    en: 'Beef with vegetables',
                    de: 'Rindfleisch mit Gemüse',
                },
                price: {
                    1: 10,
                    2: 20,
                },
                description: {
                    ru: 'Нежная говядина с гарниром из овощей.',
                    en: 'Tender beef with vegetable garnish.',
                    de: 'Zartes Rindfleisch mit Gemüsegarnitur.',
                },
            },
            {
                name: {
                    ru: 'Картофельное пюре',
                    en: 'Mashed potatoes',
                    de: 'Kartoffelpüree',
                },
                price: {
                    1: 3,
                    2: 6,
                },
                description: {
                    ru: 'Классическое картофельное пюре с маслом.',
                    en: 'Classic mashed potatoes with butter.',
                    de: 'Klassisches Kartoffelpüree mit Butter.',
                },
            },
            {
                name: {
                    ru: 'Рыба в кляре',
                    en: 'Battered fish',
                    de: 'Fisch im Teig',
                },
                price: {
                    1: 8,
                    2: 16,
                },
                description: {
                    ru: 'Золотистая рыба в хрустящем кляре.',
                    en: 'Golden fish in crispy batter.',
                    de: 'Goldener Fisch im knusprigen Teig.',
                },
            },
        ],
    },
    'category2': {
        name: {
            ru: 'Супы',
            en: 'Soups',
            de: 'Suppen',
        },
        items: [
            {
                name: {
                    ru: 'Томатный суп',
                    en: 'Tomato soup',
                    de: 'Tomatensuppe',
                },
                price: {
                    1: 4,
                    2: 8,
                },
                description: {
                    ru: 'Свежий томатный суп с базиликом.',
                    en: 'Fresh tomato soup with basil.',
                    de: 'Frische Tomatensuppe mit Basilikum.',
                },
            },
            {
                name: {
                    ru: 'Куриный бульон',
                    en: 'Chicken broth',
                    de: 'Hühnerbrühe',
                },
                price: {
                    1: 3,
                    2: 7,
                },
                description: {
                    ru: 'Легкий куриный бульон с зеленью.',
                    en: 'Light chicken broth with herbs.',
                    de: 'Leichte Hühnerbrühe mit Kräutern.',
                },
            },
            {
                name: {
                    ru: 'Грибной крем-суп',
                    en: 'Mushroom cream soup',
                    de: 'Pilzcremesuppe',
                },
                price: {
                    1: 5,
                    2: 10,
                },
                description: {
                    ru: 'Нежный крем-суп из лесных грибов.',
                    en: 'Tender cream soup made from forest mushrooms.',
                    de: 'Zarte Cremesuppe aus Waldpilzen.',
                },
            },
            {
                name: {
                    ru: 'Суп из чечевицы',
                    en: 'Lentil soup',
                    de: 'Linsensuppe',
                },
                price: {
                    1: 4,
                    2: 9,
                },
                description: {
                    ru: 'Питательный суп из красной чечевицы.',
                    en: 'Hearty soup made from red lentils.',
                    de: 'Herzhafte Suppe aus roten Linsen.',
                },
            },
        ],
    },
    'category3': {
        name: {
            ru: 'Десерты',
            en: 'Desserts',
            de: 'Nachspeisen',
        },
        items: [
            {
                name: {
                    ru: 'Шоколадный торт',
                    en: 'Chocolate cake',
                    de: 'Schokoladenkuchen',
                },
                price: {
                    1: 6,
                    2: 12,
                },
                description: {
                    ru: 'Влажный шоколадный торт с ганашем.',
                    en: 'Moist chocolate cake with ganache.',
                    de: 'Feuchter Schokoladenkuchen mit Ganache.',
                },
            },
            {
                name: {
                    ru: 'Тирамису',
                    en: 'Tiramisu',
                    de: 'Tiramisu',
                },
                price: {
                    1: 5,
                    2: 10,
                },
                description: {
                    ru: 'Классический итальянский десерт с маскарпоне.',
                    en: 'Classic Italian dessert with mascarpone.',
                    de: 'Klassisches italienisches Dessert mit Mascarpone.',
                },
            },
            {
                name: {
                    ru: 'Ягодный пирог',
                    en: 'Berry pie',
                    de: 'Beerenkuchen',
                },
                price: {
                    1: 4,
                    2: 8,
                },
                description: {
                    ru: 'Домашний пирог с лесными ягодами.',
                    en: 'Homemade pie with forest berries.',
                    de: 'Hausgemachter Kuchen mit Waldbeeren.',
                },
            },
            {
                name: {
                    ru: 'Мороженое',
                    en: 'Ice cream',
                    de: 'Eiscreme',
                },
                price: {
                    1: 3,
                    2: 6,
                },
                description: {
                    ru: 'Пломбир с клубникой.',
                    en: 'Vanilla ice cream with strawberries.',
                    de: 'Vanilleeis mit Erdbeeren.',
                },
            },
        ],
    },
};


export let setDishesData = function (newData) {
    dishesData = newData;
};

export let getDishesData = function () {
    return dishesData;
};

export let cartData = {
    
};



export function setCartData(newData) {
    cartData = newData;
};