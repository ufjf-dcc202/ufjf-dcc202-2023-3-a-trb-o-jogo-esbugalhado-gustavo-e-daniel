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

const rodarDado1Btn = document.querySelector("#rodarDado1");
rodarDado1Btn.addEventListener("click", () => rodarDado(1));
const rodarDado2Btn = document.querySelector("#rodarDado2");
rodarDado2Btn.addEventListener("click", () => rodarDado(2));

// Função responsável para rodar o dado dos tabuleiros
function rodarDado(tabuleiro) {
    if (!jogoRodando) {
        return;
    }

    const valorSorteado = Math.floor(Math.random() * 6) + 1;
    textoSobre.textContent = `Dado sorteou: ${valorSorteado}`;

    const cells = (tabuleiro === 1) ? cellsTabuleiro1 : cellsTabuleiro2;
    const opcoes = (tabuleiro === 1) ? opcoesTabuleiro1 : opcoesTabuleiro2;

    cells.forEach((cell, index) => {
        cell.addEventListener("click", function cellClicked() {
            if (opcoes[index] !== "" || !jogoRodando) {
                return;
            }
            updateCell(this, index, valorSorteado, opcoes);
            checaVencedor(opcoes);
            mudarVez();
        });
    });
}

// Função de atualização da pontuação dos tabuleiros
function updateCell(cell, index, valor, opcoes) {
    opcoes[index] = jogadorAtual;
    cell.textContent = valor;

    // Atualiza a pontuação do tabuleiro correspondente
    if (jogadorAtual === "1") {
        pontuacaoTabuleiro1 += valor;
        document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;
    } else {
        pontuacaoTabuleiro2 += valor;
        document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;
    }
}

// Função para criar uma jogada automática do jogador robô
function jogadaAutomatica() {
    if (!jogoRodando || jogadorAtual !== "1") {
        return;
    }

    const cells = cellsTabuleiro1;
    const opcoes = opcoesTabuleiro1;

    let indiceAleatorio;
    do {
        indiceAleatorio = Math.floor(Math.random() * 9);
    } while (opcoes[indiceAleatorio] !== "");

    const valorSorteado = Math.floor(Math.random() * 6) + 1;

    // Simula um clique na célula automaticamente
    updateCell(cells[indiceAleatorio], indiceAleatorio, valorSorteado, opcoes);
    checaVencedor(opcoes);
    mudarVez();
}

// Função que muda a vez dos jogadores 
function mudarVez() {
    jogadorAtual = (jogadorAtual === "1") ? "2" : "1";
    textoSobre.textContent = `Vez do jogador ${jogadorAtual}`;

    if (jogadorAtual === "1") {
        jogadaAutomatica(); // Chama a jogada automática quando for a vez do jogador automático
    }
}

function checaVencedor(opcoes) {
    
}

// Função para reiniciar o jogo quando o botão é pressionado no index.html
function reiniciarJogo() {
    opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
    opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];
    
    jogadorAtual = "1";
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