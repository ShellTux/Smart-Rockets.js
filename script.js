let cv, ctx;
let population;
let paragraph;
let populationSize = 100;
let obstacles = [];


const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');

  startPoint = {
    x: cv.width / 2,
    y: cv.height
  };
  target = {
    x: cv.width / 2,
    y: 50
  };

  paragraph = document.getElementById('life');

  obstacles.push(new Obstacle(100, cv.height - 400, 500, 10));

  population = new Population(populationSize);

  let startTime = window.performance.now();
  draw();
};

window.onload = setup;

let pathFittest = [];

const draw = function() {
  background(cv, 'black');
  ctx.fillStyle = 'green';
  ctx.ellipse(target.x, target.y, 20);

  obstacles.forEach(obstacle => obstacle.show());

  population.run();

  ctx.strokeStyle = rgb(200, 10, 10);
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (pathFittest.length > 0) ctx.moveTo(pathFittest[0].x, pathFittest[0].y);
  for (let i = 1; i < pathFittest.length; i++) {
    ctx.lineTo(pathFittest[i].x, pathFittest[i].y);
    ctx.stroke();
  }
  ctx.closePath();

  if (count > lifeSpan) {
    population.evaluate();
    pathFittest = population.population[0].path;
    population.naturalSelection();
    count = 0;
  };

  paragraph.innerHTML = count++;
  setTimeout(draw, document.getElementById('interval').value);
}

class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}