document.addEventListener('DOMContentLoaded', function() {
    const pag11 = document.getElementById('pag11');
    let mouseMovements = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let shakeIntensity = 0;
    let shakeInterval;
    let countdownStarted = false;
    let isShaking = false;

    // Observa quando PAG11 fica ativa
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (pag11.classList.contains('active')) {
                initShake();
                observer.disconnect();
            }
        });
    });

    observer.observe(pag11, { attributes: true, attributeFilter: ['class'] });

    function initShake() {
        document.addEventListener('mousemove', handleMouseMove);
    }

    function handleMouseMove(e) {
        if (!pag11.classList.contains('active')) return;

        // Calcula velocidade do movimento
        const deltaX = Math.abs(e.clientX - lastMouseX);
        const deltaY = Math.abs(e.clientY - lastMouseY);
        const speed = deltaX + deltaY;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        // Se movimento rápido (agitação)
        if (speed > 15) {
            mouseMovements++;

            // Aumenta intensidade baseado em movimentos
            shakeIntensity = Math.min(mouseMovements / 8, 18); // máximo 18px

            // Inicia tremor se ainda não começou
            if (!isShaking) {
                startShaking();
            }

            // Se agitou bastante (12 movimentos) e ainda não iniciou countdown
            if (mouseMovements > 12 && !countdownStarted) {
                countdownStarted = true;


                setTimeout(() => {
                    stopShaking();
                    goToNextPage();
                }, 5000);
            }
        }
    }

    function startShaking() {
        isShaking = true;

        shakeInterval = setInterval(() => {
            const x = (Math.random() - 0.5) * shakeIntensity * 2;
            const y = (Math.random() - 0.5) * shakeIntensity * 2;
            const rotation = (Math.random() - 0.5) * (shakeIntensity / 5);

            pag11.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }, 50);
    }

    function stopShaking() {
        clearInterval(shakeInterval);
        pag11.style.transform = '';
        isShaking = false;
    }

    function goToNextPage() {
        // Simula clique no botão next page
        const btnNext = document.getElementById('btn-pag11');
        if (btnNext) {
            btnNext.click();
        }
    }
});