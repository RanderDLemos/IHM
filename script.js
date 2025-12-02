document.addEventListener('DOMContentLoaded', () => {

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-area > .page-content');
    const tabNav = document.querySelector('.tab-nav');

    const vagaModal = document.getElementById('vaga-modal');
    const cards = document.querySelectorAll('.card');
    const btnInscrever = document.getElementById('btn-inscrever');
    const btnSalvar = document.getElementById('btn-salvar-favorito');
    
    const confirmModal = document.getElementById('confirm-modal');
    const closeConfirmModal = document.getElementById('close-confirm-modal');
    const btnConfirmarSim = document.getElementById('btn-confirmar-sim');
    const btnConfirmarNao = document.getElementById('btn-confirmar-nao');
    const vagaConfirmarSpan = document.getElementById('vaga-confirmar');
    
    let vagaSelecionadaId = null;
    let vagaSelecionadaNome = "";

    function navigateToPage(targetId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        if (targetId === 'oportunidades') {
            tabNav.style.display = 'flex';
            document.getElementById('page-oportunidades').classList.add('active'); 
            document.getElementById('oportunidades-tab').classList.add('active');
            document.querySelector('.tab-button[data-tab="oportunidades-tab"]').classList.add('active');
            document.getElementById('favoritos').classList.remove('active');
            document.getElementById('inscricoes').classList.remove('active');
            document.querySelector('.tab-button[data-tab="favoritos"]').classList.remove('active');
            document.querySelector('.tab-button[data-tab="inscricoes"]').classList.remove('active');
        } else {
            tabNav.style.display = 'none';
        }

        const targetSection = document.getElementById(`page-${targetId}`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const targetPage = item.dataset.page;
            navigateToPage(targetPage);
        });
    });

    navigateToPage('oportunidades');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            vagaSelecionadaId = card.dataset.id;
            vagaSelecionadaNome = card.dataset.nome;
            btnSalvar.textContent = 'Salvar';
            btnSalvar.style.backgroundColor = '#F8F8F8';
            btnSalvar.style.borderColor = 'var(--inatel-blue)';
            btnSalvar.style.color = 'var(--inatel-blue)';
            document.getElementById('modal-titulo').textContent = vagaSelecionadaNome;
            document.getElementById('modal-empresa').textContent = card.dataset.local;
            vagaModal.style.display = 'block';
        });
    });

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

    btnInscrever.addEventListener('click', () => {
        vagaConfirmarSpan.textContent = vagaSelecionadaNome;
        vagaModal.style.display = 'none';
        confirmModal.style.display = 'block';
    });

    btnConfirmarSim.addEventListener('click', () => {
        alert(`Inscrição na vaga "${vagaSelecionadaNome}" realizada com sucesso! Você pode acompanhar o status na aba 'Minhas Inscrições'.`);
        confirmModal.style.display = 'none';
        const listaInscricoes = document.getElementById('lista-inscricoes');
        if (!document.querySelector(`#lista-inscricoes .inscricao-card[data-id="${vagaSelecionadaId}"]`)) {
            const novoCard = document.createElement('div');
            novoCard.className = 'inscricao-card';
            novoCard.setAttribute('data-id', vagaSelecionadaId);
            novoCard.innerHTML = `
                <h4>${vagaSelecionadaNome}</h4>
                <span class="status esperando">Esperando Retorno</span>
            `;
            listaInscricoes.prepend(novoCard);
        }
    });

    btnConfirmarNao.addEventListener('click', () => {
        confirmModal.style.display = 'none';
    });

    btnSalvar.addEventListener('click', (e) => {
        e.target.textContent = 'Salvo!';
        e.target.style.backgroundColor = '#FFD700';
        e.target.style.borderColor = '#FFD700';
        e.target.style.color = 'var(--text-color)';
        alert(`Vaga "${vagaSelecionadaNome}" salva nos seus favoritos!`);
        
        const listaFavoritos = document.getElementById('lista-favoritos');
        const emptyState = document.querySelector('#favoritos .empty-state');

        if (emptyState) emptyState.style.display = 'none';

        if (!document.querySelector(`#lista-favoritos .card[data-id="${vagaSelecionadaId}"]`)) {
            const cardOriginal = document.querySelector(`#oportunidades-tab .card[data-id="${vagaSelecionadaId}"]`);
            if (cardOriginal) {
                const cardClone = cardOriginal.cloneNode(true);
                cardClone.classList.add('favorito-salvo');
                listaFavoritos.prepend(cardClone);
            }
        }
    });

    document.querySelector('.logout-item').addEventListener('click', () => {
        alert('Saindo da conta... Até breve!');
    });

});
