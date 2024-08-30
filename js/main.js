import './store.js'

const dishesNav = document.querySelector('.dishes__nav');
window.addEventListener('scroll', () => {
    const rectTop = dishesNav.getBoundingClientRect().top;

    if (rectTop <= 50) {
        dishesNav.classList.add('_fullwidth');
    } else {
        dishesNav.classList.remove('_fullwidth');
    };
});


document.querySelectorAll('.dishes__nav > a').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelectorAll('.dishes__nav > a').forEach((elem) => {
            elem.classList.remove('_active');
        });
        
        el.classList.add('_active');
        

        document.querySelector(el.href.split('#.')[1]).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    });

});


function closestCard() {
    const cards = document.querySelectorAll('section');
    let closest = null;
    let closestDistance = Infinity;

    cards.forEach(card => {
        const distance = Math.abs(card.getBoundingClientRect().top);
        if (distance < closestDistance + 100) {
            closestDistance = distance;
            closest = card;
        };
    });

    return closest;
};

window.addEventListener('scroll', () => {
    const activeLink = document.getElementById('to_' + closestCard().id);

    document.querySelectorAll('.dishes__nav > a').forEach((el) => {
        el.classList.remove('_active');
    });
    
    activeLink.classList.add('_active');
});



document.querySelectorAll('.portion__add').forEach((el) => {
    el.addEventListener('click', (e) => {
        let dishesCount = el.parentNode.childNodes[3];
        dishesCount.innerHTML = parseInt(dishesCount.innerHTML) + 1;
        
    });
});

document.querySelectorAll('.portion__remove').forEach((el) => {
    el.addEventListener('click', (e) => {
        let dishesCount = el.parentNode.childNodes[3];
        if (parseInt(dishesCount.innerHTML) > 0) {
            dishesCount.innerHTML = parseInt(dishesCount.innerHTML) - 1;
        };
         
    });
});
