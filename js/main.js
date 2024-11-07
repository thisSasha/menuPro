import { renderMenu, renderText } from "./render.js";
import { sendBot } from './telegram.js';

const cartButton = document.querySelector('.nav__cart');
const cart = document.querySelector('.cart');
const navTheme = document.querySelector('.nav__theme');
const callButton = document.querySelector('#callOfficiant');
const callPopup = document.querySelector('.popup_call');

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
};
