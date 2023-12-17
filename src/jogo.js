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
    
    document.getElementById("tabuleiro").innerHTML = dado
}

document.getElementById("btnRolar").onclick = rolarDado;
    
