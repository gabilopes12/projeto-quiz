// objetosFisica.js - Sistema de física para PAG8 com drag manual

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Sistema de física PAG8 carregado');

    const pag8 = document.getElementById('pag8');

    if (!pag8) {
        console.error('❌ PAG8 não encontrada!');
        return;
    }

    let engine = null;
    let render = null;
    let runner = null;
    let physicsBodies = [];
    let isPhysicsActive = false;
    let draggedBody = null;
    let draggedElement = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Observador para detectar quando PAG8 fica ativa
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isActive = pag8.classList.contains('active');

                if (isActive && !isPhysicsActive) {
                    console.log('🎨 PAG8 ativa → Iniciando física!');
                    setTimeout(() => initPhysics(), 500);
                } else if (!isActive && isPhysicsActive) {
                    console.log('⏸️ PAG8 inativa → Parando física');
                    stopPhysics();
                }
            }
        });
    });

    observer.observe(pag8, {
        attributes: true,
        attributeFilter: ['class']
    });

    function initPhysics() {
        if (isPhysicsActive) return;

        console.log('🚀 Inicializando Matter.js...');

        if (typeof Matter === 'undefined') {
            console.error('❌ Matter.js não está carregado!');
            return;
        }

        const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

        const container = pag8.querySelector('.frase-content');
        if (!container) {
            console.error('❌ Container não encontrado!');
            return;
        }

        // Cria o engine
        engine = Engine.create();
        engine.gravity.y = 1;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Cria o renderer (completamente invisível)
        render = Render.create({
            element: container,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent'
            }
        });

        render.canvas.style.position = 'absolute';
        render.canvas.style.top = '0';
        render.canvas.style.left = '0';
        render.canvas.style.pointerEvents = 'none';
        render.canvas.style.opacity = '0';
        render.canvas.style.zIndex = '1';

        // Paredes invisíveis
        const wallThickness = 50;
        const ground = Bodies.rectangle(width / 2, height + wallThickness/2, width, wallThickness, {
            isStatic: true,
            render: { opacity: 0 }
        });
        const leftWall = Bodies.rectangle(-wallThickness/2, height / 2, wallThickness, height, {
            isStatic: true,
            render: { opacity: 0 }
        });
        const rightWall = Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, height, {
            isStatic: true,
            render: { opacity: 0 }
        });
        const topWall = Bodies.rectangle(width / 2, -wallThickness/2, width, wallThickness, {
            isStatic: true,
            render: { opacity: 0 }
        });

        Composite.add(engine.world, [ground, leftWall, rightWall, topWall]);

        // Pega os objetos (agora com 9 objetos: 4 estrelas + 5 chapéus)
        const objects = container.querySelectorAll('#pag8 .star6, #pag8 .star7, #pag8 .star8, #pag8 .star9, #pag8 .hat5, #pag8 .hat6, #pag8 .hat7, #pag8 .hat8, #pag8 .hat9');

        console.log(`🎯 Objetos encontrados: ${objects.length}`);

        objects.forEach((obj) => {
            const rect = obj.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            const body = Bodies.circle(x, y, rect.width / 2, {
                restitution: 0.6,
                friction: 0.05,
                density: 0.002,
                frictionAir: 0.01,
                render: { opacity: 0 }
            });

            Composite.add(engine.world, body);
            physicsBodies.push({ element: obj, body: body });

            obj.style.position = 'absolute';
            obj.style.zIndex = '10';
            obj.style.cursor = 'grab';
            obj.style.pointerEvents = 'auto';

            // Sistema de drag manual
            obj.addEventListener('mousedown', function(e) {
                e.preventDefault();
                draggedBody = body;
                draggedElement = obj;
                obj.style.cursor = 'grabbing';
                Body.setStatic(body, true); // Torna estático enquanto arrasta

                // Guarda posição inicial do mouse
                const containerRect = container.getBoundingClientRect();
                lastMouseX = e.clientX - containerRect.left;
                lastMouseY = e.clientY - containerRect.top;

                console.log('🎯 Pegou objeto!');
            });
        });

        // Eventos globais de mouse para arrastar
        document.addEventListener('mousemove', function(e) {
            if (draggedBody && draggedElement) {
                const containerRect = container.getBoundingClientRect();
                let mouseX = e.clientX - containerRect.left;
                let mouseY = e.clientY - containerRect.top;

                // Raio do objeto (metade da largura)
                const radius = draggedElement.offsetWidth / 2;

                // Limita a posição para manter o objeto dentro da box-bege
                mouseX = Math.max(radius, Math.min(width - radius, mouseX));
                mouseY = Math.max(radius, Math.min(height - radius, mouseY));

                // Calcula a rotação baseada no movimento do mouse
                const deltaX = mouseX - lastMouseX;
                const deltaY = mouseY - lastMouseY;

                // Calcula o ângulo de rotação (quanto maior o movimento, mais roda)
                const rotationSpeed = 0.1; // Ajuste este valor para rotação mais rápida/lenta
                const angleChange = (deltaX + deltaY) * rotationSpeed;

                // Aplica a rotação
                Body.setAngle(draggedBody, draggedBody.angle + angleChange * 0.1);

                // Move o corpo físico para a posição do mouse (limitada)
                Body.setPosition(draggedBody, { x: mouseX, y: mouseY });
                Body.setVelocity(draggedBody, { x: 0, y: 0 });
                Body.setAngularVelocity(draggedBody, 0);

                // Atualiza última posição do mouse
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        });

        document.addEventListener('mouseup', function() {
            if (draggedBody && draggedElement) {
                console.log('✋ Soltou objeto!');
                Body.setStatic(draggedBody, false); // Volta a ser dinâmico
                draggedElement.style.cursor = 'grab';
                draggedBody = null;
                draggedElement = null;
            }
        });

        // Sincroniza posições
        Events.on(engine, 'afterUpdate', function() {
            physicsBodies.forEach(({ element, body }) => {
                const angle = body.angle;
                const position = body.position;

                element.style.left = (position.x - element.offsetWidth / 2) + 'px';
                element.style.top = (position.y - element.offsetHeight / 2) + 'px';
                element.style.transform = `rotate(${angle}rad)`;
            });
        });

        // Inicia o engine
        runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        isPhysicsActive = true;
        console.log('✅ Física ativada! Clique e arraste os objetos.');
    }

    function stopPhysics() {
        if (!isPhysicsActive) return;

        console.log('🛑 Parando física...');

        draggedBody = null;
        draggedElement = null;

        if (runner) {
            Runner.stop(runner);
        }

        if (render) {
            Render.stop(render);
            if (render.canvas && render.canvas.parentNode) {
                render.canvas.parentNode.removeChild(render.canvas);
            }
        }

        if (engine) {
            Engine.clear(engine);
        }

        physicsBodies = [];
        isPhysicsActive = false;

        console.log('✅ Física parada');
    }

    if (pag8.classList.contains('active')) {
        console.log('⚡ PAG8 já ativa ao carregar');
        setTimeout(() => initPhysics(), 500);
    }

    console.log('✅ Sistema de física PAG8 configurado');
});