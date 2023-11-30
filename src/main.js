import {rolarDado, realizaSorteio} from "./jogo.js";

const btnRolarDado = document.querySelector('#rolarDado');

btnRolarDado.addEventListener('click', realizaSorteio);