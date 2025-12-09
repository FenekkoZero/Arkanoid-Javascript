//*VARIABLES*

export let bricksRowCount = 7;
export let bricksColumnCount = 12;

export const brickWidth = 30;
export const brickHeight = 14; 
export const brickPadding = 2;
export const brickOffsetTop = 30;
export const brickOffsetLeft = 15;

const BRICK_STATUS ={
    ACTIVE: 1,
    DESTROYED: 0
}

//Matriz de ladrillos
export let bricks = [];

//Iterar los ladrillos
for (let b_column = 0 ; b_column < bricksColumnCount ; b_column++){
    bricks[b_column] = []; //Inicializamos con un array vacío
    for (let b_row = 0 ; b_row < bricksRowCount ; b_row++){
        //Calcular la posición del ladrillo en la pantalla
        const brickX = b_column * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = b_row * (brickHeight + brickPadding) + brickOffsetTop;

        //Asignar un color aleatorio
        const random = Math.floor(Math.random() * 8);

        //Guardar la información de cada ladrillo
        bricks[b_column][b_row] = {
            x: brickX,
            y: brickY,
            status: BRICK_STATUS.ACTIVE,
            color: `hsl(${random * 45}, 70%, 60%)`
        };
    }
}

export function drawBricks(ctx){
    for (let b_column = 0 ; b_column < bricksColumnCount ; b_column++){
        for (let b_row = 0 ; b_row < bricksRowCount ; b_row++){
            const currentBrick = bricks[b_column][b_row];
            //Dibujar solo si el ladrillo está activo
            if (currentBrick.status === BRICK_STATUS.DESTROYED)
                continue;

            ctx.beginPath();
            ctx.fillStyle = currentBrick.color || 'yellow';
            ctx.rect(
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            );
            ctx.fill();
            ctx.closePath();
        }
    }


}

// Comprueba colisión de una pelota (en la posición proporcionada) con los ladrillos.
// Si hay colisión, marca el ladrillo como destruido y devuelve true.
export function handleBallCollision(ballX, ballY, ballRadius){
    for (let c = 0; c < bricksColumnCount; c++){
        for (let r = 0; r < bricksRowCount; r++){
            const b = bricks[c][r];
            if (!b || b.status === BRICK_STATUS.DESTROYED) continue;

            // Caja del ladrillo
            const bx = b.x;
            const by = b.y;
            const bw = brickWidth;
            const bh = brickHeight;

            // Simple colisión AABB contra el círculo (aprox con bounding box)
            if (ballX + ballRadius > bx && ballX - ballRadius < bx + bw &&
                ballY + ballRadius > by && ballY - ballRadius < by + bh){
                // Colisión detectada: destruir ladrillo
                b.status = BRICK_STATUS.DESTROYED;
                return true;
            }
        }
    }

    return false;
}