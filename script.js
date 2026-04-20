let vencedorAtual = ""; // Variável para guardar o nome temporariamente

// Carrega o histórico salvo assim que a página é aberta
window.onload = carregarHistorico;

function realizarSorteio() {
    const textarea = document.getElementById('listaNomes');
    const resultadoDiv = document.getElementById('resultado');
    const btnAceitar = document.getElementById('btnAceitar');

    // Esconde o botão de aceitar caso a pessoa sorteie de novo antes de confirmar
    btnAceitar.style.display = 'none';

    const nomes = textarea.value.split('\n')
                                .map(nome => nome.trim())
                                .filter(nome => nome !== '');

    if (nomes.length === 0) {
        resultadoDiv.innerHTML = '<span style="color: red; font-size: 1rem;">Por favor, insira pelo menos um nome na lista.</span>';
        return;
    }

    resultadoDiv.innerHTML = '<span style="color: #888;">Embaralhando os nomes... 🎲</span>';
    
    setTimeout(() => {
        const indiceSorteado = Math.floor(Math.random() * nomes.length);
        vencedorAtual = nomes[indiceSorteado].toUpperCase();

        resultadoDiv.innerHTML = `O sorteado da semana para receber a Maleta Viajante é: <span class="nome-sorteado">${vencedorAtual}</span>`;
        
        // Mostra o botão para confirmar o vencedor
        btnAceitar.style.display = 'block';
    }, 600);
}

function aceitarVencedor() {
    if (!vencedorAtual) return;

    // Pega a data atual no formato Brasileiro (Ex: 12/05/2024)
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    // Cria um objeto com o nome e a data
    const registro = {
        nome: vencedorAtual,
        data: dataAtual
    };

    // Puxa o histórico antigo do Local Storage (se não existir, cria uma lista vazia)
    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    
    // Adiciona o novo vencedor à lista
    historico.push(registro);
    
    // Salva a lista atualizada de volta no Local Storage do navegador
    localStorage.setItem('historicoMaletaKids', JSON.stringify(historico));

    // Limpa a tela para o próximo sorteio
    document.getElementById('resultado').innerHTML = '<span style="color: #28a745; font-weight: bold;">Vencedor salvo com sucesso no histórico! ✅</span>';
    document.getElementById('btnAceitar').style.display = 'none';
    vencedorAtual = ""; // Zera a variável temporária

    // Atualiza a lista na tela
    carregarHistorico();
}

function carregarHistorico() {
    const lista = document.getElementById('listaHistorico');
    let historico = JSON.parse(localStorage.getItem('historicoMaletaKids')) || [];
    
    // Limpa a lista no HTML
    lista.innerHTML = '';

    if(historico.length === 0) {
        lista.innerHTML = '<li style="justify-content: center; color: #888;">Nenhum vencedor registrado ainda.</li>';
        return;
    }

    // Faz um loop na lista (do mais novo para o mais velho) e cria os itens na tela
    for (let i = historico.length - 1; i >= 0; i--) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${historico[i].nome}</strong> <span>${historico[i].data}</span>`;
        lista.appendChild(li);
    }
}

function limparHistorico() {
    // Pede uma confirmação para evitar cliques acidentais
    if(confirm("Tem certeza que deseja apagar todo o histórico de sorteados? Essa ação não pode ser desfeita.")) {
        localStorage.removeItem('historicoMaletaKids');
        carregarHistorico();
    }
}