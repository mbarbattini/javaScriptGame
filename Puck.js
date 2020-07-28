function angleFinder(thisPosX, thisPosY, mouseX, mouseY) {
  let angle = 0;

  //check if the angle is in quadrant I+II or III+IV
  //III+IV
  if (mouseY > thisPosY) {
    //atan(x/y);
    angle = atan(( thisPosX - mouseX) / ( - ( thisPosY - mouseY ) ) );
    //I+II
  } else {
    //atan(y/x)
    angle = atan(( - ( thisPosY - mouseY ) ) / ( thisPosX - mouseX));
  }

  if (mouseX > thisPosX && mouseY < thisPosY) {
    //check if the angle is in quadrant I
    angle = -angle + PI;
  } else if (mouseX < thisPosX && mouseY < thisPosY) {
    //check if the angle is in quadrant II
    angle = -angle;
  } else if (mouseX < thisPosX && mouseY > thisPosY) {
    //check if the angle is in quadrant III
    angle = angle - PI / 2;
  } else if (mouseX > thisPosX && mouseY > thisPosY) {
    //check if the angle is in quadrant IV
    angle = angle + (3 * PI ) / 2;
  }
  return angle;
}

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
    //damping force only occurs when velocity is above a threshold
    if (this.velocity.mag() > 1) {
      this.acceleration.add(-.005 * this.velocity.x, -.005 * this.velocity.y);
    }
    //adding velocity and acceleration
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //setting accelration to 0 so that it doesn't get continuously added
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
  }

  angleAnimation(thisPosX, thisPosY, mouseX, mouseY) {

    let angle = angleFinder(thisPosX, thisPosY, mouseX, mouseY);

    let velocityAddition = p5.Vector.fromAngle(angle, 100);
    let vx = velocityAddition.x;
    let vy = velocityAddition.y;
    push();
    stroke(233,44,10);
    strokeWeight(4);
    line(thisPosX, thisPosY, thisPosX + vx, thisPosY + vy);
    pop();
  }


  slingshot(magnitude, thisPosX, thisPosY, mouseX, mouseY) {

    let angle = angleFinder(thisPosX, thisPosY, mouseX, mouseY);
    // print(angle);
    //unit vector in the direction of the powerSlider
    let velocityAddition = p5.Vector.fromAngle(angle);
    //magnitude of the vector is set to how far away the powerSlider is from the puck
    velocityAddition.setMag(magnitude * .05);
    this.velocity.add(velocityAddition);
    angle = 0;
  }
}
