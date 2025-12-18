// Função para lidar com o clique no laço
function initBowUntie() {
    const bow = document.getElementById('bow');
    const rope = document.getElementById('rope');

    if (!bow || !rope) return;

    bow.addEventListener('click', function() {
        if (!this.classList.contains('untying')) {
            this.classList.add('untying');

            // Faz o fio cair depois do laço começar a desenlaçar
            setTimeout(() => {
                rope.classList.add('falling');
            }, 400);

            // Transição para a próxima página após a animação
            setTimeout(() => {
                // Aqui você pode adicionar a lógica para ir à próxima seção
                // Por exemplo:
                const ticketSection = document.querySelector('.ticket');
                const nextSection = document.querySelector('.start'); // PAG3

                if (ticketSection && nextSection) {
                    ticketSection.classList.remove('active');
                    nextSection.classList.add('active');
                }

                console.log('Laço desenlaçado! Indo para próxima página...');
            }, 1800);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {

    initBowUntie();
});