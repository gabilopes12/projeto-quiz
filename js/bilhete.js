document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-bilhete');
    const container = document.getElementById('ticket-container');
    const bilhete = document.getElementById('bilhete');

    console.log('btn:', btn, 'container:', container);

    if (!btn || !container) return;

    // Animação do bilhete ao clicar no botão
    btn.addEventListener('click', () => {
        container.classList.add('reveal-ticket');
    });

    // Clique no bilhete redireciona para próxima página
    if (bilhete) {
        bilhete.style.cursor = 'pointer';  // muda cursor para pointer

        bilhete.addEventListener('click', () => {
            // Scroll suave para a próxima secção (PAG2)
            document.querySelector('.ticket').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-bilhete');
    const container = document.getElementById('ticket-container');
    const bilhete = document.getElementById('bilhete');
    const page1 = document.querySelector('.ticket-booth');
    const page2 = document.querySelector('.ticket');

    if (!btn || !container) return;

    // Animação do bilhete ao clicar no botão
    btn.addEventListener('click', () => {
        container.classList.add('reveal-ticket');
    });

    // Clique no bilhete com transição
    if (bilhete) {
        bilhete.style.cursor = 'pointer';
        bilhete.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';

        bilhete.addEventListener('mouseenter', () => {
            bilhete.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))';
            bilhete.style.transform = 'scale(1.05)';
        });

        bilhete.addEventListener('mouseleave', () => {
            bilhete.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            bilhete.style.transform = 'scale(1)';
        });

        bilhete.addEventListener('click', () => {
            // Cria o overlay se não existir
            let overlay = document.querySelector('.transition-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'transition-overlay';
                const flyingTicket = document.createElement('img');
                flyingTicket.src = 'img/SVG/bilheteBilheteira.svg';
                flyingTicket.id = 'flying-ticket';
                overlay.appendChild(flyingTicket);
                document.body.appendChild(overlay);
            }

            const flyingTicket = document.getElementById('flying-ticket');

            // Copia posição do bilhete
            const rect = bilhete.getBoundingClientRect();
            flyingTicket.style.left = rect.left + 'px';
            flyingTicket.style.top = rect.top + 'px';
            flyingTicket.style.transform = 'none';

            // Ativa overlay
            overlay.classList.add('active');

            // Animação do bilhete
            setTimeout(() => {
                flyingTicket.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                flyingTicket.style.left = '50%';
                flyingTicket.style.top = '50%';
                flyingTicket.style.width = '150vw';
                flyingTicket.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            }, 100);

            // Mostra página 2
            setTimeout(() => {
                page1.style.display = 'none';
                page2.classList.add('active');
            }, 1000);

            // Remove overlay
            setTimeout(() => {
                overlay.classList.remove('active');
            }, 1300);
        });
    }
});