let planes = [];
let planeImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  // load plane icon as triangle if planeImg not loaded
}

function preload() {
  planeImg = loadImage('https://upload.wikimedia.org/wikipedia/commons/e/e0/Plane_font_awesome.svg', () => {}, () => { planeImg = null; });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 220, 255); // simple blue background representing sky/map

  // update and draw planes
  for (let plane of planes) {
    plane.x += plane.vx;
    plane.y += plane.vy;

    if (plane.x > width) plane.x = 0;
    if (plane.x < 0) plane.x = width;
    if (plane.y > height) plane.y = 0;
    if (plane.y < 0) plane.y = height;

    push();
    translate(plane.x, plane.y);
    rotate(plane.angle);
    if (planeImg) {
      image(planeImg, 0, 0, 20, 20);
    } else {
      fill(255, 0, 0);
      noStroke();
      triangle(-10, 8, 10, 0, -10, -8);
    }
    pop();
  }
}

function mousePressed() {
  // add new plane at mouse with random velocity
  let angle = random(TWO_PI);
  let speed = random(1, 3);
  planes.push({ x: mouseX, y: mouseY, vx: cos(angle)*speed, vy: sin(angle)*speed, angle });
}
