const cellsTabuleiro1 = document.querySelectorAll("#jogoEsbugalhado1 .cell");
const cellsTabuleiro2 = document.querySelectorAll("#jogoEsbugalhado2 .cell");
const textoSobre = document.querySelector("#textoSobre");
const reiniciarBtn = document.querySelector("#reiniciarBtn");
let opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
let opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];
let pontuacaoTabuleiro1 = 0;
let pontuacaoTabuleiro2 = 0;
let jogadorAtual = "1";
let jogoRodando = false;
const jogadores = ['Ratau', 'Cordeiro']
let jogadorAtualIndex = 0; // Inicia com o primeiro jogador
textoSobre.textContent = `Vez de ${jogadores[jogadorAtualIndex]} jogar`;
var audio = document.getElementById("myAudio");//Para o som do game
const rodarDado1Btn = document.querySelector("#rodarDado1");
rodarDado1Btn.addEventListener("click", () => rodarDado(1));
const rodarDado2Btn = document.querySelector("#rodarDado2");
rodarDado2Btn.addEventListener("click", () => rodarDado(2));

// Função responsável para rodar o dado dos tabuleiros
function rodarDado(tabuleiro) {
    // Verifica se o jogo está rodando, se não estiver, a função retorna sem fazer nada
    if (!jogoRodando) {
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

    // Atualiza a pontuação do tabuleiro correspondente
    if (jogadorAtual === "1") {
        // Se o jogador atual for o jogador 1, atualiza a pontuação do Tabuleiro 1
        pontuacaoTabuleiro1 += valor;

        // Atualiza o elemento HTML exibindo a pontuação do Tabuleiro 1
        document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;
    } else {
        // Se o jogador atual não for o jogador 1, atualiza a pontuação do Tabuleiro 2
        pontuacaoTabuleiro2 += valor;

        // Atualiza o elemento HTML exibindo a pontuação do Tabuleiro 2
        document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;
    }
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
    textoSobre.textContent = `Vez do ${jogadores[jogadorAtualIndex]} Cordeiro`;

    if (jogadorAtual === "1") {
        jogadaAutomatica(); // Chama a jogada automática quando for a vez do jogador automático
    }
}

function checaVencedor(opcoes) {
    const somaPontuacaoTabuleiro1 = pontuacaoTabuleiro1;
    const somaPontuacaoTabuleiro2 = pontuacaoTabuleiro2;

    // Verifica se há um vencedor comparando as pontuações dos tabuleiros
    if (somaPontuacaoTabuleiro1 >= 40 || somaPontuacaoTabuleiro2 >= 40) {
        jogoRodando = false; // O jogo não está mais rodando

        // Exibe a mensagem de vitória
        const mensagemVencedor = document.getElementById("mensagemVencedor");
        if (somaPontuacaoTabuleiro1 > somaPontuacaoTabuleiro2) {
            mensagemVencedor.textContent = "Ratau venceu!";
        } else if (somaPontuacaoTabuleiro1 < somaPontuacaoTabuleiro2) {
            mensagemVencedor.textContent = "Cordeiro venceu!";
        } else {
            mensagemVencedor.textContent = "Empate!";
        }
    }

}

// Função para reiniciar o jogo quando o botão é pressionado no index.html
function reiniciarJogo() {
    opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
    opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];

    jogadorAtual = "2";
    jogoRodando = true;

    // Limpa o conteúdo das células do Tabuleiro 1 e reinicia a pontuação
    cellsTabuleiro1.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });
    pontuacaoTabuleiro1 = 0;
    document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;

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
    cellsTabuleiro1.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsTabuleiro2.forEach(cell => cell.addEventListener("click", cellClicked));
    reiniciarBtn.addEventListener("click", reiniciarJogo);

    jogoRodando = true;

    // Inicia o jogo com a jogada automática
    mudarVez();
}

iniciaJogo();

// Adiciona um ouvinte de evento para o evento 'ended'
audio.addEventListener('ended', function () {
    // Reinicia a reprodução quando a música terminar
    audio.currentTime = 0; // Define o tempo de reprodução de volta para o início
    audio.play();
});
