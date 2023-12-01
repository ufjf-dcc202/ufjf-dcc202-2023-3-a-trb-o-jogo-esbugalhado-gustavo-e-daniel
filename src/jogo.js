let vezDoJogador = 1;

export function criarTabuleiro(jogador) {
    const tabela = document.getElementById(`tabela${jogador}`);

    if (!tabela) {
        console.error(`Elemento com ID 'tabela${jogador}' não encontrado.`);
        return;
    }

    // Criar um elemento h2 para o texto acima da tabela
    const textoAcimaTabela = document.createElement('h2');
    textoAcimaTabela.textContent = `Tabuleiro do Jogador ${jogador}`;

    // Inserir o elemento h2 antes da tabela
    tabela.parentNode.insertBefore(textoAcimaTabela, tabela);

    for (let i = 0; i < 3; i++) {
        const linha = tabela.insertRow(i);
        for (let j = 0; j < 3; j++) {
            const celula = linha.insertCell(j);
            celula.textContent = ''; // Inicialmente, sem valor
        }
    }
}

export function preencherTabela(numero, jogador, rowIndex, cellIndex) {
    const tabela = document.getElementById(`tabela${jogador}`);
    const linhaExistente = tabela.rows[rowIndex];

    if (linhaExistente) {
        const celula = linhaExistente.cells[cellIndex];

        if (celula) {
            celula.textContent = numero;
        }
    }
}

export function realizarSorteio(jogador) {
    const resultadoDoSorteio = rolarDado();
    const elementoResultado = document.getElementById('resultadoDoSorteio');
    elementoResultado.textContent = `Resultado do sorteio do dado: ${resultadoDoSorteio}. Jogador ${jogador}, clique em uma célula para inserir.`;

    // Obtenha uma célula aleatória para preencher
    const rowIndex = Math.floor(Math.random() * 3);
    const cellIndex = Math.floor(Math.random() * 3);

    preencherTabela(resultadoDoSorteio, jogador, rowIndex, cellIndex);

    // Alterne para o próximo jogador
    vezDoJogador = (vezDoJogador === 1) ? 2 : 1;
}


export function rolarDado() {
    // Funcao que retorna um numero aleatorio entre 1 e 6
    return Math.floor(Math.random() * 6) + 1;
}