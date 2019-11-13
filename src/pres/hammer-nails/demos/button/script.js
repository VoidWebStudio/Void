document.querySelector('.button').addEventListener('keyup', (event) => {
    if (event.key == ' ') {
        event.preventDefault();
        event.target.innerText = 'Пыщь!';
    }
});