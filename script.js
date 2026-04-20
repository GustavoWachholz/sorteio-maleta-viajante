// Variável global para guardar o nome que foi sorteado
let vencedorAtual = "";

// Quando a página carrega, ele puxa o histórico salvo
window.onload = carregarHistorico;

function realizarSorteio() {
    const textarea = document.getElementById('listaNomes');
    
    // Captura os nomes e remove linhas em branco
    const nomes = textarea.value.split('\n')
                                .map(nome => nome.trim())
                                .filter(nome => nome !== '');

    // Validação
    if (nomes.length === 0) {
        alert("Ops! Por favor, insira pelo menos um nome na lista antes de sortear.");
        return;
    }

    // Escolhe o vencedor aleatoriamente
    const indiceSorteado = Math.floor(Math.random() * nomes.length);
    vencedorAtual = nomes[indiceSorteado].toUpperCase();

    // Joga o nome no Pop-up (Modal)
    document.getElementById('nomeSorteadoDestaque').innerText = vencedorAtual;

    // Exibe o Pop-up com o fundo desfocado
    document.getElementById('modalVencedor').style.display = 'flex';
}

function fecharModal() {
    // Esconde o modal se a pessoa quiser "tentar novamente"
    document.getElementById('modalVencedor').style.display = 'none';
    vencedorAtual = "";
}

function aceitarVencedor() {
    if (!vencedorAtual) return;

    // Pega a data atual
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    // Cria o registro
    const registro = { nome: vencedorAtual, data: dataAtual };

    // Salva no Local Storage (memória do navegador)
    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    historico.push(registro);
    localStorage.setItem('historicoMaletaKids', JSON.stringify(historico));

    // Fecha o Pop-up e atualiza a lista na tela
    fecharModal();
    carregarHistorico();
}

function carregarHistorico() {
    const lista = document.getElementById('listaHistorico');
    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    
    // Limpa a lista antes de recriar
    lista.innerHTML = '';

    if (historico.length === 0) {
        lista.innerHTML = '<li style="justify-content: center; color: #888;">Nenhum vencedor registrado ainda.</li>';
        return;
    }

    // Adiciona os nomes do mais novo para o mais velho
    historico.reverse().forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.nome}</strong> <small>${item.data}</small>`;
        lista.appendChild(li);
    });
}

function limparHistorico() {
    if(confirm("Tem certeza que deseja apagar todo o histórico? Essa ação não tem volta.")) {
        localStorage.removeItem('historicoMaletaKids');
        carregarHistorico();
    }
}