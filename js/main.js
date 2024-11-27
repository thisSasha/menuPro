import { renderMenu, renderText } from "./render.js";
import { sendBot } from './telegram.js';
import { additData } from './syncGoogleSheets.js';
import { cartData, data, languageData } from "./store.js";

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
if (window.location.pathname.includes('menu')) {
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
        callPopup.classList.add('_active');
        document.querySelector('#popup_order__cancel').onclick = function () {
            callPopup.classList.remove('_active');
        };
        document.querySelector('#popup_order__confirm').onclick = function () {
            sendBot(`Стол N${localStorage.getItem('table')} зовёт официанта.`);
            this.parentNode.parentNode.classList.remove('_active')
        };
    };





    sendMenu.onclick = function () {
        let formattedCart = Object.entries(cartData).map(([category, categoryData]) => {
            const categoryName = categoryData.name.ru;

            const items = categoryData.items
                .filter(item => item.count)
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



        let oldCallPopup = callPopup.querySelector('p').innerHTML;
        callPopup.querySelector('p').innerHTML = languageData[data.language].forJs.sureOrder;
        callPopup.classList.add('_active');
        document.querySelector('#popup_order__cancel').onclick = function () {
            callButton.disabled = true;
            callPopup.querySelector('p').innerHTML = languageData[data.language].forJs.canceled;
            setTimeout(() => {
                callButton.disabled = false;
                callPopup.classList.remove('_active');
                callPopup.querySelector('p').innerHTML = oldCallPopup;
            }, 1300);
        };
        document.querySelector('#popup_order__confirm').onclick = function () {
            sendBot(`
Стол: ${localStorage.getItem('table')}
Язык: ${data.language}

${formattedCart}`);
            callPopup.classList.remove('_active');
            callPopup.querySelector('p').innerHTML = oldCallPopup;
        };
    };
};