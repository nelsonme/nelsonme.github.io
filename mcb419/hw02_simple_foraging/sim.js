// HW01 template - simple movement 

// global variables
var paused = false;
var itick; // simulation clock
var bot; // bot object
var pellets; // array of pellets
var ticksPerSecond = 30;
var outArea; // output area

function setup() {
  initCanvas('cnv1', 400, 400)
  bot = new Bot();
  pellets = [];
  for (let i = 0; i < 100; i++) pellets.push(new Pellet());
  reset();
  outArea = document.getElementById('out');
}

function reset() {
  paused = true;
  itick = 0;
  for (let i = 0; i < pellets.length; i++) pellets[i].reset();
  bot.reset();
  draw();
}

function update() {
  itick++;
  bot.update();
}

function draw() {
  background('lightBlue');
  for (let i = 0; i < pellets.length; i++) pellets[i].draw();
  bot.draw();
  // print tick count in upper left corner
  noStroke();
  fillStyle('#ddd');
  rect(0, 0, 100, 40);
  fillStyle('black');
  text('tick = ' + itick, 15, 15);
  text('energy = ' + bot.energy, 15, 30);
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
  return itick === 2000;
}