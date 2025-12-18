// clickEscolha.js - Sistema de escolhas A/B com possibilidade de mudar

// Usa variáveis globais para compartilhar com navegacao.js
window.totalA = 0;
window.totalB = 0;
window.escolhasFeitas = 0;

document.addEventListener("DOMContentLoaded", function () {


    // PRÉ-CARREGA OS FUNDOS DAS ESCOLHAS
    const fundoTrapezista = new Image();
    fundoTrapezista.src = 'img/fundoTrapezista.png';
    const fundoEmpresario = new Image();
    fundoEmpresario.src = 'img/fundoEmpresario.png';
    const fundoAmarelo = new Image();
    fundoAmarelo.src = 'img/fundoAmarelo.png';
    console.log('🖼️ Fundos das escolhas pré-carregados');

    const screensEscolhas = document.querySelectorAll(".screen.escolhas");
    const numEscolhas = screensEscolhas.length;

    const pag11 = document.getElementById("pag11");
    const pag12 = document.getElementById("pag12");
    const pag14 = document.getElementById("pag14");
    const pag15 = document.getElementById("pag15");

    console.log(`📋 Encontradas ${numEscolhas} páginas de escolha`);

    function decidirRamoSePronto() {
        if (!pag11 || !pag12 || !pag14 || !pag15) return;
        if (window.escolhasFeitas < numEscolhas) return; // ainda faltam perguntas

        console.log('🎯 Todas as escolhas feitas!');
        console.log(`📊 Total A: ${window.totalA}, Total B: ${window.totalB}`);

        if (window.totalB > window.totalA) {
            // MAIS B → resultado Empresário (12 e 15)
            console.log('🎭 Caminho: EMPRESÁRIO');
            pag12.classList.remove("oculta");
            pag15.classList.remove("oculta");
            pag11.classList.add("oculta");
            pag14.classList.add("oculta");
        } else {
            // MAIS A (ou empate) → resultado Trapezista (11 e 14)
            console.log('🎭 Caminho: TRAPEZISTA');
            pag11.classList.remove("oculta");
            pag14.classList.remove("oculta");
            pag12.classList.add("oculta");
            pag15.classList.add("oculta");
        }
    }

    screensEscolhas.forEach((screen, index) => {
        const manchaA = screen.querySelector(".mancha-a");
        const manchaB = screen.querySelector(".mancha-b");
        const opcaoA  = screen.querySelector(".opcao-a");
        const opcaoB  = screen.querySelector(".opcao-b");
        const botaoNext = screen.querySelector(".btn-escolha-next");

        if (!manchaA || !manchaB || !opcaoA || !opcaoB) {
            console.warn(`⚠️ Elementos não encontrados na página de escolha ${index + 1}`);
            return;
        }

        // Guarda as imagens originais
        const manchaOriginalA = manchaA.src;
        const manchaOriginalB = manchaB.src;
        const fundoOriginal = screen.style.backgroundImage || '';

        // Estado da escolha nesta página
        let escolhaAtual = null; // null = nenhuma, 'A' ou 'B'
        let jaContabilizado = false; // Se já foi contabilizado para o total

        function escolherA() {
            console.log(`✅ Opção A selecionada na página ${index + 1}`);

            // Se já tinha escolhido B, remove do total B
            if (escolhaAtual === 'B' && jaContabilizado) {
                window.totalB--;
                console.log(`   Removido do total B (novo total: ${window.totalB})`);
            }

            // Se ainda não tinha escolhido nada, incrementa escolhas feitas
            if (escolhaAtual === null) {
                window.escolhasFeitas++;
                jaContabilizado = true;
            }

            // Se não tinha escolhido A ainda, adiciona ao total A
            if (escolhaAtual !== 'A') {
                window.totalA++;
                console.log(`   Adicionado ao total A (novo total: ${window.totalA})`);
            }

            escolhaAtual = 'A';

            // Visual
            manchaA.src = "img/manchaEscolhaT.png";
            manchaB.src = manchaOriginalB; // Restaura a mancha B
            screen.style.backgroundImage = `url('${fundoTrapezista.src}')`;

            console.log(`📊 Placar atual: A=${window.totalA}, B=${window.totalB}, Escolhas=${window.escolhasFeitas}/${numEscolhas}`);

            if (botaoNext) {
                botaoNext.style.display = "inline-block";
            }

            decidirRamoSePronto();
        }

        function escolherB() {
            console.log(`✅ Opção B selecionada na página ${index + 1}`);

            // Se já tinha escolhido A, remove do total A
            if (escolhaAtual === 'A' && jaContabilizado) {
                window.totalA--;
                console.log(`   Removido do total A (novo total: ${window.totalA})`);
            }

            // Se ainda não tinha escolhido nada, incrementa escolhas feitas
            if (escolhaAtual === null) {
                window.escolhasFeitas++;
                jaContabilizado = true;
            }

            // Se não tinha escolhido B ainda, adiciona ao total B
            if (escolhaAtual !== 'B') {
                window.totalB++;
                console.log(`   Adicionado ao total B (novo total: ${window.totalB})`);
            }

            escolhaAtual = 'B';

            // Visual
            manchaB.src = "img/manchaEscolhaE.png";
            manchaA.src = manchaOriginalA; // Restaura a mancha A
            screen.style.backgroundImage = `url('${fundoEmpresario.src}')`;

            console.log(`📊 Placar atual: A=${window.totalA}, B=${window.totalB}, Escolhas=${window.escolhasFeitas}/${numEscolhas}`);

            if (botaoNext) {
                botaoNext.style.display = "inline-block";
            }

            decidirRamoSePronto();
        }

        // Adiciona os listeners (não remove mais!)
        opcaoA.addEventListener("click", escolherA);
        opcaoB.addEventListener("click", escolherB);

        // Mantém o cursor como pointer
        opcaoA.style.cursor = "pointer";
        opcaoB.style.cursor = "pointer";

        console.log(`✅ Página de escolha ${index + 1} configurada (pode mudar de opinião)`);
    });
});