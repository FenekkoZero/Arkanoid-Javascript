
// **Variables de la pelota**
export const ballRadius = 3.5;
export let ballX, ballY, dirX, dirY;
let canvasRef


// Inicializar la pelota
export function initBall(canvas) {
    
    canvasRef = canvas;
    ballX = canvasRef.width / 2;
    ballY = canvasRef.height - 75;
    dirX = 4;
    dirY = -4;
}

//Renderizar
export function drawBall(ctx){
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#ff3838ff'
    ctx.fill()
    ctx.closePath()
}

//Movimiento de la pelota
export function moveBall(){
    
    //Rebotar en los bordes laterales
    if(
        ballX + dirX > canvasRef.width - ballRadius ||
        ballX + dirX < ballRadius
    ){
        dirX = -dirX
    }

    //Rebotar en el borde superior
    if (
        ballY + dirY < ballRadius
    ){
        dirY = -dirY
    }

    //Perder si la pelota toca el borde inferior
    if (
        ballY + dirY > canvasRef.height - ballRadius
    ){
        alert("Has perdido!");
        document.location.reload();
    }

    //Movimiento normal
    ballX += dirX
    ballY += dirY
}

// Detectar y manejar colisión con la pala (modifica estado interno)
export function handlePadCollision(padX, padY, padWidth){
    const nextX = ballX + dirX;
    const nextY = ballY + dirY;

    // Comprobar que la pelota irá a la franja horizontal de la pala
    if (nextX > padX && nextX < padX + padWidth) {
        // Comprobar colisión por la parte superior de la pala (golpe desde arriba)
        if (nextY + ballRadius >= padY && ballY < padY) {
            // Colocar la pelota justo encima para evitar que quede "empotrada"
            ballY = padY - ballRadius - 1;
            // Invertir vertical
            dirY = -dirY;
            // Ajustar un poco la componente horizontal según el punto de impacto
            const padCenter = padX + padWidth / 2;
            const relativeHit = (nextX - padCenter) / (padWidth / 2); // -1 .. 1
            // Pequeño cambio en dirX para variar la dirección según dónde golpea
            dirX += relativeHit * 1.5;
        }
    }
}

