// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// });

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });

});