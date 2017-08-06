const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");

//////////////// Config /////////////////////
const NUM_CIRCLES = 800;
const GROW_RADIUS = 50;
const MAX_RADIUS = 40;
const COLORS = [
  "#E6E2AF",
  "#A7A37E",
  "#EFECCA",
  "#046380",
  "#002F2F"
];


//////////////// Events /////////////////////
class Mouse {
  constructor() {
    this.x = null;
    this.y = null;
  }
}

const mouse = new Mouse();

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})


//////////////// Animation ////////////////

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.originalRadius = radius;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = this.color;
    context.fill();
  }

  shouldGrow() {
    const inXRange = mouse.x - this.x < GROW_RADIUS && mouse.x - this.x > -GROW_RADIUS;
    const inYRange = mouse.y - this.y < GROW_RADIUS && mouse.y - this.y > -GROW_RADIUS;
    const notTooBig = this.radius < MAX_RADIUS;
    return inXRange && inYRange && notTooBig;
  }

  update() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (this.shouldGrow()) {
      this.radius += 1;
    } else if (this.radius > this.originalRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

let circles = [];
function init() {
  circles = [];
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < NUM_CIRCLES; i++) {
    const radius = Math.random() * 3 + 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 3;
    const dy = (Math.random() - 0.5) * 3;
    circles.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach(circle => circle.update());
}

init();
animate();
