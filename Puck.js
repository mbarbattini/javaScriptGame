class Puck extends SideGoal {

  constructor() {
    super();
    this.radius = 20;
    this.red = 3;
    this.green = 252;
    this.blue = 211;
    this.proceed = false;
    this.position = createVector(random(width - this.radius), random(height - this.radius));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(3);
    this.acceleration = createVector();
  }

  show() {
    strokeWeight(20);
    stroke(this.red, this.green, this.blue);
    circle(this.position.x, this.position.y, this.radius);

  }

  update() {
    //damping force
    this.acceleration.add(-.003 * this.velocity.x, -.003 * this.velocity.y);
    //adding velocity and acceleration
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce() {
    if (this.position.x > width - this.radius) {
      this.velocity.x = -this.velocity.x;
    } else if (this.position.x < this.radius) {
      this.velocity.x = -this.velocity.x;
    } else {
      this.velocity.x = this.velocity.x;
    }

    if (this.position.y > height - this.radius) {
      this.velocity.y = -this.velocity.y;
    } else if (this.position.y < this.radius) {
      this.velocity.y = -this.velocity.y;
    } else {
      this.velocity.y = this.velocity.y;
    }
  }

  inside(mouseX, mouseY) {
    let d = dist(this.position.x, this.position.y, mouseX, mouseY);
    if (d < this.radius) {
      return true;
    } else {
      return false;
    }
  }

  score(element, i) {
    //left goal
    if (element.position.y > leftGoal.rightPost.y && element.position.y < leftGoal.leftPost.y && element.position.x < 20) {
      pucks.splice(i, 1);
    //right goal
    }
    if (element.position.y > rightGoal.rightPost.y && element.position.y < rightGoal.leftPost.y && element.position.x > width - 20) {
      pucks.splice(i, 1);
    }
    //topGoal
    // if (element.position.x > topGoal.rightPost.x && element.position.x < topGoal.leftPost.x && element.position.y < 100) {
    //   pucks.splice(i, 1);
    // }
    // //Bottom Goal
    // if (element.position.x > bottomGoal.rightPost.x && element.position.x < bottomGoal.leftPost.x && element.position.y > width - 100) {
    // //   pucks.splice(i, 1);
    // }
  }

  slingshot(magnitude, thisPosX, thisPosY, mouseX, mouseY) {
    let angle = 0;
    angle = atan(( - ( thisPosY - mouseY ) ) / ( thisPosX - mouseX));
    print(angle);
    //unit vector in the direction of the powerSlider
    let velocityAddition = p5.Vector.fromAngle(angle);
    //magnitude of the vector is set to how far away the powerSlider is from the puck
    velocityAddition.setMag(magnitude * .05);
    this.velocity.add(velocityAddition);
}
}
