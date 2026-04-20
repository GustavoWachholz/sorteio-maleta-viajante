let vencedorAtual = "";

window.onload = carregarHistorico;

function realizarSorteio() {
    const textarea = document.getElementById('listaNomes');
    const nomes = textarea.value.split('\n')
                                .map(nome => nome.trim())
                                .filter(nome => nome !== '');

    if (nomes.length === 0) {
        alert("Por favor, insira nomes na lista.");
        return;
    }

    // Escolhe o vencedor
    const indiceSorteado = Math.floor(Math.random() * nomes.length);
    vencedorAtual = nomes[indiceSorteado].toUpperCase();

    // Prepara o Modal
    document.getElementById('mensagemVencedor').innerText = "O sorteado da semana para receber a Maleta Viajante é:";
    document.getElementById('nomeSorteadoDestaque').innerText = vencedorAtual;

    // Mostra o Modal
    document.getElementById('modalVencedor').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalVencedor').style.display = 'none';
    vencedorAtual = "";
}

function aceitarVencedor() {
    if (!vencedorAtual) return;

    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const registro = { nome: vencedorAtual, data: dataAtual };

    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    historico.push(registro);
    localStorage.setItem('historicoMaletaKids', JSON.stringify(historico));

    fecharModal();
    carregarHistorico();
}

function carregarHistorico() {
    const lista = document.getElementById('listaHistorico');
    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    lista.innerHTML = '';

    historico.reverse().forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.nome}</strong> <small>${item.data}</small>`;
        lista.appendChild(li);
    });
}

function limparHistorico() {
    if(confirm("Deseja apagar o histórico?")) {
        localStorage.removeItem('historicoMaletaKids');
        carregarHistorico();
    }
}