import { renderMenu, renderText } from "./render.js";
import { sendBot } from './telegram.js';
import { additData } from './syncGoogleSheets.js';
import { cartData } from "./store.js";

const cartButton = document.querySelector('.nav__cart');
const cart = document.querySelector('.cart');
const navTheme = document.querySelector('.nav__theme');
const callButton = document.querySelector('#callOfficiant');
const sendMenu = document.querySelector('#sendMenu')
const callPopup = document.querySelector('.popup_order');

export function main() {
    renderMenu();
    renderText();
    observeSections();
};

window.addEventListener('scroll', observeSections);

function observeSections() {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.dishes__link');
    let closestSection = null;
    let closestDistance = Infinity;

    if (!sections.length || !links.length) return;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
        };
    });

    if (closestSection) {
        links.forEach(link => link.classList.remove('_active'));
        const activeLink = document.querySelector(`.dishes__link[href="#${closestSection.id}"]`);
        if (activeLink) activeLink.classList.add('_active');
    };
};

cartButton.onclick = () => {
    cartButton.classList.toggle('_active');
    cart.classList.toggle('_active');
    document.body.classList.toggle('_whenCart');
};

navTheme.onclick = () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
};

let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.body.classList.add(`${theme}-theme`);

if (theme !== 'light' && theme !== 'dark') {
    document.body.classList.add('light-theme');
};

let initDistance = null;

window.onscroll = () => {
    const dishesNav = document.querySelector('.dishes__nav');
    const nav = document.querySelector('nav');
    if (dishesNav && nav) {
        const adjustedDistance = dishesNav.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight;
        if (initDistance === null) initDistance = adjustedDistance;
        dishesNav.classList.toggle('_fullwidth', initDistance < adjustedDistance);
    };
};

callButton.onclick = () => {
    sendBot(`Стол N${localStorage.getItem('table')} зовёт официанта.`);
    callPopup.classList.add('_active');
    document.querySelector('#popup_order__cancel').onclick = function () {
        let oldCallPopup = callPopup.querySelector('p').innerHTML;
        callPopup.querySelector('p').innerHTML = 'Отменено';
        sendBot(`Стол N${localStorage.getItem('table')} отменил вызов официанта.`);
        setTimeout(() => {
            callPopup.classList.remove('_active');
            callPopup.querySelector('p').innerHTML = oldCallPopup;
        }, 1300);
    };
};




function initializeMenuTheme() {
    // Применяем фон только для страниц меню
    document.body.style.backgroundImage = `url(${additData.bg.menu})`;
    
    // Создаем CSS для обеих тем
    const lightThemeCSS = createThemeCSS(additData.colors.lightTheme);
    const darkThemeCSS = createThemeCSS(additData.colors.darkTheme);

    // Добавляем стили в head
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .light-theme {
            ${lightThemeCSS}
        }
        
        .dark-theme {
            ${darkThemeCSS}
        }
    `;
    document.head.appendChild(styleElement);
}

function createThemeCSS(theme) {
    return Object.entries(theme)
        .map(([key, value]) => `--${key}: ${value};`)
        .join('\n');
}

document.addEventListener('DOMContentLoaded', initializeMenuTheme);


sendMenu.onclick = function () {
    let formattedCart = Object.entries(cartData).map(([category, categoryData]) => {
        // Получаем название категории на русском языке
        const categoryName = categoryData.name.ru;
        
        // Форматируем каждый товар в категории
        const items = categoryData.items
            .filter(item => item.count) // Фильтруем только товары с count
            .map((item, index) => {
                const itemName = item.name.ru;
                const sizes = Object.entries(item.count)
                    .map(([size, count]) => `    ${size} - ${count}`)
                    .join('\n');
                return ` ${index + 1}. ${itemName}\n${sizes}`;
            })
            .join('\n');

        return `${categoryName}:\n${items}`;
    }).join('\n\n');


    sendBot(`
Стол: ${localStorage.getItem('table')}
Язык: ${navigator.language}

${formattedCart}
    `);
    let oldCallPopup = callPopup.querySelector('p').innerHTML;
    callPopup.querySelector('p').innerHTML = 'Ваш заказ отправлен';
    callPopup.classList.add('_active');
    document.querySelector('#popup_order__cancel').onclick = function () {
        callPopup.querySelector('p').innerHTML = 'Отменено';
        sendBot(`Стол N${localStorage.getItem('table')} отменил свой заказ.`);
        setTimeout(() => {
            callPopup.classList.remove('_active');
            callPopup.querySelector('p').innerHTML = oldCallPopup;
        }, 1300);
    };
};