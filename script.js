document.addEventListener("DOMContentLoaded", function () {
  const ball = document.getElementById("ball");
  const paddle = document.getElementById("paddle");
  const scoreDisplay = document.getElementById("score");
  const gameContainer = document.getElementById("game-container");

  let ballX = 300;
  let ballY = 200;
  let ballSpeedX = 5;
  let ballSpeedY = 5;
  let paddleY = 150;
  let score = 0;

  // Function to update game state
  function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballX <= 0) {
      resetGame();
    }
    if (ballX >= gameContainer.clientWidth - 20) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY <= 0 || ballY >= gameContainer.clientHeight - 20) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddle
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

      // Restrict paddle movement within game boundaries
      if (paddleY < 0) paddleY = 0;
      if (paddleY > gameContainer.clientHeight - paddle.clientHeight) {
        paddleY = gameContainer.clientHeight - paddle.clientHeight;
      }
    });

    // Update ball and paddle positions
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    paddle.style.top = paddleY + "px";
  }

  // Function to increase score
  function increaseScore() {
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }

  // Function to reset game when the ball goes out
  function resetGame() {
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    ballX = 300;
    ballY = 200;
    ballSpeedX = 5;
    ballSpeedY = 5;
  }

  // Start the game loop
  function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
  }

  // Initiate game loop
  gameLoop();
});
