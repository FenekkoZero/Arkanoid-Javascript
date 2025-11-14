
// **VARIABLES DE LA PALA**
export const padHeight = 10;
export const padWidth = 70;
export let padX, padY, canvasRef;
export let rightPressed = false;
export let leftPressed = false;


// Inicializar la pala
export function initPad(canvas) {

    canvasRef = canvas;
    padX = (canvasRef.width - padWidth)/ 2;
    padY = canvasRef.height - padHeight - 10;
}

//Renderizar la pala
export function drawPad(ctx){
    ctx.fillStyle = '#fff'
    ctx.fillRect(padX, padY, padWidth, padHeight)
    ctx.closePath()
}


//Registrar pulsaciones del teclado
export function initControls(){
    document.addEventListener("keydown", keyDownHandler)
    document.addEventListener("keyup", keyUpHandler)

    //Detectar cuando mantiene una tecla
    function keyDownHandler (event){
        const {key} = event
        if (key == "Right" || key == "ArrowRight"){ //Tecla derecha
            rightPressed = true
        } else if (key == "Left" || key == "ArrowLeft"){ //Tecla izquierda
            leftPressed = true
        }
    }

    //Detectar cuando mantiene una tecla
    function keyUpHandler (event){
        const {key} = event
        if (key == "Right" || key == "ArrowRight"){ //Tecla derecha
            rightPressed = false
        } else if (key == "Left" || key == "ArrowLeft"){ //Tecla izquierda
            leftPressed = false
        }
    }
}

//Movimiento de la pala y colisiones con los bordes
export function movePad(){
    if (rightPressed && !leftPressed && padX < canvasRef.width - padWidth){
        padX += 5
    }else if (leftPressed && !rightPressed && padX > 0){
        padX -= 5
    }
} 