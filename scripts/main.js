//**IMPORTACIONES**

//Funciones
import { initBall, drawBall, moveBall, handlePadCollision } from '../scripts/ball.js';
import { initControls, initPad, drawPad, movePad } from './paddle.js';

//Variables
import { padX, padY, padHeight, padWidth } from './paddle.js';



// **CÓDIGO DEL MAIN**

//Inicializar canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 512;


//Inicializar objetos
initBall(canvas);
initPad(canvas);


//Colisión entre la pelota y la pala
function checkBallPad(){
    handlePadCollision(padX, padY, padWidth)
}


//Limpiar la pantalla antes de renderizar
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Función encargada de todo el renderizado
function draw() {
    cleanCanvas();

    //Dibujar elementos del gameplay
    
    drawBall(ctx)
    drawPad(ctx)
    checkBallPad() //Aún no funciona bien xDD
    //drawBricks()
    moveBall()
    movePad()
    

    //Renderizar el siguiente frame
    window.requestAnimationFrame(draw)
}
draw()
initControls()
