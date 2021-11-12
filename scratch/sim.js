var _FPS = 1; // frameRate (frames per second)
var _updatesPerFrame = 1;

var sim = {};
sim.paused = true;

sim.setup = function () {
  sim.paused = true;
  setup(); // user
  reset(); //user
  draw(); // user
}

sim.pause = () => { sim.paused = true; draw(); }
sim.reset = () => { sim.paused = true; reset(); draw(); }
sim.run = () => { sim.paused = false; sim.tick(); }
sim.step = () => { sim.paused = true; update(); draw(); }
sim.tick = function () {
  if (!sim.paused) {
    setTimeout(sim.tick, 1000 / _FPS);
    for (let i = 0; i < _updatesPerFrame; i++) {
      update();
      if (isFinished()) { sim.paused = true; finish(); break; }
    }
  }
  draw()
}

const isPaused = () => sim.paused;
const redraw = () => { sim.paused = true; draw(); };
const frameRate = (rate) => rate ? _FPS = rate : _FPS;
const updatesPerFrame = (num) => num ? _updatesPerFrame = num : _updatesPerFrame;

// empty versions of user-defined functions
draw = () => { };
finish = () => { };
isFinished = () => false;
reset = () => { };
setup = () => { };
update = () => { };