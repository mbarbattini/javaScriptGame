let x;
let y;

class SideGoal{

  constructor(left) {
    if (left) {
      x = 1;
    } else {
      x = width -1;
    }

    this.maxSpeed = 10;
    this.width = 1;
    this.depth = 30;
    this.position = createVector(x, height / 2);
    this.leftPost = createVector(x, 0);
    this.rightPost = createVector(x, 0);
    this.velocity = createVector(0, random(-3,3));
    this.velocity.setMag(this.maxSpeed);
  }

  update() {
    this.position.add(this.velocity);
    this.leftPost.y = this.position.y + (this.depth) + 9;
    this.rightPost.y = this.position.y - (this.depth) - 9;
  }

  show() {
    //animated goal
    push();
    stroke(255,3,100);
    noFill();
    rectMode(RADIUS);
    rect(this.position.x, this.position.y, this.width, this.depth);
    pop();
    //
    // // visual indicator for goal posts
    // push();
    // strokeWeight(10);
    // stroke(255);
    // point(this.rightPost.x, this.rightPost.y);
    // point(this.leftPost.x, this.leftPost.y);
    // pop();
  }


  bounce() {
    if (this.position.y > height - this.depth / 2) {
      this.velocity.y = -this.velocity.y;
    } else if (this.position.y < this.depth) {
      this.velocity.y = -this.velocity.y;
    }
  }
}
