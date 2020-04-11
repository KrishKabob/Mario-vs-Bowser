var END, PLAY
var Mario, Bowser, axe, axestand, bridge, fireball, firebreath, breathGroup, fireGroup, life
var gameState = PLAY;

function preload() {

}

function setup() {
  createCanvas(400, 400);
  Mario = createSprite(60, 315, 10, 10);
  Bowser = createSprite(270, 315, 10, 10);
  axe = createSprite(329, 315, 10, 10);
  axestand = createSprite(355, 350);

}

function draw() {
  background("black");

  createEdgeSprites();

  Mario.collide(leftEdge);
  Mario.collide(rightEdge);

  Mario.collide(bridge);
  bowser.collide(bridge);
  Mario.collide(axestand);
  bowser.collide(axestand);

  fireball.velocityY = fireball.velocityY + 0.3;
  Mario.velocityY = Mario.velocityY + 0.5;
  bowser.velocityY = bowser.velocityY + 0.5;

  if (gameState === PLAY) {
    if (keyDown("up") && Mario.y >= 309) {
      Mario.velocityY = -10;
    }
    if (keyWentDown("right")) {
      Mario.velocityY = 5;
    }
    if (keyWentUp("right")) {
      Mario.velocityY = 0;
    }
    if (keyWentDown("left")) {
      Mario.velocityY = -5;
    }
    if (keyWentDown("left")) {
      Mario.velocityY = 0;
    }

    rand = randomNumber(1, 7)
    if (World.frameCount % 2 === 0) {
      if (rand === 1 && bowser.y >= 306) {
        bowser.velocityY = -12;
      }
      if (World.frameCount % 60 === 0) {
        fireballs();
      }
      if (World.frameCount % 120 === 0) {
        badbreath();
      }
      if (fireGroup.isTouching(mario) || mario.isTouching(bowser) || breathGroup.isTouching(mario)) {
        mario.x = 60;
        mario.y = 315;
        fireGroup.destroyEach();
        breathGroup.destroyEach();
        life = life - 1;
      }
      if (mario.isTouching(axe)) {
        bridge.destroy();
        mario.velocityY = 0;
        text("Thank You Mario, but our princess is in another castle!,200,200");
        gameState = END;
      }
    }

    if (gameState === END) {
      mario.velocityX = mario.velocityX;
      mario.velocityY = mario.velocityY;
      bowser.velocityY = bowser.velocityY;
    }
  }
}

  function fireballs() {
    fireball = createSprite(0, 400);
    fireball.x = randomNumber(0,250);
    fireball.velocityY = randomNumber(-5, -15);
    fireball.scale = 0.2;
    fireGroup.add(fireball);
  }

  function badbreath() {
    firebreath = createSprite(270, 0);
    firebreath.y = bowser.y;
    firebreath.velocityX = -3;
    breathGroup.add(firebreath);
  }