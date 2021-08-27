let player;
let playerImg;
let obsImg;
let obstacles = [];
let bg;
let gamescore = 0;
let wordClassifier;
let game_over;
let obs2;

function preload() {
  playerImg = loadImage("player.png");
  bg = loadImage("background.jpg");
  obsImg = loadImage("obstacle.png");
  obs2 = loadImage("obs2.png");
  let options = { probabilityThreshold: 0.85 };
  wordClassifier = ml5.soundClassifier("SpeechCommands18w", options);
  game_over = loadImage("game_over1.jpg");
}
function setup() {
  createCanvas(800, 500);
  player = new Player();
  wordClassifier.classify(heardWord);
}
function heardWord(error, results) {
  console.log(results[0]);
  if (results[0].label === "up") {
    player.jump();
  }
}
function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}

function draw() {
  background(bg);

  if (random(1) < 0.01) {
    obstacles.push(new Obstacle());
  }
  for (let obs of obstacles) {
    obs.show();
    obs.move();
  }

  fill("white");
  text("score:" + gamescore, 20, 20);
  player.show();
  player.move();
  for (let obs of obstacles) {
    obs.show();
    obs.move();
    if (player.collided(obs)) {
      image(game_over, 0, 0, 800, 500);
      noLoop();
    }
    if (obs.x === 50) {
      gamescore++;
    }
  }
}
