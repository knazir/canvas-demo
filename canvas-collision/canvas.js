const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");

//////////////// Config /////////////////////
const GRAVITY = 1;
const VERTICAL_FRICTION = 0.9;
const HORIZONTAL_FRICTION = 0.95;
const NUM_BALLS = 200;
const MAX_RADIUS = 20;
const MIN_RADIUS = 8;
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

function reset() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}

window.addEventListener("resize", reset)
window.addEventListener("click", reset);


//////////////// Animation ////////////////

class Circle {
  constructor(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * VERTICAL_FRICTION;
      this.dx = this.dx * HORIZONTAL_FRICTION;
    } else {
      this.dy += GRAVITY;
    }

    if (this.x + this.dx + this.radius >= canvas.width ||
        this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let balls = [];
function init() {
  balls = [];
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < NUM_BALLS; i++) {
    const radius = Math.random() * MAX_RADIUS + MIN_RADIUS;
    const x = (Math.random() * canvas.width - radius) + radius;
    const y = Math.random() * canvas.height - radius;
    const dx = Math.random() * 2 * (Math.random() > 0.5) ? 1 : -1;
    const dy = Math.random() * 2 * (Math.random() > 0.5) ? 1 : -1;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    balls.push(new Circle(x, y, radius, dx, dy, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  balls.forEach(ball => ball.update());
}

init();
animate();
