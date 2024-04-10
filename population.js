class Population {
  constructor(number) {
    this.population = new Array(number).fill().map(x => new Rocket());
  }

  run() {
    let near = this.population.reduce((a, b) => Math.distSq(b.pos.x, b.pos.y, target.x, target.y) < Math.distSq(a.pos.x, a.pos.y, target.x, target.y) ? b : a);
    ctx.lineWidth = 3;
    ctx.strokeStyle = rgb(10, 10, 250);
    ctx.line(near.pos.x, near.pos.y, target.x, target.y);
    this.population.forEach(individual => individual.update());
  }

  evaluate() {
    this.population.forEach(rocket => rocket.fitness = 1 / Math.dist(rocket.pos.x, rocket.pos.y, target.x, target.y));
    this.population.sort((a, b) => b.fitness - a.fitness);
    let maxFit = this.population.reduce((a, b) => b.fitness > a ? b.fitness : a, 0);
    this.population.forEach(rocket => rocket.fitness /= maxFit);
  }

  naturalSelection() {
    let matingPool = [];
    for (let i = 0; i < this.population.length; i++) {
      let n = this.population[i].fitness * 100;
      for (let j = 0; j < n; j++) matingPool.push(this.population[i]);
    }

    let newRockets = [];
    for (let i = 0; i < this.population.length; i++) {
      let parentA = random(matingPool).dna;
      let parentB = random(matingPool).dna;
      let child = parentA.crossover(parentB);
      child.mutate(0.001);
      newRockets[i] = new Rocket(child);
    }
    this.population = newRockets;
  }
}