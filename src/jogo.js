const cellsTabuleiro1 = document.querySelectorAll("#jogoEsbugalhado1 .cell");
const cellsTabuleiro2 = document.querySelectorAll("#jogoEsbugalhado2 .cell");
/*arrays clicaveis jogadores*/
const textoSobre = document.querySelector("#textoSobre");
const reiniciarBtn = document.querySelector("#reiniciarBtn");
/*variavel recebe o valor do reiniciar btn*/
let opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
let opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];
/*arrays clicaveis jogadores*/
let pontuacaoTabuleiro1 = 0;
let pontuacaoTabuleiro2 = 0;
/*armazena a pontuacao do tabuleiro2 e 1  */
let somaColunasTotalTabuleiro1 = [0, 0, 0];
let somaColunasTotalTabuleiro2 = [0, 0, 0];
let jogadorAtual = "2";
/*    */
let jogoRodando = false;
/*essa var idica se o jogo ta rodando ou nao*/
const jogadores = ['Ratau', 'Cordeiro']
/*array representa os nomes dos jogadores*/
let jogadorAtualIndex = 0; // Inicia com o primeiro jogador
textoSobre.textContent = `Vez de ${jogadores[jogadorAtualIndex]} jogar`;

var audio = document.getElementById("myAudio");//Para o som do game
// Adiciona um ouvinte de evento para o evento 'ended'
audio.addEventListener('ended', function () {
    // Reinicia a reprodução quando a música terminar
    audio.currentTime = 0; // Define o tempo de reprodução de volta para o início
    audio.play();
});

const rodarDado2Btn = document.querySelector("#rodarDado2");
/*arrays clicaveis jogadores*/
rodarDado2Btn.addEventListener("click", () => rodarDado(2));
/*arrays clicaveis jogadores*/

// Função responsável para rodar o dado dos tabuleiros
function rodarDado(tabuleiro) {
    // Verifica se o jogo está rodando, se não estiver, a função retorna sem fazer nada
    if (!jogoRodando) {
        /*arrays clicaveis jogadores*/
        return;
    }

    // Gera um número aleatório de 1 a 6, simulando o lançamento de um dado
    const valorSorteado = Math.floor(Math.random() * 6) + 1;

    // Atualiza um elemento de texto com o valor sorteado
    textoSobre.textContent = `Dado sorteou: ${valorSorteado}`;

    // Determina as células e opções do tabuleiro com base no argumento "tabuleiro"
    const cells = (tabuleiro === 1) ? cellsTabuleiro1 : cellsTabuleiro2;
    const opcoes = (tabuleiro === 1) ? opcoesTabuleiro1 : opcoesTabuleiro2;

    // Adiciona um evento de clique a cada célula do tabuleiro
    cells.forEach((cell, index) => {
        cell.addEventListener("click", function cellClicked() {
            // Verifica se a célula já foi selecionada ou se o jogo não está rodando
            if (opcoes[index] !== "" || !jogoRodando) {
                return;
            }
            // Atualiza a célula com base no valor sorteado e nas opções do tabuleiro
            updateCell(this, index, valorSorteado, opcoes);

            // Verifica se há um vencedor após a atualização da célula
            checaVencedor(opcoes);

            // Muda a vez do jogador após a jogada
            mudarVez();
        });
    });
}

// Função de atualização da pontuação dos tabuleiros
function updateCell(cell, index, valor, opcoes) {
    // Define o valor da célula no array de opções como o jogador atual
    opcoes[index] = jogadorAtual;

    // Define o conteúdo da célula como o valor sorteado
    cell.textContent = valor;

    // Determina as células e opções do tabuleiro com base no jogador atual
    const cells = (jogadorAtual === "1") ? cellsTabuleiro1 : cellsTabuleiro2;
    const opcoesTabuleiro = (jogadorAtual === "1") ? opcoesTabuleiro1 : opcoesTabuleiro2;

    // Calcula a pontuação da coluna
    const pontuacaoColuna = calcularPontuacaoColuna(cells, index, valor, opcoesTabuleiro);

}

