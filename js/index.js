import { data } from "./store.js"

let table = new URLSearchParams(window.location.search).get('table')
if (table) {
    localStorage.setItem('table', table)
};


document.title = data.name;