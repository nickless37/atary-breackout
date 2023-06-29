let Area = document.getElementById('gamearea')
let ctx = Area.getContext('2d')
let countText = document.getElementById('count_text')
let count = 0

const platformSpeed = 3
const brickItems = 3

let platform = new Image()
platform.src = 'https://i.ibb.co/6D4BGhq/Untitled-1.png'

let ball = new Image()
ball.src = 'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d5e272306bd3c69.png'

let rightRressed = false;

let leftpressed = false;

let Randombricks = []
for (let j = 0; j < brickItems; j++) {Randombricks[j] = new Image} 
Randombricks[0].src = 'SORCES/chrome_tKupstmoGF.png'
Randombricks[1].src = 'SORCES/chrome_I9qdZqkbnS.png'
Randombricks[2].src = 'SORCES/chrome_jXZJ4FYs1L.png'

let platformX = 100
let ballY = 110
let ballX = 150
let dx = -1
let dy = -1
let dxdy = Math.random() < 0.5
if (dxdy) {dx = -1} else{dx = 1}
// if (dx = 1 ) { dy = 1} else{dy = -1}
const ballR = 20
const brickRowCount = 3
const brickColumnCount = 5
const brickPadding = 10 
const brickOffsetTop = 20
const brickOffsetLeft = 18
const brickWidth = 45
const brickHeight = 10

let bricks = []

for(let c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, v: Math.floor(Math.random() * brickItems), status: 1};
    }
}


function render () {
    ctx.clearRect(0, 0, 620, 420)
    ctx.drawImage(platform, platformX, 125, 100, 10)
    ctx.drawImage(ball, ballX, ballY, 20, 20)

    function DrawBricks(){
        for(let i = 0; i<brickColumnCount; i++){                                             
            for(let r=0; r<brickRowCount; r++) {
                bricks[i][r].x = (i*(brickWidth+brickPadding))+brickOffsetLeft
                bricks[i][r].y = (r*(brickHeight+brickPadding))+brickOffsetTop
                if(bricks[i][r].status == 1){
                   ctx.drawImage(Randombricks[bricks[i][r].v],bricks[i][r].x, bricks[i][r].y, brickWidth, brickHeight)
                }
            }
        }
    }
    DrawBricks() 
    function collisionDetection(){
        for(let i = 0; i<brickColumnCount; i++){                                            
            for(let r = 0; r<brickRowCount; r++) {
                let b = bricks [i][r];
                if (b.status == 1) {
                    if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight){
                        dy = -dy
                        b.status = 0
                        count +=100
                        countText.innerHTML = count
                    }
                }
            }
        }
    }
    collisionDetection()
    if (count == 1500){
        window.location.replace('win.html')
    }

    ballX += dx
    ballY += dy

    if((ballX + dx > Area.width - ballR || ballX + dx < ballR)){
        dx = -dx
    }
    if ((ballY +dy > Area.height - ballR || ballY + dy < ballR) || (ballY+10+dy > 124 && (ballX+40+dx >platformX && ballX+dx < platformX + 100))) {
        dy = - dy
    }

    if (ballY>125 ){
        document.location.reload();
        window.location.replace('lose.html')
    }

    if (rightRressed && leftpressed === false){
        platformX = Math.min(platformX + platformSpeed, Area.width - 100)
    }
    if (leftpressed && rightRressed === false){
        platformX = Math.max(platformX - platformSpeed, 0)
    }
        window.requestAnimationFrame(render)
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if (e.key === "ArrowRight"){
    rightRressed = true;
    } else if (e.key === "ArrowLeft"){
        leftpressed = true;
    }
}

function keyUpHandler (e){
    if (e.key === "ArrowRight"){
        rightRressed = false;
    } else if (e.key === "ArrowLeft"){
        leftpressed = false;
    }
}

platform.onload = render
ball.onload = render
