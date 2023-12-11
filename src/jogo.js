const cells = document.querySelectorAll(".cell");
const textoSobre = document.querySelector("#textoSobre");
const reiniciarBtn = document.querySelector("#reiniciarBtn");
const condicaoDeVitoria = [
    []
];
let opcoes = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "1";
let jogoRodando = false;


iniciaJogo();


function iniciaJogo(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    reiniciarBtn.addEventListener("click", reiniciarJogo);
    
    jogoRodando = true;

    
}
function cellClicked(){
const cellIndex = this.getAttribute("cellIndex")

    if(opcoes[cellIndex] != "" || !jogoRodando){
        return;
}
updateCell(this, cellIndex);
checaVencedor();
mudarVez();

}
function updateCell(cell, index){
    opcoes[index] = jogadorAtual;
    cell.textContent = jogadorAtual;
    
}
function mudarVez(){
    jogadorAtual = (jogadorAtual === "1") ? "2" : "1";
    textoSobre.textContent = ` Vez do jogador ${jogadorAtual}`;
    
}
function checaVencedor(){
    
}
function reiniciarJogo(){
    
}