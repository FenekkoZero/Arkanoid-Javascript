//**IMPORTACIONES**

//Funciones
import { initBall, drawBall, moveBall, handlePadCollision, ballX, ballY, dirX, dirY, ballRadius, invertDirY } from '../scripts/ball.js';
import { initControls, initPad, drawPad, movePad } from './paddle.js';

//Variables
import { padX, padY, padHeight, padWidth } from './paddle.js';
import { drawBricks, handleBallCollision } from './bricks.js';



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

// Comprobar colisiones: pala + ladrillos
function checkCollisions(){
    // Colisión con la pala (la función interna ya ajusta dirX/dirY en ball.js)
    handlePadCollision(padX, padY, padWidth);

    // Colisión con ladrillos (comprobamos la posición siguiente)
    const nextX = ballX + dirX;
    const nextY = ballY + dirY;
    if (handleBallCollision(nextX, nextY, ballRadius)){
        // Invertir la componente vertical al chocar con un ladrillo
        invertDirY();
    }
}


//Limpiar la pantalla antes de renderizar
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Función encargada de todo el renderizado
function draw() {
    cleanCanvas();

    //Dibujar elementos del gameplay
    drawBricks(ctx)
    drawBall(ctx)
    drawPad(ctx)
    checkCollisions()
    moveBall()
    movePad()
    

    //Renderizar el siguiente frame
    window.requestAnimationFrame(draw)
}
draw()
initControls()
