import { data } from "./store.js"
import { additData } from './syncGoogleSheets.js';

let table = new URLSearchParams(window.location.search).get('table')
if (table) {
    localStorage.setItem('table', table)
};


document.title = data.name;

function initializeIndexTheme() {
    // Применяем фон только для главной страницы
    document.body.style.backgroundImage = `url(${additData.bg.main})`;
    
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

document.addEventListener('DOMContentLoaded', initializeIndexTheme);