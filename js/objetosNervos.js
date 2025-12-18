document.addEventListener('DOMContentLoaded', function() {
    // Seleciona apenas os elementos da PAG6
    const star4 = document.querySelector('#pag6 .star4');
    const star5 = document.querySelector('#pag6 .star5');
    const star10 = document.querySelector('#pag6 .star10');
    const hat3 = document.querySelector('#pag6 .hat3');
    const hat4 = document.querySelector('#pag6 .hat4');
    const hat10 = document.querySelector('#pag6 .hat10');


    // Quando clica na star4, o hat3 aproxima-se
    if (star4 && hat3) {
        star4.addEventListener('click', function() {
            hat3.classList.toggle('proximo');
            star4.classList.toggle('calma');
            console.log('Star4 clicada - Hat3 aproximou-se');
        });
    }

    // Quando clica na star5, o hat4 aproxima-se
    if (star5 && hat4) {
        star5.addEventListener('click', function() {
            hat4.classList.toggle('proximo');
            star5.classList.toggle('calma');
            console.log('Star5 clicada - Hat4 aproximou-se');
        });
    }

    // Quando clica na star10, o hat10 aproxima-se
    if (star10 && hat10) {
        star10.addEventListener('click', function() {
            hat10.classList.toggle('proximo');
            star10.classList.toggle('calma');
            console.log('Star10 clicada - Hat10 aproximou-se');
        });
    }
});