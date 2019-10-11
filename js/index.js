// Variables
// --------------------------------------------------------------------------------

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d')

const img = new Image;
let imageLoaded = false;
img.onload = function () {
    imageLoaded = true;
};
img.src = "./imgs/apple.jpg";

const img1 = new Image;
let image1Loaded = false;
img1.onload = function () {
    image1Loaded = true;
};
img1.src = "./imgs/Stop.jpg";

const sprite = new Image()
let spriteLoaded = false;
sprite.onload = function() {
    spriteLoaded = true;
}
sprite.src = "./imgs/snake-sprite.png";


const unitSize = 40;
// const rows = 20;
// const columns = 20;
const rows = 20;
const columns = 20;
let score = 0;

const maxWidth = unitSize * columns;
const maxHeight = unitSize * rows;
let isGameOver = false;

let randomRectPos = {
    x: 0,
    y: 0
}

let snakePos = {
    x: 0,
    y: 2
}

let snakeArray = [
     {
         x: 0,
         y: 2
     },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 0
    }
]; 
let direction = {
    x: 0,
    y: 0
}

let posInterval;

let stopsArray;


// Functions
// ------------------------------------------------------------------------------------
function advanceSnake(wasHungry) {
    if (wasHungry) {
        score += 10;
        document.getElementById('score').innerText = score;
        createFood();
    }
}

function drawGrid() {
    ctx.strokeStyle = '#d4d4d4'
    for (let rowCounter = 0; rowCounter <= rows; rowCounter++) {
        drawRow(rowCounter);
    }
    for (let columnCounter = 0; columnCounter <= columns; columnCounter++) {
        drawColumn(columnCounter);
    }
}

function drawRow(index) {
    const y = unitSize * index;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(maxWidth, y);
    ctx.stroke();
}

function drawColumn(index) {
    const x = unitSize * index;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, maxHeight);
    ctx.stroke();
}


function createFood() {
    randomRectPos.x = Math.round((columns - 1) * Math.random())
    randomRectPos.y = Math.round((rows - 1) * Math.random())
}

function drawRandomRect() {
    const x = randomRectPos.x * unitSize;
    const y = randomRectPos.y * unitSize;
    if (imageLoaded) {
        ctx.drawImage(img, x, y, unitSize, unitSize);
    }
}

function drawGreenSnake() {

    for (let i = 0; i < snakeArray.length; i++) {
        const x = snakeArray[i].x * unitSize;
        const y = snakeArray[i].y * unitSize;

        if (i === 0) {
            drawKopf(x, y);
        } else if (i +1 === snakeArray.length) {
            ctx.drawImage(sprite, 2*256, 4*256, 256, 256, x, y, unitSize, unitSize);
        }
        else {
            ctx.drawImage(sprite, 0*256, 2*256, 256, 256, x, y, unitSize, unitSize);
        }
    }
}

function drawStop(xInput, yInput) {
    const x = xInput * unitSize;
    const y = yInput * unitSize;
    if (image1Loaded) {
        ctx.drawImage(img1, x, y, unitSize, unitSize);
    }
}

function drawKopf(xInput, yInput) {
    if (spriteLoaded) {
    
        let posXOffset = 2;
        if(direction.x === 1) {
            posXOffset = 1;
        } else if(direction.x === -1) {
            posXOffset = 3;
        } else if(direction.y === 1) {
            posXOffset = 2;
        } else if(direction.y === -1) {
            posXOffset = 0;
        }

        let posYOffset = 1;

        // wenn (apfel in der nähe) -> posYOffset = 0, sonst posYOffset = 1

        const kopfPos = snakeArray[0];

        const distanceX = Math.abs(randomRectPos.x - kopfPos.x);
        const distanceY = Math.abs(randomRectPos.y - kopfPos.y);

        if (distanceX <= 1 && distanceY <= 1){
           posYOffset = 0;
        }
        // Die folgende Zeile zeichnet den Kopf mit dem Maul zu.
        ctx.drawImage(sprite, posXOffset*256, posYOffset * 256, 256, 256, xInput, yInput, unitSize, unitSize);

        // Die folgende Zeile zeichnet den Kopf mit dem Maul zu.
        //ctx.drawImage(sprite, x*256, 0, 270, 270, xInput, yInput, unitSize, unitSize);


// //        ctx.save();
//         // ctx.translate(unitSize/2,unitSize/2);
//          ctx.rotate(90*Math.PI/180);

//         const halfUnitSize = 0.5*unitSize;
//         const centerX = maxWidth/2 - halfUnitSize
//         const centerY = maxHeight/2 - halfUnitSize
//         ctx.setTransform(1, centerX, centerY, 1, centerX + unitSize,  centerY + unitSize);
//         ctx.drawImage(sprite, 40, 0, 270, 270, centerX, centerY, unitSize, unitSize);
//         // ctx.restore();
    }
}

