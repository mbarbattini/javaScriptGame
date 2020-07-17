pucks = [];
goals = [];

let left;
let count = 0;

function setup() {
  createCanvas(600,600);
  //creating the pucks and adding them to the array
  for (i = 0; i < 100; i++) {
    pucks.push(new Puck);
  }


  //creating the goals and adding them to the array
  leftGoal = new SideGoal(true);
  append(goals, leftGoal);
  rightGoal = new SideGoal();
  append(goals, rightGoal);
  topGoal = new TopBottomGoal(true);
  append(goals, topGoal);
  bottomGoal = new TopBottomGoal();
  append(goals, bottomGoal);
}



function draw() {
  background(30);

  // iterate through each puck in one frame
  for (let i = pucks.length - 1; i >= 0; i--) {
    // if the mouse is inside a puck and the mouse is pressed
    if (pucks[i].inside(mouseX, mouseY) && mouseIsPressed) {
      //makes sure that only one power slider comes up at a time. If mouse is still being held
      //and goes over another, count should be 2 so powerslider is not animated
      if (count <= 1) {
        //draw the power slider
        pucks[i].proceed = true;
        //add one to count
        count++;
      }
    }

    //power slider remains as long as the mouse is pressed
    if (mouseIsPressed) {
      //if the object was initalized, draw the power slider
      if (pucks[i].proceed) {
        // animating the slignshot
        push();
        strokeWeight(6);
        stroke(255);
        line(pucks[i].position.x, pucks[i].position.y, mouseX, mouseY);
        pop();

        //animating the power indicator
        push();
        strokeWeight(2);
        stroke(255);
        noFill();
        let powerDistance = dist(pucks[i].position.x, pucks[i].position.y, mouseX, mouseY);
        let powerRadius = powerDistance * .5;
        circle(mouseX, mouseY, powerRadius);
        pop();
      }
    } else {
      //makes sure that each puck is set back to 0 so clicking again doesn't bring up the power slider
      pucks[i].proceed = false;
      count = 0;
    }
    //updating each puck with physics engine
    pucks[i].show();
    pucks[i].bounce();
    pucks[i].update();
    pucks[i].score(pucks[i], i);
  }

  for (let element of goals) {
    element.show();
    element.bounce();
    element.update();
  }
}
