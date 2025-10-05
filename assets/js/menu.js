
const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.menu__hamburger');


function toggleMenu() {
    menu.classList.toggle('menu--active');
}


hamburger.addEventListener('click', toggleMenu);


const menuLinks = document.querySelectorAll('.menu__list a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('menu--active');
    });
});


document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && menu.classList.contains('menu--active')) {
        menu.classList.remove('menu--active');
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('menu--active')) {
        menu.classList.remove('menu--active');
    }
});