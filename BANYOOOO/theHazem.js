//board
let board;
let boardW = 1050;
let boardH = 350;
let context;

//mc
let mcW = 80;
let mcH = 145;
let mcX = 50;
let mcY = boardH - mcH;
let mcImage;

let mc = {
    x: mcX,
    y: mcY,
    width: mcW,
    height: mcH
}

// let spaceshipW = 300;
// let spaceshipH = 150;
// let spaceshipX = 750;
// let spaceshipY =0;
// let spaceshipImage;

// let spaceship = {
//     x: spaceshipX,
//     y: spaceshipY,
//     width: spaceshipW,
//     height: spaceshipH
// }

//obstacles
let obstArray = [];

let calcW=50;
let tableW=60;
let cacW=41;

let obstH=50;
let obstX=1000;
let obstY=boardH-obstH;

let calcImg;
let tableImg;
let cacImg;

//mechanics
let velocityX=-6; //left spd
let velocityY=0; //jumping
let gravity=0.4;

let gameOver = false;
let framecount=0;
let score=0;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardH;
    board.width = boardW;

    context = board.getContext("2d"); //drawing

    mcImage = new Image();
    mcImage.src = "./IMG/MCFrame1.png";
    mcImage.onload = function(){
        context.drawImage(mcImage, mc.x, mc.y, mc.width, mc.height);
    }

    // spaceshipImage = new Image();
    // spaceshipImage.src = "./IMG/spaceship.png";
    // spaceshipImage.onload = function(){
    //     context.drawImage(spaceshipImage, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
    // }

    calcImg = new Image();
    calcImg.src = "./IMG/calc.png";

    tableImg = new Image();
    tableImg.src = "./IMG/table.png";

    cacImg = new Image();
    cacImg.src = "./IMG/cac.png";
    

    requestAnimationFrame(update);
    setInterval(placeObstacle,1000); //1000 ms = 1 sec
    document.addEventListener("keydown",jumpMC);
    
}

function update(){
    framecount++;
    requestAnimationFrame(update);

    if(gameOver)
        return;

    context.clearRect(0,0,board.width,board.height);
    //mc
    velocityY+=gravity;
    mc.y=Math.min(mc.y+velocityY,mcY);

    context.drawImage(mcImage, mc.x, mc.y, mc.width, mc.height);
    // context.drawImage(spaceshipImage, spaceship.x, spaceship.y, spaceship.width, spaceship.height);

    if(framecount%5==0){
        //score
        context.fillStyle="white";
        context.font="20px arial";
        score++;
        context.fillText(score,5,20);
        }
    //obstacle
    for(let i=0; i<obstArray.length;i++){
        let obstacle = obstArray[i];
        obstacle.x+=velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        if(checkCollision(mc,obstacle))
        {
            gameOver=true;
            context.fillStyle="white";
            context.font="20px arial";
            context.fillText(score,5,20);

            context.fillStyle="white";
            context.font="50px serif";
            context.fillText("Game Over",425,175);
        }       
    }

}

function placeObstacle(){

    if(gameOver)
        return;

    let obstacle ={
        img: null,
        x: obstX,
        y: obstY,
        width: null,
        height: obstH
    }

    let placeObstacleChance = Math.random(); //0-0.99999 chance

    if(placeObstacleChance>.90){
        obstacle.img = calcImg;
        obstacle.width=calcW;
        obstArray.push(obstacle);
    }
    else if(placeObstacleChance>.70){
        obstacle.img = tableImg;
        obstacle.width=tableW;
        obstArray.push(obstacle);
    }
    else if(placeObstacleChance>.50){
        obstacle.img = cacImg;
        obstacle.width=cacW;
        obstArray.push(obstacle);
    }

    if(obstArray.length>5){
        obstArray.shift();
    }


}



function jumpMC(e){
    if(gameOver)
        return;
    if((e.code =='Space'||e.code =='KeyW')&& mc.y==mcY){
        velocityY=-10;
    }
}

function checkCollision(dumA,dumB){

    return dumA.x < dumB.x + dumB.width &&
           dumA.x + dumA.width > dumB.x &&
           dumA.y < dumB.y + dumB.height &&
           dumA.y + dumA.height > dumB.y;
}