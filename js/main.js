import { renderMenu, renderText } from "./render.js";
import { cartData, data, languageData } from "./store.js";

const cartButton = document.querySelector('.nav__cart');
const cart = document.querySelector('.cart');
const navTheme = document.querySelector('.nav__theme');


export function main() {
    renderMenu();
    renderText();
    observeSections();

    const languages = data.languages.map(item => item.trim());
    const currentLanguage = data.language;
    const otherLanguages = languages.filter(lang => lang !== currentLanguage);
    let changeLangDom = document.querySelector('.nav__changeLang')

    if (otherLanguages.length == 1) {
        changeLangDom += `<a href="./menu-${languages[0]}.html">${languages[0].toUpperCase()}</a>`
    } else {
        changeLangDom.innerHTML = otherLanguages.map(lang => `<a href="./menu-${lang}.html">${lang.toUpperCase()}</a>`).join(' | ');
    };

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
};
