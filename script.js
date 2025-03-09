document.addEventListener("DOMContentLoaded", function () {
  const ball = document.getElementById("ball");
  const paddle = document.getElementById("paddle");
  const gameContainer = document.getElementById("game-container");
  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score";
  gameContainer.appendChild(scoreDisplay);

  let ballX = 300;
  let ballY = 200;
  let ballSpeedX = 5;
  let ballSpeedY = 5;

  let paddleY = 150;
  let score = 0;

  function update() {
    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off walls
    if (ballX <= 0 || ballX >= gameContainer.clientWidth - 20) {
      ballSpeedX = -ballSpeedX;
    }

    if (ballY <= 0 || ballY >= gameContainer.clientHeight - 20) {
      ballSpeedY = -ballSpeedY;
    }

    // Bounce off paddle
    if (
      ballX <= 10 &&
      ballY + 20 >= paddleY &&
      ballY <= paddleY + 100
    ) {
      ballSpeedX = -ballSpeedX;
      increaseScore();
    }

    // Move paddle with mouse
    document.addEventListener("mousemove", function (event) {
      const mouseY = event.clientY - gameContainer.getBoundingClientRect().top;
      paddleY = mouseY - paddle.clientHeight / 2;

      // Limit paddle movement within the game container
      if (paddleY < 0) {
        paddleY = 0;
      }
      if (paddleY > gameContainer.clientHeight - paddle.clientHeight) {
        paddleY = gameContainer.clientHeight - paddle.clientHeight;
      }
    });

    // Update ball position in the DOM
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Update paddle position in the DOM
    paddle.style.top = paddleY + "px";
  }

  function increaseScore() {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }

  // Game loop
  function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
});
