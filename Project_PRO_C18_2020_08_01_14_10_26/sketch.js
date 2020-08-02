//Sprites
var monkey, monkeyAnimation, scene, sceneImage, stoneGroup, stoneImage, bananaGroup, bananaImage, InvisibleGround, gameOverImage,gameover;

//Gamestates
var PLAY, END, gameState;


function preload(){
  monkeyAnimation=loadImage("Monkey_01.png");
  
  sceneImage=loadImage("jungle.jpg");
  
  stoneImage=loadImage("stone.png");
  
  bananaImage=loadImage("banana.png");
  
  gameOverImage=loadImage("g-o.png");

}


function setup() {
  createCanvas(600,300);
  
  PLAY=1;
  END=0;
  gameState=PLAY;

  

  scene=createSprite(300,150,10,10);
  scene.addImage(sceneImage);
  scene.scale=1.25;

  monkey=createSprite(50,260,10,10);
  monkey.addImage(monkeyAnimation);
  monkey.scale=0.15;

  invisibleGround=createSprite(300,300,600,10);
  invisibleGround.visible=false;
  
  stoneGroup=createGroup();
  bananaGroup=createGroup();
  
}


function draw(){
 background(255);
  
  if (gameState===PLAY){
    
    //scene setup
  scene.velocityX=-2;
  if(scene.x<0){
  scene.x=scene.width/2
  }
    
    
    //monkey Setup
    if (keyDown("space")){
      monkey.velocityY=-10;
    }
   monkey.velocityY=monkey.velocityY+0.8;
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      monkey.scale=monkey.scale+0.01;
    }
    
    if(monkey.isTouching(stoneGroup)){
      gameState=END;
    }
    
    //spawning obstacle
    spawnStone();
    
    //spawning Banana
    spawnBanana();
  }
  
  if(gameState===END){
    scene.velocityX=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    text("game Over",300,150);
    textsize=50;
    stoneGroup.setLifetimeEach(stoneGroup+1)
    bananaGroup.setLifetimeEach(bananaGroup+1)
    gameover=createSprite(300,150,10,10);
    gameover.addImage(gameOverImage);
    gameover.scale=0.3
  }
  
  
  monkey.collide(invisibleGround);
  drawSprites();
}

function spawnStone(){
 if (World.frameCount%150===0) {
   var stone=createSprite(640,270,10,10);
   stone.addImage(stoneImage);
   stone.scale=0.2;
   stone.lifetime=120;
   stone.velocityX=-5;
   stoneGroup.add(stone);
 }
}

function spawnBanana(){
 if (World.frameCount%250===0) {
   var banana=createSprite(640,270,10,10);
   banana.addImage(bananaImage);
   banana.lifetime=120;
   banana.scale=0.05;
   banana.velocityX=-5;
   bananaGroup.add(banana);
 }
}