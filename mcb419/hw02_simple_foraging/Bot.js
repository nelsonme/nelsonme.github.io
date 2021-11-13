class Bot {
  constructor() {
    this.reset();
  }

  reset() {
    // uncomment and replace with appropriate initial values 
    // this.x = ???;
    // this.y = ???;
    // this.r = ???;
    // this.heading = ???;
    // this.speed = ???;
    this.x = width - 50;
    this.y = height / 2;
    this.r = 20;
    this.heading = PI / 2;
    this.speed = 3;
    this.energy = 0;

  }

  update() {
    // add code so bot moves in a circle of diameter 300 pixels
    // do not use the 'itick' variable in your code
    this.heading += 0.02;
    this.x += this.speed * cos(this.heading);
    this.y += this.speed * sin(this.heading);
    this.consume();
  }

  consume() {
    for (let i=0; i<pellets.length; i++) {
      let p = pellets[i];
      if (dist(this.x, this.y, p.x, p.y) < this.r) {
        // bot overlaps pellet
        this.energy += 1;
        p.reset();
      }
    }
  }


  draw() {
    // add code to draw the bot
    csave(); // save context
    translate(this.x, this.y); // translate coord sys to bot location
    rotate(this.heading); // rotate coord sys to match bot heading
    fillStyle('yellow');
    strokeStyle('black');
    circle(0, 0, this.r);  // bot body
    line(0, 0, this.r, 0); // heading indicator
    crestore(); // restore context
  }
}