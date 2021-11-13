class Pellet {
  
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.r = 3;
  }

  draw() {
    fillStyle('darkGreen');
    noStroke();
    circle(this.x, this.y, this.r);
  }
}