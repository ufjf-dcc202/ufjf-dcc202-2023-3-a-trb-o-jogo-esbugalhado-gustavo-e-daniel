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

    // Atualiza a pontuação do tabuleiro correspondente
    if (jogadorAtual === "1") {
        pontuacaoTabuleiro1 += valor;
        document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;
    } else {
        pontuacaoTabuleiro2 += valor;
        document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;
    }
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

    // Limpar o conteúdo das células do Tabuleiro 1 e reiniciar a pontuação
    cellsTabuleiro1.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });
    pontuacaoTabuleiro1 = 0;
    document.getElementById("pontuacaoTabuleiro1").textContent = pontuacaoTabuleiro1;

    // Limpar o conteúdo das células do Tabuleiro 2 e reiniciar a pontuação
    cellsTabuleiro2.forEach(cell => {
        cell.textContent = "";
        cell.removeEventListener("click", cellClicked);
        cell.addEventListener("click", cellClicked);
    });
    pontuacaoTabuleiro2 = 0;
    document.getElementById("pontuacaoTabuleiro2").textContent = pontuacaoTabuleiro2;

    // Atualizar o texto sobre
    textoSobre.textContent = `Vez do jogador ${jogadorAtual}`;
}


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

    // Remover o listener de evento após o clique, pois não é necessário adicionar novamente
    this.removeEventListener("click", cellClicked);
}


function iniciaJogo() {
    cellsTabuleiro1.forEach(cell => cell.addEventListener("click", cellClicked));
    cellsTabuleiro2.forEach(cell => cell.addEventListener("click", cellClicked));
    reiniciarBtn.addEventListener("click", reiniciarJogo);

    jogoRodando = true;
}

iniciaJogo();
