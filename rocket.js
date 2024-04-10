let count = 0;
let startPoint;
let target;

class Rocket {
  constructor(dna) {
    this.pos = createVector(startPoint.x, startPoint.y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.w = 50;
    this.h = 10;
    this.path = [];
    if (dna) this.dna = dna;
    else this.dna = new DNA();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  move() {
    let crashed = false;
    let completed = false;

    completed = Math.dist(this.pos.x, this.pos.y, target.x, target.y) < 5;

    for (let obstacle of obstacles) {
      if (this.pos.x > obstacle.x && this.pos.x < obstacle.x + obstacle.w &&
        this.pos.y > obstacle.y && this.pos.y < obstacle.y + obstacle.h) crashed = true; // TODO: add break statement to avoid looking for other obstacles
    }
    this.applyForce(this.dna.genes[count]);

    if (!completed && !crashed) {
      this.vel.add(this.acc);
      this.path.push(this.pos);
      this.pos.add(this.vel);
      this.acc.mult(0);
    } else if (completed) this.pos = createVector(target.x, target.y);
  }

  show() {
    ctx.save();
    ctx.translate(this.pos.x + this.w / 2, this.pos.y + this.h / 2);
    ctx.rotate(this.vel.heading());
    ctx.fillStyle = 'white';
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }

  update() {
    this.show();
    this.move();
  }
}

let lifeSpan = 200;

class DNA {
  constructor(genes) {
    if (genes) this.genes = genes;
    else this.genes = new Array(lifeSpan).fill().map(x => Vector.random2D());
  }

  crossover(partner) {
    let newGenes = [];
    let mid = Math.floor(Math.random() * this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) newGenes[i] = this.genes[i];
      else newGenes[i] = partner.genes[i];
    }
    return new DNA(newGenes);
  }

  mutate(rate = 0.01) {
    this.genes = this.genes.map(gene => (Math.random() < rate) ? gene : Vector.random2D().setMag(1));
  }
}