let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let score = 0;
let speed = 150;

function criarBG() {
    context.fillStyle = "#1a1a1a";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "#ff4500" : "#ff8c00";
        context.fillRect(snake[i].x, snake[i].y, box - 2, box - 2);
    }
}

function drawFood() {
    context.fillStyle = "#00ff00";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            gameOverSound.play();
            exibirGameOver();
            return;
        }
    }

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
        scoreElement.textContent = 'Pontuação: ' + score;
        eatSound.play();
        if (score % 10 === 0 && speed > 50) {
            speed -= 10;
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, speed);
        }
    }

    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, speed);
let scoreElement = document.getElementById('score');
let eatSound = document.getElementById('eatSound');
let gameOverSound = document.getElementById('gameOverSound');

function iniciarJogoComDificuldade(novaVelocidade) {
    speed = novaVelocidade;
    document.getElementById('menu').style.display = 'none';
    jogo = setInterval(iniciarJogo, speed);
}

function exibirGameOver() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverScreen').style.display = 'block';
}

function voltarAoMenu() {
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.location.reload(true);
}
