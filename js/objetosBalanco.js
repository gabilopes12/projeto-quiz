document.addEventListener('DOMContentLoaded', function() {
    // Seleciona apenas os ícones da página 4
    const icons = document.querySelectorAll('#pag4 .frase-icon');

    // Durações para cada velocidade
    const speeds = {
        1: '4s',
        2: '2s',
        3: '1s'
    };

    icons.forEach(icon => {
        // Inicializa com velocidade 1
        icon.dataset.speed = '1';

        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Cicla entre velocidades 1 -> 2 -> 3 -> 1
            let currentSpeed = parseInt(this.dataset.speed);
            let nextSpeed = (currentSpeed % 3) + 1;

            this.dataset.speed = nextSpeed.toString();

            // Altera diretamente a duração da animação
            this.style.animationDuration = speeds[nextSpeed];

            console.log(`Velocidade ${nextSpeed} (${speeds[nextSpeed]})`);
        });
    });
});