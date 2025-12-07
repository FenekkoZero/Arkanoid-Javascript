
// **VARIABLES DE LA PALA**
export const padHeight = 10;
export const padWidth = 52;
export let padX, padY, canvasRef;
export let rightPressed = false;
export let leftPressed = false;


const $padSprite = document.querySelector('#padSprite');

// Inicializar la pala
export function initPad(canvas) {

    canvasRef = canvas;
    padX = (canvasRef.width - padWidth)/ 2;
    padY = canvasRef.height - padHeight - 10;
}

//Renderizar la pala
export function drawPad(ctx){
    ctx.drawImage(
        $padSprite, //ID del sprite
        27, //Clip X
        174, //ClipY
        padWidth, //Ancho del recorte
        padHeight, //Alto del recorte
        padX,  //Posición X en el canvas
        padY,  //Posición Y en el canvas
        padWidth,  //Ancho del sprite
        padHeight  //Alto del sprite
    )
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