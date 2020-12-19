var PLAY =1;
var END =0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
 var invisibleGround;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
          
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true;
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

        ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
         }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
            }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnFruits();
  
    //spawn obstacles on the ground
    spawnObstacles();
     
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.velocityY = 0; 
        monkey.velocityX = 0;
    }
  }
   else if (gameState === END) {
      
      
     
     //change the trex animation
    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
   foodGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  

  drawSprites();
}




function spawnObstacles(){
 if (frameCount % 60 === 0){
   var rocks = createSprite(600,165,10,40);
   rocks.velocityX = -(6 + score/100);
   rocks.addImage(obstacleImage);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
              
    }
   
    //assign scale and lifetime to the obstacle           
    rocks.scale = 0.1;
    rocks.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(rocks);
 }
}

function spawnFruits() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var fruit= createSprite(600,120,40,10);
    fruit.y = Math.round(random(80,120));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1 ;
    fruit.velocityX = -3;
    
     //assign lifetime to the variable
    fruit.lifetime = 200;
    
    //adjust the depth
    fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(fruit);
  }
}





