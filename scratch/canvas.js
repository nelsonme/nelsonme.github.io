var cnv; // current canvas
var ctx; // current context
var height, width;

// canvas(id) sets the current canvas 
function canvas(cnv_id) {
  cnv = document.getElementById(cnv_id);
  if(!cnv._initialized) {
    throw new Error(`canvas ${cnv_id} has not been initialized. call initCanvas(cnv_id, width, height) first.`);
  }
  // see if the context has already been defined
  // otherwise set some defaults
  // set global ctx to current context
  if (!cnv.ctx) {
    ctx = cnv.getContext('2d');
    cnv.ctx = ctx;
    ctx._doFill = true;
    ctx._doStroke = true;
    ctx.font = '12px sans-serif';
  } else {
    ctx = cnv.ctx;
  }
}

function initCanvas(cnv_id, w, h) {
  // must specify width and height during init to avoid canvas/css mismatch
  // do not rely on css to specify canvas size
  if(arguments.length !== 3) throw new Error("initCanvas: requires 3 arguments");
  cnv = document.getElementById(cnv_id);
  if (!cnv) {
    cnv = document.createElement('canvas');
    cnv.id = cnv_id;
    cnv.width = w;
    cnv.height = h;
    document.body.appendChild(cnv);
  } else {
    // found existing canvas; requesting size change?
    cnv.width = w;
    cnv.height = h;
    // set globals
    height = cnv.height;
    width = cnv.width;
  } 
  cnv._initialized = true;
  canvas(cnv_id);
}

function background(r, g, b, a) {
  ctx.save();
  if (arguments.length === 0) ctx.fillStyle = 'gray';
  else if (arguments.length === 1) ctx.fillStyle = color(r);
  else if (arguments.length === 3) ctx.fillStyle = color(r, g, b);
  else if (arguments.length === 4) ctx.fillStyle = color(r, g, b, a);
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  if (ctx._doStroke) ctx.stroke();
  if (ctx._doFill) ctx.fill();
}

function color() {
  let a = arguments;
  if (typeof a[0] === 'string') return a[0];
  if (a.length === 1) return `rgb(${a[0]}, ${a[0]}, ${a[0]})`;
  if (a.length === 3) return `rgb(${a[0]}, ${a[1]}, ${a[2]})`;
  let alpha = a[3] <= 1 ? a[3] : a[3] / 255;
  return `rgba(${a[0]}, ${a[1]}, ${a[2]}, ${alpha})`;
}

function crestore() {
  ctx.restore();
}

function csave() {
  ctx.save();
}

function ellipse(x, y, w, h = w) {
  ctx.beginPath();
  ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
  ctx.closePath();
  if (ctx._doFill) ctx.fill();
  if (ctx._doStroke) ctx.stroke();
}

function fillStyle(r, g, b, a) {
  ctx._doFill = true;
  if (arguments.length === 0) ctx.fillStyle = 'black';
  else if (arguments.length === 1) ctx.fillStyle = color(r);
  else if (arguments.length === 3) ctx.fillStyle = color(r, g, b);
  else if (arguments.length === 4) ctx.fillStyle = color(r, g, b, a);
}

function fontSize(val) {
  textSize(val);
}

function line(x1, y1, x2, y2) {
  if (!ctx._doStroke) return;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function lineWidth(w) {
  if (typeof w === 'undefined' || w === 0) {
    // hack because lineWidth 0 doesn't work
    ctx.lineWidth = 0.0001;
  } else {
    ctx.lineWidth = w;
  }
}


function noFill() {
  ctx._doFill = false;
}

function noStroke() {
  ctx._doStroke = false;
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  if (ctx._doFill) ctx.fill();
  if (ctx._doStroke) ctx.stroke();
}

function rotate(degrees) {
  ctx.rotate(degrees * Math.PI / 180);
}

function scale(sx, sy = sx) {
  ctx.scale(sx, sy);
}

function strokeStyle(r, g, b, a) {
  ctx._doStroke = true;
  if (arguments.length === 0) ctx.strokeStyle = 'black';
  else if (arguments.length === 1) ctx.strokeStyle = color(r);
  else if (arguments.length === 3) ctx.strokeStyle = color(r, g, b);
  else if (arguments.length === 4) ctx.strokeStyle = color(r, g, b, a);
}

function strokeWeight(w) {
  this.lineWidth(w);
}

function text(str, x, y) {
  if (typeof str !== 'string') throw new Error("text: first argument must be a string")
  if (ctx._doFill) ctx.fillText(str, x, y);
}

function textAlign(str) { // "left" "right" "center"
  ctx.textAlign = str;
}

function textSize(fontSize) {
  ctx.font = fontSize + 'px sans-serif';
}

function translate(x, y) {
  ctx.translate(x, y);
}