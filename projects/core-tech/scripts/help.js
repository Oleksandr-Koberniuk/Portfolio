if (JSON.parse(localStorage.getItem('help-form'))) {
    document.querySelector('.form-submit-message').style.display = 'block';
    localStorage.setItem('help-form', JSON.stringify(false));
}

document.querySelector('.js-help-form').addEventListener('submit', () => {
    localStorage.setItem('help-form', JSON.stringify(true));
});

document.querySelector('.js-close-message').addEventListener('click', () => {
    document.querySelector('.form-submit-message').style.display = 'none';
});

document.querySelector('.js-menu-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.add('menu-container-active');
});

document.querySelector('.js-cross-icon').addEventListener('click', () => {
    document.querySelector('.js-menu-container').classList.remove('menu-container-active');
});