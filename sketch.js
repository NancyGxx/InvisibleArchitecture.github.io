let canvas;

let pts;
let bounds;

let userInput;

let font;

let growthFactor = 1;

let word;

function preload() {
  font = loadFont("ACaslonPro-Regular.otf");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed")
  userInput = select("#userInput");
}

function draw() {
  background("#002500");

  randomSeed(0);

  word = userInput.value();

  pts = font.textToPoints(word, 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0,
  });

  bounds = font.textBounds(word, 0, 0, 10);
  let multiplier = width / bounds.w;
  translate(0, height / 2 - (bounds.h * multiplier) / 2);
  translate(0, bounds.h * multiplier);

  for (let i = 0; i < pts.length; i++) {
    stroke(242, 208, 169, 127);
    line(
      pts[i].x * multiplier,
      pts[i].y * multiplier,
      pts[i].x * multiplier + random(-growthFactor * 3, growthFactor * 4),
      pts[i].y * multiplier + random(-growthFactor * 3, growthFactor * 4)
    );
    noFill();
    stroke(2);
    point(pts[i].x * multiplier, pts[i].y * multiplier);
  }
}

function mouseWheel(event) {
  growthFactor += event.delta * 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function keyReleased() {
//   if (key == "s" || key == "S") save(cnv, "myCanvas.jpg");
// }
