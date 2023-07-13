// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {
  constructor(position, string = "add text") {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.pos = position.copy();
    this.lifespan = 255;
    this.string = string;
    this.targetCounter = 1;
    this.minTargetDist = 15;
    this.txtSize = random(10, 20);
    this.maxSpeed = random(2, 5);
    this.maxForce = random(0.1, 0.9);
    this.applyForce = (force) => this.acceleration.add(force);
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.pos.add(this.velocity);

    this.lifespan -= 0.5;
  }

  // Method to display
  display() {
    stroke(200, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan);
    //ellipse(this.pos.x, this.pos.y, 12, 12);
    textFont("Georgia");
    textSize(this.txtSize);
    text(this.string, this.pos.x, this.pos.y);
  }

  // pass all targets to particle
  // if its near the target then go to the next target
  // if its completed a the targets then go back to the first
  seek(targets) {
    let i = this.targetCounter;
    let target = targets[i];
    let distance = target.dist(this.pos);
    if (distance < this.minTargetDist) {
      this.targetCounter++;
      if (this.targetCounter == targets.length) {
        this.targetCounter = 0;
      }
    }
    //Apply velocity and accelration
    //     //Apply velocity
    //     // see Dan Shiftman example
    let desired = p5.Vector.sub(target, this.pos);
    desired.normalize();
    desired.mult(this.maxSpeed);
    let steer = new p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}
