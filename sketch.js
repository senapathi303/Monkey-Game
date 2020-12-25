var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var monkeycollide;
var obstacle, obstacleImage;
var FoodGroup;
var obstaclesGroup;
var ground;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkeycollide = loadImage("sprite_0.png");
 
}



function setup() {
 // createCanvas(600,600);
  
  
  var survivalTime = 0;

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("monkey colide",monkeycollide);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
     
}


function draw() {

  background(255);
  
  
  if (ground.x < 0){
      ground.x = ground.width/2;
   }
  
  if (gameState === PLAY){
  
  if (keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1.5
  
  monkey.collide(ground);
  
  if (FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
  }
  survivalTime=Math.ceil(frameCount/frameRate());
  
  fruits();
  obstacle();
    if (obstaclesGroup.isTouching(monkey)){
    
    gameState = END;
   monkey.changeAnimation("monkey colide",monkeycollide);
    
  }
  
    
    
    
  }
  else if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    
  }
  drawSprites();
  
  
  
  
  
  
  
  
  
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+survivalTime,100,80);
      
}

function fruits(){
  
if (frameCount%80===0){
  banana = createSprite(400,120,20,20);
  banana.velocityX = -4;
  banana.scale = 0.1
  banana.addImage("food",bananaImage);
  banana.y = Math.round(random(120,200));
  banana.liftime = 150;
  FoodGroup.add(banana);
}
  
}
function obstacle(){
  
  if (frameCount%300===0){
    var obstacle = createSprite(400,315,20,20)
    obstacle.velocityX = -4;
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 150
  }
  
}




