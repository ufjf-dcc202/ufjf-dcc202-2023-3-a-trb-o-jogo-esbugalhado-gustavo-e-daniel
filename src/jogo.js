export function rolarDado() {
    // Funcao que retorna um numero aleatorio entre 1 e 6
    return Math.floor(Math.random() * 6) + 1;
}

export function realizaSorteio() {
    // Funcao que realiza o sorteio da face do dado
    const resultadoDoSorteio = rolarDado();
    const elementoResultado = document.getElementById('resultadoDoSorteio');
    elementoResultado.textContent = `Resultado do sorteio: ${resultadoDoSorteio}`;
}