function calcularPontuacaoColuna(cells, index, valor, opcoesTabuleiro) {
    let pontuacaoColuna = 0;
    const colunaIndex = index % 3; // Obtém o índice da coluna

    // Converte o NodeList para um array
    const cellsArray = Array.from(cells);

    // Filtra as células pertencentes à coluna
    const cellsColuna = cellsArray.filter((_, i) => i % 3 === colunaIndex);

    // Cria um array para a coluna e imprime no console
    const valoresColuna = cellsColuna.map(cell => {
        const valorCell = parseInt(cell.textContent) || 0;
        return valorCell;
    });

    console.log(`Valores da coluna ${colunaIndex + 1} do Tabuleiro ${jogadorAtual}:`, valoresColuna);

    // Verifica a quantidade de vezes que cada número se repete no array e imprime no console
    const ocorrencias = contarOcorrencias(valoresColuna);
    console.log(`Quantidade de vezes que cada número se repete na coluna ${colunaIndex + 1} do Tabuleiro ${jogadorAtual}:`, ocorrencias);

    // Calcula a pontuação da coluna multiplicando cada valor pela sua quantidade de ocorrências
    pontuacaoColuna = valoresColuna.reduce((soma, valor) => soma + valor * ocorrencias[valor], 0);
    console.log(pontuacaoColuna);


    // Atualiza a exibição das somas individuais das colunas para ambos os tabuleiros
    const somaColunaElement = document.getElementById(`somaTabuleiro${jogadorAtual}Coluna${colunaIndex + 1}`);
    if (somaColunaElement) {
        somaColunaElement.textContent = pontuacaoColuna;
    }

    // Atualiza a pontuação do tabuleiro correspondente
    if (jogadorAtual === "1") {
        pontuacaoTabuleiro1 += pontuacaoColuna;
        somaColunasTotalTabuleiro1[colunaIndex] = pontuacaoColuna;
        document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;
    } else {
        pontuacaoTabuleiro2 += pontuacaoColuna;
        somaColunasTotalTabuleiro2[colunaIndex] = pontuacaoColuna;
        document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;
    }

    const soma1 = somaColunasTotalTabuleiro1.reduce((acumulador, valor) => acumulador + valor, 0);
    const soma2 = somaColunasTotalTabuleiro2.reduce((acumulador, valor) => acumulador + valor, 0);
    
    document.getElementById("pontuacaoTabuleiro1").textContent = soma1;
    document.getElementById("pontuacaoTabuleiro2").textContent = soma2;

    return pontuacaoColuna;
}

// Função para contar a quantidade de vezes que cada número se repete no array
function contarOcorrencias(array) {
    const ocorrencias = {};

    array.forEach(valor => {
        ocorrencias[valor] = (ocorrencias[valor] || 0) + 1;
    });

    return ocorrencias;
}

// Função para criar uma jogada automática do jogador robô
function jogadaAutomatica() {
    // Verifica se o jogo está rodando e se é a vez do jogador 1
    if (!jogoRodando || jogadorAtual !== "1") {
        return;
    }

    // Obtém as células e opções do Tabuleiro 1
    const cells = cellsTabuleiro1;
    const opcoes = opcoesTabuleiro1;

    let indiceAleatorio;

    // Escolhe aleatoriamente uma célula não selecionada
    do {
        indiceAleatorio = Math.floor(Math.random() * 9);
    } while (opcoes[indiceAleatorio] !== "");

    // Gera um valor aleatório para simular o lançamento do dado
    const valorSorteado = Math.floor(Math.random() * 6) + 1;

    // Simula um clique na célula automaticamente, usando a função updateCell
    updateCell(cells[indiceAleatorio], indiceAleatorio, valorSorteado, opcoes);

    // Verifica se há um vencedor após a jogada automática
    checaVencedor(opcoes);

    // Muda a vez, pois a jogada automática é para o jogador 1
    mudarVez();
}

// Função que muda a vez dos jogadores 
function mudarVez() {
    jogadorAtualIndex = (jogadorAtualIndex === 0) ? 1 : 0;
    jogadorAtual = (jogadorAtualIndex === 0) ? "1" : "2";
    textoSobre.textContent = `Vez do ${jogadores[jogadorAtualIndex]}`;


    // Desabilita o clique nas células do jogador 2 na tabela 1
    if (jogadorAtual === "2") {
        cellsTabuleiro1.forEach(cell => {
            cell.removeEventListener("click", cellClicked);
        });
    } else {
        // Habilita o clique nas células do jogador atual
        cellsTabuleiro1.forEach(cell => {
            cell.addEventListener("click", cellClicked);
        });

        // Executa a jogada automática quando for a vez do jogador automático (jogador 1)
        jogadaAutomatica();
    }

    if (jogoRodando == false) {
        textoSobre.textContent = `Jogo encerrado. Clique em Reiniciar.`;
    }
}

// Função para checar vencedor
function checaVencedor() {
    const tabuleiroCompleto = opcoesTabuleiro1.every(opcao => opcao !== "") || opcoesTabuleiro2.every(opcao => opcao !== "");

    // Verifica se o tabuleiro está completo
    if (tabuleiroCompleto) {
        encerrarJogo(); // Chama a função para encerrar o jogo

    }
}

// Função para encerrar o jogo caso o tabuleiro de algum esteja completo
function encerrarJogo() {
    jogoRodando = false; // O jogo não está mais rodando

    // Exibe a mensagem de vitória
    const mensagemVencedor = document.getElementById("mensagemVencedor");
    if (pontuacaoTabuleiro1 > pontuacaoTabuleiro2) {
        mensagemVencedor.textContent = "Ratau venceu!";
        textoSobre.textContent = `Jogo encerrado. Clique em Reiniciar.`;
    } else if (pontuacaoTabuleiro1 < pontuacaoTabuleiro2) {
        mensagemVencedor.textContent = "Cordeiro venceu!";
        // Atualiza o texto sobre
        textoSobre.textContent = `Jogo encerrado. Clique em Reiniciar.`;
    } else {
        mensagemVencedor.textContent = "Empate!";
        textoSobre.textContent = `Jogo encerrado. Clique em Reiniciar.`;
    }
}

// Função para reiniciar o jogo quando o botão é pressionado no index.html
function reiniciarJogo() {
    opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
    opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];

    jogadorAtual = "2";
    jogoRodando = true;

    // Atualiza mensagem do jogador vencedor para vazio
    const mensagemVencedor = document.getElementById("mensagemVencedor");
    mensagemVencedor.textContent = "";

    // Limpa o conteúdo das células do Tabuleiro 1 e reinicia a pontuação
    cellsTabuleiro1.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });
    pontuacaoTabuleiro1 = 0;
    document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;
    document.getElementById("somaTabuleiro1Coluna1").textContent = 0;
    document.getElementById("somaTabuleiro1Coluna2").textContent = 0;
    document.getElementById("somaTabuleiro1Coluna3").textContent = 0;
    document.getElementById("somaTabuleiro2Coluna1").textContent = 0;
    document.getElementById("somaTabuleiro2Coluna2").textContent = 0;
    document.getElementById("somaTabuleiro2Coluna3").textContent = 0;

    // Limpa o conteúdo das células do Tabuleiro 2 e reinicia a pontuação
    cellsTabuleiro2.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });
    pontuacaoTabuleiro2 = 0;
    document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;

    // Atualiza o texto sobre
    textoSobre.textContent = `Vez do jogador ${jogadorAtual}`;
}

// Função responsável por dar os cliques nas células
function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));

    if (!jogoRodando) {
        return;
    }

    const tabuleiro = this.closest("#jogoEsbugalhado1") ? 1 : 2;
    const cells = (tabuleiro === 1) ? cellsTabuleiro1 : cellsTabuleiro2;
    const opcoes = (tabuleiro === 1) ? opcoesTabuleiro1 : opcoesTabuleiro2;

    if (opcoes[cellIndex] !== "") {
        return;
    }

    const valorSorteadoText = textoSobre.textContent.match(/\d+/); // Extrai o valor numérico usando expressão regular
    const valorSorteado = valorSorteadoText ? parseInt(valorSorteadoText[0]) : 0;

    updateCell(this, cellIndex, valorSorteado, opcoes);
    checaVencedor(opcoes);
    mudarVez();

    this.removeEventListener("click", cellClicked);
}

// Função que inicia o jogo
function iniciaJogo() {
    cellsTabuleiro2.forEach(cell => cell.addEventListener("click", cellClicked));
    reiniciarBtn.addEventListener("click", reiniciarJogo);

    jogoRodando = true;

    mudarVez();
}

iniciaJogo();