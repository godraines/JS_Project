// canvas setting

let canvas;
let ctx;    // drawing images

canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")   // this game is 2D

// define canvas size
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);   // append canvas in body of html

// create function to call images
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;

// mapping spaceship - it moves constantly
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-64;

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.jpg"
}

// When press keys
let keysDown={};
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        // this will keep what keys are pushed
        keysDown[event.key] = true;
    });

    document.addEventListener("keyup", function(event){
        // this will delete the pushed key when it is off
        delete keysDown[event.key];
    });
}

function update(){
    // right key
    if( 'ArrowRight' in keysDown ){
        spaceshipX += 2;
    }

    // left key
    if( 'ArrowLeft' in keysDown ){
        spaceshipX -= 2;
    }

    // limit the ship's movement up to the canvas size
    if( spaceshipX <= 0 ){
        spaceshipX = 0;
    }

    if( spaceshipX >= canvas.width-64 ){
        spaceshipX = canvas.width-64;
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
}

/* 
to show images, the image should be called constantly
to do that, call render function in main
then call main function constantly to using animation function
*/
function main(){
    update();
    render();   // drawing
    requestAnimationFrame(main)
}

loadImage();
setupKeyboardListener();
main();