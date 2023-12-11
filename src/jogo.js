const cellsTabuleiro1 = document.querySelectorAll("#jogoEsbugalhado1 .cell");
const cellsTabuleiro2 = document.querySelectorAll("#jogoEsbugalhado2 .cell");
const textoSobre = document.querySelector("#textoSobre");
const reiniciarBtn = document.querySelector("#reiniciarBtn");
let opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
let opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "1";
let jogoRodando = false;

const rodarDado1Btn = document.querySelector("#rodarDado1");
rodarDado1Btn.addEventListener("click", () => rodarDado(1));
const rodarDado2Btn = document.querySelector("#rodarDado2");
rodarDado2Btn.addEventListener("click", () => rodarDado(2));

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

function updateCell(cell, index, valor, opcoes) {
    opcoes[index] = jogadorAtual;
    cell.textContent = valor;
}

function mudarVez() {
    jogadorAtual = (jogadorAtual === "1") ? "2" : "1";
    textoSobre.textContent = `Vez do jogador ${jogadorAtual}`;
}

function checaVencedor(opcoes) {
    // Adicione lógica para verificar a condição de vitória usando opcoes.
    // Se um jogador vencer, você pode definir jogoRodando para false e exibir uma mensagem.
}

function reiniciarJogo() {
    opcoesTabuleiro1 = ["", "", "", "", "", "", "", "", ""];
    opcoesTabuleiro2 = ["", "", "", "", "", "", "", "", ""];
    jogadorAtual = "1";
    jogoRodando = true;

    // Limpar o conteúdo das células do Tabuleiro 1
    cellsTabuleiro1.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });

    // Limpar o conteúdo das células do Tabuleiro 2
    cellsTabuleiro2.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });

    // Atualizar o texto sobre
    textoSobre.textContent = `Vez do jogador ${jogadorAtual}`;
}

function cellClicked() {
    const cellIndex = parseInt(this.getAttribute("cellIndex"));

    const valorSorteado = parseInt(textoSobre.textContent.split(' ')[2]);
    const tabuleiro = this.closest("#jogoEsbugalhado1") ? 1 : 2;

    const cells = (tabuleiro === 1) ? cellsTabuleiro1 : cellsTabuleiro2;
    const opcoes = (tabuleiro === 1) ? opcoesTabuleiro1 : opcoesTabuleiro2;

    if (opcoes[cellIndex] !== "" || !jogoRodando) {
        return;
    }

    updateCell(this, cellIndex, valorSorteado, opcoes);
    checaVencedor(opcoes);
    mudarVez();
}

function iniciaJogo() {
    cellsTabuleiro1.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsTabuleiro2.forEach(cell => cell.addEventListener("click", cellClicked));
    reiniciarBtn.addEventListener("click", reiniciarJogo);

    jogoRodando = true;
}

iniciaJogo();
