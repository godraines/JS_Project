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

//우주선 좌표 - 계속해서 움직여야 하기 때문에 따로 빼 줌
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

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
}

/* 
이미지를 계속 호출해야 이미지가 계속 보여짐.
그러기 위해서 main 함수에 render()  함수를 불러서 이미지를 한번 보여주고
requestAnimationFrame(main) 함수로 main 함수를 계속해서 불러냄
*/
function main(){
    render();
    requestAnimationFrame(main)
}

loadImage();
main();