function drawStops() {
    for (let i = 0; i < stopsArray.length; i++) {
        const stopCoordinates = stopsArray[i];

        drawStop(stopCoordinates.x, stopCoordinates.y)

        // console.log(i)
    }
}
      
      

function gameOver() {
    isGameOver = true;
    clearInterval(posInterval);
    console.warn("Game Over");
}

// Game
// ------------------------------------------------------------------------------------
function update() {
    if (direction.x !== 0 || direction.y !== 0) {
        let wasHungry = false;

        snakePos.x = snakeArray[0].x + direction.x;
        snakePos.y = snakeArray[0].y + direction.y;

        if (snakePos.x === randomRectPos.x && snakePos.y === randomRectPos.y) {
            wasHungry = true;
            createFood();
        }

        for (let i = 0; i < stopsArray.length; i++) {
            const stopPos = stopsArray[i];
            if (snakePos.x === stopPos.x && snakePos.y === stopPos.y) {
                gameOver();
                return;
            }
        }



        advanceSnake(wasHungry);

        if (snakePos.x < 0 || snakePos.x >= columns) {
            gameOver();
        } else if (snakePos.y < 0 || snakePos.y >= rows) {
            gameOver();
        }
        else {
            // const startTime = performance.now();
            const uniqueXPos = [];
            const uniqueYPos = [];
            for (let idx = 0; idx < snakeArray.length; idx++) {
                const item = snakeArray[idx];
                const idxX = uniqueXPos.indexOf(item.x);
                if (idxX >= 0 && uniqueYPos[idxX] === item.y) {
                    gameOver();
                    return
                } else {
                    uniqueXPos.push(item.x)
                    uniqueYPos.push(item.y)
                }
            }

            snakeArray = [
                {
                    x: snakePos.x,
                    y: snakePos.y
                },
                ...snakeArray
            ]

            if (!wasHungry) {
                snakeArray.pop()
            }
        }
    }
}


function render() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, maxWidth, maxHeight);
        drawGrid();
        drawGreenSnake();
        drawRandomRect();

        // drawStop(7, 14);
        // drawStop(16, 4);

        drawStops();


        requestAnimationFrame(render);
    }
}

function setup() {
    stopsArray = [
        {
            x: 16,
            y: 4
        },
        {
            x: 7,
            y: 14
        },
        {
            x: 3,
            y: 9
        }
    ]

    canvas.width = maxWidth
    canvas.height = maxHeight

    posInterval = setInterval(() => {
        update();
    }, 200)

    createFood();
    requestAnimationFrame(render);

    document.addEventListener('keyup', function (event) {
        switch (event.code) {
            case 'ArrowUp':
                if (direction.y != 1) {
                    direction = {
                        x: 0,
                        y: -1
                    }
                }
                break;
            case 'ArrowDown':
                if (direction.y != -1) {
                    direction = {
                        x: 0,
                        y: 1
                    }
                }
                break;
            case 'ArrowLeft':
                if (direction.x != 1) {
                    direction = {
                        x: -1,
                        y: 0
                    }
                }
                break;
            case 'ArrowRight':
                if (direction.x != -1) {
                    direction = {
                        x: 1,
                        y: 0
                    }
                    break;
                }
        }
        update();
    })
}

setup();
