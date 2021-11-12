// HW01 template - simple movement 

// global variables
var paused = false;
var itick; // simulation clock
var bot; // bot object
var ticksPerSecond = 30;

function setup() {
  initCanvas('cnv1',400, 400)
  bot = new Bot(); // NEW CODE
  reset();
}

function reset() {
  paused = true;
  itick = 0;
  bot.reset(); // NEW CODE
  draw();
}

function update() {
  itick++;
  bot.update(); // NEW CODE
}

function draw() {
  background('lightBlue');
  bot.draw(); // NEW CODE
  // print tick count in upper left corner
  fillStyle('black');
  noStroke();
  text('tick = ' + itick, 15, 15);
}

function run() {
  if (isFinished()) return;
  paused = false;
  tick();
}

function single_step() {
  paused = true;
  if (isFinished()) return;
  update();
  draw();
  if (isFinished()) finish();
}

function tick() {
  if (!paused) {
    setTimeout(tick, 1000 / ticksPerSecond);
    update();
    draw();
    if (isFinished()) { paused = true; finish(); }
  }
}

function pause() {
  paused = true;
}

function finish() {
  // put a message below the tick counter
  text('finished!', 15, 30);
}

function isFinished() {
  return itick === 314;
}