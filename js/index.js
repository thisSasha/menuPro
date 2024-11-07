let table = new URLSearchParams(window.location.search).get('table')
if (table) {
    localStorage.setItem('table', table)
};


