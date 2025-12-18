// linha.js - Sistema de animação das linhas SVG

// Função genérica para animar linhas
function animarLinha(elemento, delay = 0.3) {
    console.log(`🎨 Animando ${elemento.id}...`);

    elemento.style.animation = 'none';
    void elemento.offsetWidth; // Força reflow
    elemento.style.animation = `revealLineFrase 2.5s ease-in-out ${delay}s forwards`;
}

// ===== PAG3 =====
function initPag3LineAnimation() {
    console.log('🔧 Inicializando animação linha PAG3...');
    const pag3 = document.getElementById('pag3');
    const linha1 = document.getElementById('linha-svg');

    if (!pag3 || !linha1) return console.error('❌ PAG3 elementos não encontrados!');

    const observer = new MutationObserver(() => {
        if (pag3.classList.contains('active')) {
            console.log('🎨 PAG3 ativa → linha1 animando!');
        }
    });

    observer.observe(pag3, { attributes: true, attributeFilter: ['class'] });
    console.log('✅ PAG3 configurada');
}

// ===== PAG4 =====
function initPag4LineAnimation() {
    console.log('🔧 Inicializando animação linha PAG4...');
    const pag4 = document.getElementById('pag4');
    const linha2 = document.getElementById('linha-svg2');

    if (!pag4 || !linha2) return console.error('❌ PAG4 elementos não encontrados!');

    const observer = new MutationObserver(() => {
        if (pag4.classList.contains('active')) {
            console.log('🎨 PAG4 ativa → linha2 animando!');
            animarLinha(linha2);
        }
    });

    observer.observe(pag4, { attributes: true, attributeFilter: ['class'] });

    if (pag4.classList.contains('active')) {
        setTimeout(() => animarLinha(linha2), 100);
    }

    console.log('✅ PAG4 configurada');
}

// ===== PAG5 =====
function initPag5LineAnimation() {
    console.log('🔧 Inicializando animação linha PAG5...');
    const pag5 = document.getElementById('pag5');
    const linha3 = document.getElementById('linha-svg3');

    if (!pag5 || !linha3) return console.error('❌ PAG5 elementos não encontrados!');

    const observer = new MutationObserver(() => {
        if (pag5.classList.contains('active')) {
            console.log('🎨 PAG5 ativa → linha3 animando!');
            animarLinha(linha3);
        }
    });

    observer.observe(pag5, { attributes: true, attributeFilter: ['class'] });

    if (pag5.classList.contains('active')) {
        setTimeout(() => animarLinha(linha3), 100);
    }

    console.log('✅ PAG5 configurada');
}

// ===== PAG6 =====
function initPag6LineAnimation() {
    console.log('🔧 Inicializando animação linha PAG6...');
    const pag6 = document.getElementById('pag6');
    const linha4 = document.getElementById('linha-svg4');

    if (!pag6 || !linha4) return console.error('❌ PAG6 elementos não encontrados!');

    const observer = new MutationObserver(() => {
        if (pag6.classList.contains('active')) {
            console.log('🎨 PAG6 ativa → linha4 animando!');
            animarLinha(linha4);
        }
    });

    observer.observe(pag6, { attributes: true, attributeFilter: ['class'] });

    if (pag6.classList.contains('active')) {
        setTimeout(() => animarLinha(linha4), 100);
    }

    console.log('✅ PAG6 configurada');
}

// ===== PAG11 - Linhas sequenciais =====
function initPag11LineAnimation() {
    console.log('🔧 Inicializando animação linhas PAG11...');
    const pag11 = document.getElementById('pag11');
    const linha11 = document.getElementById('linha-svg11');
    const linha12 = document.getElementById('linha-svg12');

    if (!pag11 || !linha11 || !linha12) {
        return console.error('❌ PAG11 elementos não encontrados!');
    }

    const observer = new MutationObserver(() => {
        if (pag11.classList.contains('active')) {
            console.log('🎨 PAG11 ativa → linhas animando em sequência!');
            // Linha11 começa em 0.3s
            animarLinha(linha11, 0.3);
            // Linha12 começa em 2.8s (0.3 + 2.5)
            animarLinha(linha12, 2.8);
        }
    });

    observer.observe(pag11, { attributes: true, attributeFilter: ['class'] });

    if (pag11.classList.contains('active')) {
        setTimeout(() => {
            animarLinha(linha11, 0.3);
            animarLinha(linha12, 2.8);
        }, 100);
    }

    console.log('✅ PAG11 configurada (animação sequencial)');
}

// ===== PAG12 - Linhas sequenciais =====
function initPag12LineAnimation() {
    console.log('🔧 Inicializando animação linhas PAG12...');
    const pag12 = document.getElementById('pag12');
    const linha13 = document.getElementById('linha-svg13');
    const linha14 = document.getElementById('linha-svg14');

    if (!pag12 || !linha13 || !linha14) {
        return console.error('❌ PAG12 elementos não encontrados!');
    }

    const observer = new MutationObserver(() => {
        if (pag12.classList.contains('active')) {
            console.log('🎨 PAG12 ativa → linhas animando em sequência!');
            // Linha13 começa em 0.3s
            animarLinha(linha13, 0.3);
            // Linha14 começa em 2.8s (0.3 + 2.5)
            animarLinha(linha14, 2.8);
        }
    });

    observer.observe(pag12, { attributes: true, attributeFilter: ['class'] });

    if (pag12.classList.contains('active')) {
        setTimeout(() => {
            animarLinha(linha13, 0.3);
            animarLinha(linha14, 2.8);
        }, 100);
    }

    console.log('✅ PAG12 configurada (animação sequencial)');
}


// Inicializa todas as animações
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 linha.js carregado');

    setTimeout(() => {
        initPag3LineAnimation();
        initPag4LineAnimation();
        initPag5LineAnimation();
        initPag6LineAnimation();
        initPag11LineAnimation();
        initPag12LineAnimation();
    }, 100);
});