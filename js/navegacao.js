// navegacao.js - Sistema de navegação entre páginas do quiz

// Variáveis globais para tracking das escolhas (compartilhadas com clickEscolha.js)
window.totalA = window.totalA || 0;
window.totalB = window.totalB || 0;
window.escolhasFeitas = window.escolhasFeitas || 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema de navegação iniciado');

    // PRÉ-CARREGA AS IMAGENS DE FUNDO
    const fundoNormal = new Image();
    fundoNormal.src = '../img/fundo.png';
    const fundoAmarelo = new Image();
    fundoAmarelo.src = '../img/fundoAmarelo.png';
    console.log('🖼️ Fundos pré-carregados');

    // FUNÇÃO AUXILIAR PARA NAVEGAR ENTRE PÁGINAS
    function navegarPara(fromPageId, toPageId) {
        const fromPage = document.getElementById(fromPageId);
        const toPage = document.getElementById(toPageId);

        if (!fromPage || !toPage) {
            console.error(`❌ Erro: Página não encontrada (${fromPageId} → ${toPageId})`);
            return;
        }

        console.log(`🔄 Navegando: ${fromPageId} → ${toPageId}`);

        // Muda o fundo se for página .frase ou .escolhas
        if (toPage.classList.contains('frase') || toPage.classList.contains('escolhas')) {
            document.body.style.backgroundImage = 'url("../img/fundoAmarelo.png")';
            console.log('🎨 Fundo mudado para: fundoAmarelo.png');
        } else {
            document.body.style.backgroundImage = 'url("../img/fundo.png")';
            console.log('🎨 Fundo mudado para: fundo.png');
        }

        // Remove active de todas as páginas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Ativa a página de destino
        toPage.classList.add('active');

        // ATUALIZA O CÍRCULO ATIVO
        const pageMap = {
            'pag4': 1,
            'pag5': 2,
            'pag6': 3,
            'pag7': 4,
            'pag8': 5,
            'pag9': 6
        };

        // Remove .ativo de todos os círculos
        document.querySelectorAll('.frase-steps li').forEach(li => {
            li.classList.remove('ativo');
        });

        // Adiciona .ativo ao círculo correspondente na página ativa
        const pageNumber = pageMap[toPageId];
        if (pageNumber && toPage.querySelector('.frase-steps')) {
            const circulos = toPage.querySelectorAll('.frase-steps li');
            if (circulos[pageNumber - 1]) {
                circulos[pageNumber - 1].classList.add('ativo');
                console.log(`✨ Círculo ${pageNumber} marcado como ativo`);
            }
        }

        console.log('✅ Navegação completa!');
    }

    // PAG3 (START) → PAG4
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎯 START clicado → PAG4');

            setTimeout(() => {
                navegarPara('pag3', 'pag4');
            }, 300);
        });

        console.log('✅ Botão START configurado');
    }

    // PAG11 → PAG14 (Trapezista)
    const btnPag11 = document.getElementById('btn-pag11');
    if (btnPag11) {
        btnPag11.addEventListener('click', function() {
            console.log('🎯 Botão PAG11 clicado → PAG14 (Trapezista)');

            const pag14 = document.getElementById('pag14');
            if (pag14) {
                pag14.classList.remove('oculta');
                console.log('✅ Classe "oculta" removida de PAG14');
            }

            navegarPara('pag11', 'pag14');
        });
        console.log('✅ Botão btn-pag11 configurado');
    }

    // PAG12 → PAG15 (Empresário)
    const btnPag12 = document.getElementById('btn-pag12');
    if (btnPag12) {
        btnPag12.addEventListener('click', function() {
            console.log('🎯 Botão PAG12 clicado → PAG15 (Empresário)');

            const pag15 = document.getElementById('pag15');
            if (pag15) {
                pag15.classList.remove('oculta');
                console.log('✅ Classe "oculta" removida de PAG15');
            }

            navegarPara('pag12', 'pag15');
        });
        console.log('✅ Botão btn-pag12 configurado');
    }

    // Botões "next page" - navegação sequencial
    const botoesNavegacao = [
        { btnId: 'btn-pag4', fromPage: 'pag4', toPage: 'pag5' },
        { btnId: 'btn-pag5', fromPage: 'pag5', toPage: 'pag6' },
        { btnId: 'btn-pag6', fromPage: 'pag6', toPage: 'pag7' },
        { btnId: 'btn-pag7', fromPage: 'pag7', toPage: 'pag8' },
        { btnId: 'btn-pag8', fromPage: 'pag8', toPage: 'pag9' }
    ];

    botoesNavegacao.forEach(config => {
        const btn = document.getElementById(config.btnId);

        if (btn) {
            btn.addEventListener('click', function() {
                console.log(`🎯 Botão "${config.btnId}" clicado (${config.fromPage} → ${config.toPage})`);
                navegarPara(config.fromPage, config.toPage);
            });
            console.log(`✅ Botão ${config.btnId} configurado`);
        }
    });

    // PAG9 → PAG10
    const btnPag9 = document.getElementById('btn-pag9');
    if (btnPag9) {
        btnPag9.addEventListener('click', function() {
            console.log('🎯 Botão PAG9 clicado → PAG10');
            navegarPara('pag9', 'pag10');
        });
        console.log('✅ Botão btn-pag9 configurado');
    }

    // PAG10 → PAG11 ou PAG12 (baseado nas escolhas)
    const btnPag10 = document.getElementById('btn-pag10');
    if (btnPag10) {
        btnPag10.addEventListener('click', function() {
            console.log('🎯 Botão PAG10 clicado');
            console.log(`📊 Escolhas: A=${window.totalA}, B=${window.totalB}`);

            const pag11 = document.getElementById('pag11');
            const pag12 = document.getElementById('pag12');
            let proximaPagina;

            if (window.totalB > window.totalA) {
                proximaPagina = 'pag12';
                console.log('🎭 Resultado: EMPRESÁRIO (mais B)');
                if (pag12) pag12.classList.remove('oculta');
            } else {
                proximaPagina = 'pag11';
                console.log('🎭 Resultado: TRAPEZISTA (mais A ou empate)');
                if (pag11) pag11.classList.remove('oculta');
            }

            navegarPara('pag10', proximaPagina);
        });
        console.log('✅ Botão btn-pag10 configurado');
    }

    // ═══════════════════════════════════════════════════════
    // Sistema de paginação (círculos numerados)
    // ═══════════════════════════════════════════════════════
    document.addEventListener('click', function(e) {
        const circulo = e.target.closest('.frase-steps li');
        if (!circulo) return;

        e.preventDefault();
        e.stopPropagation();

        const paginaAtiva = document.querySelector('.screen.active');
        if (!paginaAtiva || !paginaAtiva.contains(circulo)) return;

        const circulosPaginaAtiva = Array.from(paginaAtiva.querySelectorAll('.frase-steps li'));
        const index = circulosPaginaAtiva.indexOf(circulo);
        const pageNumber = index + 1;

        const pageMap = {
            1: 'pag4',
            2: 'pag5',
            3: 'pag6',
            4: 'pag7',
            5: 'pag8',
            6: 'pag9'
        };

        const targetPage = pageMap[pageNumber];
        if (targetPage) {
            console.log(`🔢 Círculo ${pageNumber} → ${targetPage}`);
            navegarPara(paginaAtiva.id, targetPage);
        }
    });

    console.log('✅ Sistema de navegação configurado');
});