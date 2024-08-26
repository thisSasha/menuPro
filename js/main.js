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

        document.querySelectorAll('.dishes__nav > a').forEach((el) => {
            el.classList.remove('_active');
        });

        el.classList.add('_active');
        

        document.querySelector(el.href.split('#.')[1]).scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    });

});