class Player {
  constructor() {
    this.size = 70;
    this.x = 50;
    this.y = height - this.size;
    this.velocityY = 0;
    this.gravity = 0.5;
  }
  show() {
    image(playerImg, this.x, this.y, this.size, this.size);
  }
  jump() {
    if (this.y === height - this.size) {
      this.velocityY = -10;
    }
  }
  move() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;
    this.y = constrain(this.y, 0, height - this.size);
  }
  collided(currentObstacle) {
    let isColliding = collideRectRect(
      this.y,
      this.x,
      this.size - 30,
      this.size - 30,

      currentObstacle.y,
      currentObstacle.x,
      currentObstacle.size - 10,
      currentObstacle.size - 10
    );
    return isColliding;
  }
}
