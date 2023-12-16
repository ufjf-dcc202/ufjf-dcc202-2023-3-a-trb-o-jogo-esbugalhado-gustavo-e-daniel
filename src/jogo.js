// funciona para rolar o dado e substituir o elemento da label
function rolarDado (){
    const dado = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById("tabuleiro").innerHTML = dado
}

document.getElementById("btnRolar").onclick = rolarDado;
    
