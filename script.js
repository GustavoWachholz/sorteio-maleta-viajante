function realizarSorteio() {
    const textarea = document.getElementById('listaNomes');
    const resultadoDiv = document.getElementById('resultado');

    // Captura os nomes, remove espaços e ignora linhas vazias
    const nomes = textarea.value.split('\n')
                                .map(nome => nome.trim())
                                .filter(nome => nome !== '');

    // Validação
    if (nomes.length === 0) {
        resultadoDiv.innerHTML = '<span style="color: red; font-size: 1rem;">Por favor, insira pelo menos um nome na lista.</span>';
        return;
    }

    // Efeito de suspense
    resultadoDiv.innerHTML = '<span style="color: #888;">Embaralhando os nomes... 🎲</span>';
    
    setTimeout(() => {
        // Lógica do sorteio
        const indiceSorteado = Math.floor(Math.random() * nomes.length);
        const vencedor = nomes[indiceSorteado].toUpperCase();

        // Exibe o resultado final
        resultadoDiv.innerHTML = `O sorteado da semana para receber a Maleta Viajante é: <span class="nome-sorteado">${vencedor}</span>`;
    }, 600);
}