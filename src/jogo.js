let vezDoJogador = 1;

export function criarTabuleiro(jogador) {
    // Função que cria o tabuleiro dos jogadores
    const tabela = document.getElementById(`tabela${jogador}`);

    if (!tabela) {
        console.error(`Elemento com ID 'tabela${jogador}' não encontrado.`);
        return;
    }

    // Cria um elemento h2 para o texto acima da tabela
    const textoAcimaTabela = document.createElement('h2');
    textoAcimaTabela.textContent = `Tabuleiro do Jogador ${jogador}`;

    // Aplica estilos para centralizar o texto
    textoAcimaTabela.style.textAlign = 'center';
    textoAcimaTabela.style.marginTop = '0';
    textoAcimaTabela.style.marginBottom = '10px';

    // Insere o elemento h2 antes da tabela
    tabela.parentNode.insertBefore(textoAcimaTabela, tabela);

    // Cria a tabela vazia
    for (let i = 0; i < 3; i++) {
        const linha = tabela.insertRow(i);
        for (let j = 0; j < 3; j++) {
            const celula = linha.insertCell(j);
            celula.textContent = '';
        }
    }

    // Obtém a div existente para a pontuação
    const pontuacao = document.getElementById(`pontuacaoJogador${jogador}`);

    if (pontuacao) {
        // Atualiza o conteúdo da pontuação
        pontuacao.textContent = `Pontuação: 0`;
        pontuacao.style.textAlign = 'center';
        pontuacao.style.marginTop = '0';
        pontuacao.style.marginBottom = '10px';
    } else {
        console.error(`Elemento com ID 'pontuacaoJogador${jogador}' não encontrado.`);
    }
}

export function rolarDado() {
    // Função que retorna um número aleatório entre 1 e 6 referente às faces do dado
    return Math.floor(Math.random() * 6) + 1;
}


function calcularPontuacao(tabela) {
    let pontuacao = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const valorCelula = parseInt(tabela.rows[i].cells[j].textContent, 10) || 0;
            pontuacao += valorCelula;
        }
    }

    return pontuacao;
}
