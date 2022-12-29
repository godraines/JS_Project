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

// game over when it is true
let gameOver = false;

// mapping spaceship - it moves constantly
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-64;

// save bullet list
let bulletList = [];

// save score
let score = 0;

// setting bullet position
// change this to class
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX+18;
        this.y = spaceshipY;
        this.alive = true;  // alive bullet
        bulletList.push(this);
    };

    // bullet speed
    this.update = function(){
        this.y -= 2;
    };

    this.checkHit = function(){
        for( let i = 0; i , i < enemyList.length; i++ ){
            // bullet y <= enemy y && bullet x >= enemy x && bullet x <= enemy x + 40
            if( this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+40 ){
                score ++;
                this.alive = false; // dead bullet
                enemyList.splice(i, 1); // take off dead enemy
            };
        };
    };
}

function generateRandomValue(min, max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;
}

let enemyList = [];

function enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = generateRandomValue(0, canvas.width-64);
        this.y = 0;
        enemyList.push(this);
    };

    // enemy speed
    this.update = function(){
        this.y += 1;

        if( this.y >= canvas.height-64 ){
             gameOver = true;
             console.log("gameover");
        };
    };
}

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

        // shotting a bullet when key is up
        if( event.key == " " ){
            createBullet()
        }
    });
}

function createBullet(){
    let b = new Bullet();
    b.init();
}

function createEnemy(){
    // call something when I want to
    const interval = setInterval(function(){
        let e = new enemy();
        e.init();
    }, 1000);
}

function update(){
    // right key
    if( 'ArrowRight' in keysDown ){
        spaceshipX += 2;
    };

    // left key
    if( 'ArrowLeft' in keysDown ){
        spaceshipX -= 2;
    };

    // limit the ship's movement up to the canvas size
    if( spaceshipX <= 0 ){
        spaceshipX = 0;
    };

    if( spaceshipX >= canvas.width-64 ){
        spaceshipX = canvas.width-64;
    };

    // update y value of bullet
    for( let i = 0; i < bulletList.length; i++ ){
        if( bulletList[i].alive ){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    };

    for( let i = 0; i < enemyList.length; i ++ ){
        enemyList[i].update();
    };
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
    ctx.fillText(`Score: ${score}`, 20, 20);
    ctx.fillStyle="white";
    ctx.font = "20px Arial"

    for( let i = 0; i < bulletList.length; i++){
        if( bulletList[i].alive ){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        };
    };

    for( let i = 0; i < enemyList.length; i++ ){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    };
}

/* 
to show images, the image should be called constantly
to do that, call render function in main
then call main function constantly to using animation function
*/
function main(){
    if( !gameOver ){
        update();
        render();   // drawing
        requestAnimationFrame(main)
    } else {
        ctx.drawImage(gameOverImage, 10, 100, 380, 380);
    };
}

loadImage();
setupKeyboardListener();
createEnemy();
main();