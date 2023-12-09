import { criarTabuleiro, realizarSorteio, sortearPrimeiroJogador } from "./jogo.js";

// Função de inicialização
function inicializarJogo() {
    // Inicialmente, criar a tabela 3x3
    criarTabuleiro(1);
    criarTabuleiro(2);

    // Sortear a vez do primeiro jogador ao carregar a página (automaticamente)
    document.getElementById('sorteioPrimeiroJogador').addEventListener('click', function () {
        sortearPrimeiroJogador();
        // Desative o botão após a execução
        document.getElementById('sorteioPrimeiroJogador').disabled = true;
        document.getElementById('sorteioPrimeiroJogador').style.display = 'none';
    });

    // Associar eventos aos botões
    document.getElementById('rolarDadoJogador1').addEventListener('click', function () {
        realizarSorteio(1);
    });

    document.getElementById('rolarDadoJogador2').addEventListener('click', function () {
        realizarSorteio(2);
    });



}

// Chamar a função de inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarJogo);