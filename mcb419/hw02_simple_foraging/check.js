function check() {

  outArea.textContent = ''; //clear

  reset();

  // make sure bot and pellets exist
  if (!assert(typeof(bot) === 'object', 'bot exists')) return;
  if (!assert(Array.isArray(pellets), 'pellets array exists')) return;
  if (!assert(pellets.length === 100, '100 pellets total')) return;

  // make sure bot.energy exists in is initialized to zero
  if (!assert('energy' in bot, 'bot energy exists')) return;
  if (!assert(bot.energy === 0, 'initial bot energy is zero')) return;

  // make sure bot.consume funtion exists
  if (!assert('consume' in bot, 'bot consume method exists')) return;
  if (!assert(typeof(bot.consume === 'function'), 'consume is a function')) return;

  // make sure pellet x and y both exist
  let p = pellets[99];
  if (!assert('x' in p, 'pellet x exists')) return;
  if (!assert('y' in p, 'pellet y exists')) return;

  // check bot initial state
  let x0 = width - 50;
  let y0 = height / 2;
  let heading0 = PI / 2;

  if (!assert(approx(bot.x, x0), 'initial bot x location')) return;
  if (!assert(approx(bot.y, y0), 'initial bot y location')) return;
  if (!assert(approx(bot.heading, heading0), 'initial bot heading')) return;

  // single step test
  bot.update();
  let d = dist(bot.x, bot.y, x0, y0);
  if (!assert(approx(d, 3.0), 'bot step length')) return;
  if (!assert(approx(bot.heading, heading0 + 0.02), 'bot delta heading')) return;

  // bot loop test
  // bot should complete one loop in approx 314 step
  reset();
  testloop();
  function testloop() {
    update();
    draw();
    if (itick < 314) {
      setTimeout(testloop, 1);
    } else {
      assert(bot.energy > 9 && bot.energy < 50, 'final amount of energy collected');}
  }

}

function approx(a, b) {
  let eps = max([0.01 * abs(a), 0.01 * abs(b), 0.01]);
  return abs(a - b) < eps
}

function assert(test, str) {
  return test ? passed(str) : failed(str);
}

function passed(str) {
  outArea.textContent += (str + ' ... OK\n');
  return true;
}

function failed(str) {
  outArea.textContent += (str + ' ... FAILED\n');
  return false;
}