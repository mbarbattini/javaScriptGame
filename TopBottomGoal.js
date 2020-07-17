class TopBottomGoal {
  constructor(top) {
    if (top) {
      y = 2;
    } else {
      y = height - 2;
    }
    this.maxSpeed = 4;
    this.width = 30;
    this.depth = 1;
    this.leftPost = createVector(0, y);
    this.rightPost = createVector(0, y);
    this.position = createVector(width / 2, y);
    this.velocity = createVector(random(-1,1), 0);
    this.velocity.setMag(this.maxSpeed);
  }

  show() {
    //animated goal posts
    push();
    stroke(255,3,100);
    noFill();
    rectMode(RADIUS);
    rect(this.position.x, this.position.y, this.width, this.depth);
    pop();

    //visual indicator for goal posts
    push();
    strokeWeight(10);
    stroke(255);
    // point(this.leftPost.x, this.leftPost.y);
    point(this.rightPost.x, this.rightPost.y);
    pop();
  }

  bounce() {
    if (this.position.x > width - this.width) {
      this.velocity.x = -this.velocity.x;
    } else if (this.position.x < this.width) {
      this.velocity.x = -this.velocity.x;
    }
  }

  update() {
    this.position.add(this.velocity);
    // this.leftPost.x = this.position.x + this.width + 9;
    this.rightPost.x = this.position.x - this.width-9;
  }

}
