const PI = Math.PI;
const TWO_PI = 2 * PI;
const DEG_TO_RAD = PI / 180;
const RAD_TO_DEG = 180 / PI;

const abs = Math.abs;
const acos = Math.acos;
const asin = Math.asin;
const atan = Math.atan;
const atan2 = Math.atan2;
const ceil = Math.ceil;
const constrain = (x, lo, hi) => Math.max(Math.min(x, hi), lo);
const cos = Math.cos;
const degrees = x => (RAD_TO_DEG * x);
const dist = (x1, y1, x2, y2) => Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
const exp = Math.exp;
const floor = Math.floor;
const log = Math.log;
const log10 = Math.log10;
const min = function()  {
  if (arguments[0] instanceof Array) {
    return Math.min.apply(null, arguments[0]);
  } else {
    return Math.min.apply(null, arguments);
  }
};
const max = function ()  {
  if (arguments[0] instanceof Array) {
    return Math.max.apply(null, arguments[0]);
  } else {
    return Math.max.apply(null, arguments);
  }
};
const radians = x => (DEG_TO_RAD * x);
function random(a, b) {
  if (b) return a + (b - a) * Math.random();
  if (!a) return Math.random();
  if (Array.isArray(a)) { // pick one
    return a[Math.floor(a.length * Math.random())];
  }
  return a * Math.random();
};
const remap = function (n, start1, stop1, start2, stop2, withinBounds = true) {
  let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};
const round = Math.round;
const sin = Math.sin;
const sq = x => x * x;
const sqrt = Math.sqrt;
const tan = Math.tan;
const pow = Math.pow;