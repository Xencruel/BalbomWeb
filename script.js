const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");
const startOverScreen = document.getElementById("start-over");
const startBtn = document.getElementById("start-btn");
const gameOverScreen = document.getElementById("game-over-screen");
const characterSelect = document.getElementById("character-select");
const characterSelectBtn = document.getElementById("character-select-btn");

let character = "cat";
let characterImg = new Image();
let rockImg = new Image();
characterImg.src = "cat.png";
rockImg.src = "rock.png";

let player = { x: 50, y: 200, width: 50, height: 50, dy: 0, jumping: false };
let rock = { x: 800, y: 220, width: 40, height: 40, speed: 5 };
let score = 0;
let gameRunning = false;

function selectCharacter(choice) {
    character = choice;
    characterImg.src = choice === "cat" ? "cat.png" : "dog.png";
}

function startGame() {
    gameRunning = true;
    score = 0;
    rock.x = 800;
    player.y = 200;
    player.dy = 0;
    startOverScreen.classList.add("hidden");
    gameOverScreen.style.display = "none";
    startBtn.style.display = "none";
    startOverScreen.style.display = "none";
    
    update();
}

function update() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(characterImg, player.x, player.y, player.width, player.height);
    ctx.drawImage(rockImg, rock.x, rock.y, rock.width, rock.height);
    
    if (player.jumping) {
        player.dy += 1;
        player.y += player.dy;
        if (player.y >= 200) {
            player.y = 200;
            player.jumping = false;
        }
    }
    
    rock.x -= rock.speed;
    if (rock.x < -40) {
        rock.x = 800;
        score++;
        scoreDisplay.textContent = score;
    }
    
    if (
        player.x < rock.x + rock.width &&
        player.x + player.width > rock.x &&
        player.y < rock.y + rock.height &&
        player.y + player.height > rock.y
    ) {
        gameOver();
        return;
    }
    requestAnimationFrame(update);
}

document.addEventListener("keydown",  (e) => {
    if (e.code === "Space" && !player.jumping) {
        player.dy = -15;
        player.jumping = true;
    }
});

document.addEventListener("mousedown", () => {
    if (!player.jumping) {
        player.dy = -15;
        player.jumping = true;
    }
});

document.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Sayfa kaymasını engellemek için
    if (!player.jumping) {
        player.dy = -15;
        player.jumping = true;
    }
});

function gameOver() {
    gameRunning = false;
    scoreDisplay.textContent = score;
    scoreDisplay.textContent = score;
    gameOverScreen.style.display = "block";
    finalScoreDisplay.textContent = score;
    startBtn.style.display = "block";
    update(score);
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
    
}
