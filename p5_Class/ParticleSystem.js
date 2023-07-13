// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class ParticleSystem {
  constructor(jsonArr) {
    this.riverNames = new RiverNames(jsonArr);
    this.particles = [];
    this.targets = [];
    this.targetDist = 35;
    this.targetCounter = 0;
    this.minDist = 35;
    this.drawLn = 1;
    this.lifeSpan = 255;
    this.pCount = 0;

    //----------------------------------------

    //----------------------------------------
    this.drawLine = function () {
      if (this.drawLn) {
        push();
        strokeWeight(20);
        stroke(180, 10, 100, this.lifeSpan);
        noFill();
        beginShape();
        for (let i = 0; i < this.targets.length; i++) {
          vertex(this.targets[i].x, this.targets[i].y);
        }
        endShape();
        pop();
      }
    };
    //----------------------------------------
    this.drawTargets = function () {
      if (this.targets.length > 0 && this.drawLn) {
        push();
        strokeWeight(10);
        stroke(0, 255, 127, this.lifeSpan);
        fill(255, this.lifeSpan);
        for (let i = 0; i < this.targets.length; i++) {
          ellipse(this.targets[i].x, this.targets[i].y, 20, 20);
        }
        pop();
      }
    };
    //----------------------------------------
    this.drawFlow = function () {
      if (this.targets.length > 1) {
        this.addParticle();

        push();
        noStroke();
        // update every particle and display them
        for (let p of this.particles) {
          p.seek(this.targets);
          p.update();
          p.display();
        }
        pop();
      }
    };
  }
  //----------------------------------------
  //Fill array with target postions
  //Release 10 particles each new target
  addPostion(target) {
    this.lifeSpan = 255;
    //if there is a target, add it to the array
    let newP = target.copy();

    //save  last postion
    let i = this.targets.length - 1;
    let lastP = this.targets[i];
    //Calc distance between new/old positions
    // let dis = p5.Vector.dist(newP, lastP);

    //add new target to array
    this.targets.push(newP);
  }

  addParticle() {
    // if there are targets in the array then add particles to the system
    //put target postitions into the particle
    if(this.targets.length > 1){
if(frameCount%10 == 2){
           this.particles.push(
      new Particle(this.targets[0], this.riverNames.getName(frameCount))
    ); 
}

    }

  }

  //----------------------------------------

  run() {
    this.drawLine();
    this.drawTargets();
    // Filter removes any elements of the array that do not pass the test
    // I am also using ES6 arrow snytax
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    // https://www.youtube.com/watch?v=mrYMzpbFz18
    this.particles = this.particles.filter((particle) => !particle.isDead());

    // Without ES6 arrow code would look like:
    // this.particles = this.particles.filter(function(particle) {
    //   return !particle.isDead();
    // });
    this.lifeSpan -= 5;
    return this.particles.length;
  }
}
