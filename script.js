document.addEventListener('DOMContentLoaded', () => {

    // ====================================================================
    // Variáveis Globais e Elementos
    // ====================================================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Variáveis do Menu Inferior
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-area > .page-content');
    const tabNav = document.querySelector('.tab-nav');

    // Variáveis do Modal de Detalhes da Vaga
    const vagaModal = document.getElementById('vaga-modal');
    const cards = document.querySelectorAll('.card');
    const btnInscrever = document.getElementById('btn-inscrever');
    const btnSalvar = document.getElementById('btn-salvar-favorito');
    
    // Variáveis do Modal de Confirmação de Inscrição
    const confirmModal = document.getElementById('confirm-modal');
    const closeConfirmModal = document.getElementById('close-confirm-modal');
    const btnConfirmarSim = document.getElementById('btn-confirmar-sim');
    const btnConfirmarNao = document.getElementById('btn-confirmar-nao');
    const vagaConfirmarSpan = document.getElementById('vaga-confirmar');
    
    let vagaSelecionadaId = null; // Armazena o ID da vaga que está no Modal
    let vagaSelecionadaNome = ""; // Armazena o nome da vaga que está no Modal

    // ====================================================================
    // 1. Gerenciamento da Navegação Inferior (Páginas: Início, Eventos, Config)
    // ====================================================================

    function navigateToPage(targetId) {
        // 1. Esconde todas as seções de página
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // 2. Controla a visibilidade da navegação de abas
        if (targetId === 'oportunidades') {
            tabNav.style.display = 'flex';
            // Ativa a página e a primeira aba (Vagas/Oportunidades)
            document.getElementById('page-oportunidades').classList.add('active'); 
            document.getElementById('oportunidades-tab').classList.add('active');
            document.querySelector('.tab-button[data-tab="oportunidades-tab"]').classList.add('active');
            
            // Remove active das outras abas para garantir
            document.getElementById('favoritos').classList.remove('active');
            document.getElementById('inscricoes').classList.remove('active');
            document.querySelector('.tab-button[data-tab="favoritos"]').classList.remove('active');
            document.querySelector('.tab-button[data-tab="inscricoes"]').classList.remove('active');

        } else {
            tabNav.style.display = 'none';
        }

        // 3. Ativa a nova página (Eventos ou Configurações)
        const targetSection = document.getElementById(`page-${targetId}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // Event listener para a navegação inferior
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove 'active' de todos os itens inferiores
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const targetPage = item.dataset.page;
            navigateToPage(targetPage);
        });
    });

    // Inicialização: Garante que a página inicial inicie ativa
    navigateToPage('oportunidades');

    // ====================================================================
    // 2. Gerenciamento de Abas (Dentro da Página 'Oportunidades')
    // ====================================================================

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove 'active' de todos os botões e conteúdos da aba
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona 'active' ao botão e conteúdo clicados
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // ====================================================================
    // 3. Gerenciamento do Modal de Detalhes da Vaga (Páginas 3 e 4)
    // ====================================================================

    // Abertura do Modal (Simula o item 2.3: Selecionar uma vaga)
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Obtém e armazena os dados do card
            vagaSelecionadaId = card.dataset.id;
            vagaSelecionadaNome = card.dataset.nome;

            // Reseta o estado do botão 'Salvar'
            btnSalvar.textContent = 'Salvar';
            btnSalvar.style.backgroundColor = '#F8F8F8';
            btnSalvar.style.borderColor = 'var(--inatel-blue)';
            btnSalvar.style.color = 'var(--inatel-blue)';

            // Preenche o Modal de Detalhes
            document.getElementById('modal-titulo').textContent = vagaSelecionadaNome;
            document.getElementById('modal-empresa').textContent = card.dataset.local;
            
            vagaModal.style.display = 'block'; // Exibe o modal
        });
    });

    // Fechamento dos Modals (Clicando no X ou fora da área)
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            vagaModal.style.display = 'none';
            confirmModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === vagaModal) {
            vagaModal.style.display = 'none';
        }
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    });

    // ====================================================================
    // 4. Ações: Inscrever-se, Confirmar, Salvar
    // ====================================================================

    // Abertura do Modal de Confirmação (Item 4.1: Clicar em Inscrever-se)
    btnInscrever.addEventListener('click', () => {
        vagaConfirmarSpan.textContent = vagaSelecionadaNome; // Preenche o nome da vaga no modal de confirmação
        vagaModal.style.display = 'none'; // Esconde o modal de detalhes
        confirmModal.style.display = 'block'; // Mostra o modal de confirmação
    });

    // Ação de Confirmação (Item 4.2: Confirmar Inscrição)
    btnConfirmarSim.addEventListener('click', () => {
        alert(`Inscrição na vaga "${vagaSelecionadaNome}" realizada com sucesso! Você pode acompanhar o status na aba 'Minhas Inscrições'.`);
        confirmModal.style.display = 'none';
        
        // Simulação de adição na aba "Minhas Inscrições"
        const listaInscricoes = document.getElementById('lista-inscricoes');
        
        // Verifica se a vaga já está na lista (pelo ID)
        if (!document.querySelector(`#lista-inscricoes .inscricao-card[data-id="${vagaSelecionadaId}"]`)) {
            const novoCard = document.createElement('div');
            novoCard.className = 'inscricao-card';
            novoCard.setAttribute('data-id', vagaSelecionadaId);
            novoCard.innerHTML = `
                <h4>${vagaSelecionadaNome}</h4>
                <span class="status esperando">Esperando Retorno</span>
            `;
            listaInscricoes.prepend(novoCard); // Adiciona no topo da lista
        }
    });

    // Ação de Cancelamento do Modal de Confirmação
    btnConfirmarNao.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });
    
    // Funcionalidade de Salvar nos Favoritos (Item 4.3: Salvar nos favoritos)
    btnSalvar.addEventListener('click', (e) => {
        e.target.textContent = 'Salvo!';
        e.target.style.backgroundColor = '#FFD700'; // Feedback visual
        e.target.style.borderColor = '#FFD700';
        e.target.style.color = 'var(--text-color)';
        
        alert(`Vaga "${vagaSelecionadaNome}" salva nos seus favoritos!`);
        
        // Simulação de adição na aba "Favoritos"
        const listaFavoritos = document.getElementById('lista-favoritos');
        const emptyState = document.querySelector('#favoritos .empty-state');
        
        // Simulação: Remove a mensagem de estado vazio
        if (emptyState) emptyState.style.display = 'none';

        // Verifica se a vaga já está na lista
        if (!document.querySelector(`#lista-favoritos .card[data-id="${vagaSelecionadaId}"]`)) {
            // Clona o card da lista de oportunidades
            const cardOriginal = document.querySelector(`#oportunidades-tab .card[data-id="${vagaSelecionadaId}"]`);
            if (cardOriginal) {
                const cardClone = cardOriginal.cloneNode(true);
                cardClone.classList.add('favorito-salvo');
                listaFavoritos.prepend(cardClone);
            }
        }
    });
    
    // ====================================================================
    // 5. Configurações e Logout
    // ====================================================================

    // Funcionalidade de Sair da Conta (Logout)
    document.querySelector('.logout-item').addEventListener('click', () => {
        alert('Saindo da conta... Até breve!');
        // Aqui você faria o redirecionamento para a tela de login
    });
    
});