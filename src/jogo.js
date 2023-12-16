function rolarDado (){
    let dado = Math.floor(Math.random() * 6) + 1;
    document.getElementById("btnRolar").onclick = rolarDado;
    document.getElementById("resultado").innerHTML = dado
    
}
document.getElementById("btnRolar").onclick = rolarDado;
document.getElementById()