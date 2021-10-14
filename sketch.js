var bob_left;
var bob_right;
var cop_left;
var cop_right;
var bobStandingLeft,bobStandingRight;
var bg,bob,cop;
var gameState = 1;
var stair1,stair1B;
var wallR,wallL1,wallL3,wallL5;
var door1,door1B;
var hasMoney = false;
var vault;
var gameState = "Start";
var noteTaken = false;
var time;
var winnerImage;
var note;
var score = 200;
var scoreImage;
var loserImage;
var points = 0;
var gameWinSound;
function preload(){
    bg = loadImage("Assets/bg_robber.jpg");
    bob_left = loadAnimation("Assets/L1.png","Assets/L2.png","Assets/L3.png","Assets/L4.png","Assets/L5.png","Assets/L6.png","Assets/L7.png","Assets/L8.png","Assets/L9.png");
    bob_right = loadAnimation("Assets/R1.png","Assets/R2.png","Assets/R3.png","Assets/R4.png","Assets/R5.png","Assets/R6.png","Assets/R7.png","Assets/R8.png","Assets/R9.png");
    cop_left = loadAnimation("Assets/L1E.png","Assets/L2E.png","Assets/L3E.png","Assets/L4E.png","Assets/L5E.png","Assets/L6E.png","Assets/L7E.png","Assets/L8E.png");
    cop_right = loadAnimation("Assets/R1E.png","Assets/R2E.png","Assets/R3E.png","Assets/R4E.png","Assets/R5E.png","Assets/R6E.png","Assets/R7E.png","Assets/R8E.png");
    bobStandingLeft = loadImage("Assets/standingleft.png");
    bobStandingRight = loadImage("Assets/standing.png");
    gameWinSound = loadSound("Assets/gamewin.mp3");


}
function setup() {
  createCanvas(windowWidth,windowWidth);
  //bob spawn = 120,600
  bob = createSprite(110,585, 50, 50);
  bob.addImage("bobStandingRight",bobStandingRight);
  bob.addImage("bobStandingLeft",bobStandingLeft);
  bob.addAnimation("bobLeft",bob_left);
  bob.addAnimation("bobRight",bob_right);
  bob.scale=0.5;
  
  stair1 = createSprite(390,600,30,30);
  stair1.visible=false;
  stair1B = createSprite(390,470,30,30);
  stair1B.visible=false;

  wallR = createSprite(1310,330,1,displayHeight-130);
  wallR.visible=false;

  //wallL1 for l1 and l2
  wallL1 = createSprite(80,510,1,250);
  //wallL1.visible=false;
  wallL3 = createSprite(280,330,1,125);
  //wallL3.visible=false;
  wallL5 = createSprite(640,60,1,125);
  //wallL5.visible=false;

  //door
  door1 = createSprite(1250,465,30,30);
  door1.visible=false;

  door1B = createSprite(1250,330,30,30);
  door1B.visible=false;

  //vault
  vault = createSprite(840,330,100,50);
  vault.visible=false;

  //Lift Button Down
  lift_button1 = createSprite(1240,595,20,25);
  lift_button1.visible=false;
  //Lift Button Up
  lift_button2 = createSprite(1240,205,20,25);
  lift_button2.visible=false;

  //satirs2
  stair2A=createSprite(975,195,50,50);
  stair2A.visible=false;

  stair2B=createSprite(975,65,50,50);
  stair2B.visible=false;

  //note
  note = createSprite(1230,55,20,20);
  note.shapeColor="white";
  
  //score Image
  scoreImage=loadImage("playbtn-removebg-preview.png");
  //Teleporter
  teleporter = createSprite(825,200,10,125);
  teleporter.visible=false;

  //wallFloor3
  wallF3 = createSprite(800,195,10,125);
  wallF3.visible=false;

  //winnerImage
  winnerImage = loadImage("assets/Winner.jpeg");

  //loseImage
  loserImage = loadImage("assets/gameover.jpg");

  //end
  end = createSprite(250,180,10,100);
  end.visible=false;

  time = 10;
  250,185
}

function draw() {
  
  
  console.log(gameState);
  background(bg);  
  fill("white");
  text("x: "+ mouseX + "y: " + mouseY,mouseX,mouseY);
  
  image(scoreImage,250,30,150,75);
  
  if(gameState==="finish"){
    note.visible=false;
    bob.visible=false;
    background(winnerImage);
    textSize(50);
    text("SCORE:",950,350);
    text(score-points,1000,400);
    console.log(score-points);
    gameWinSound.play();
    setLoop(false);
  }
  if(bob.isTouching(end)){
    
    gameState="finish";
    bob.velocityX=0;
  }
  if(bob.isTouching(teleporter)){
    
    if(time > 0){
      time = time - 1;
      text(time,845,160);
      if(time<=0){
        bob.x=750;
        bob.y=210;
      }
      else{
        bob.x=teleporter.x+30;
      }
    }


  }


  if(noteTaken===true){
   
    text("YOU CAN TELEPORT THROUGH A CERTAIN WALL BY STANDING BY IT FOR 10 SEC",0,25);
  }
  if(gameState==="Stage3"){
    text("KEY FOUND , NOW ESCAPE",0,55);
  }
  if(hasMoney===true){
 
    text("YOU HAVE MONEY , FIND THE LIFT KEY ( HINT: WHERE YOU FIND WOOD BURNING BRIGHT )",0,25);
  }
  if(gameState==="Start" && hasMoney===true){
    
    gameState="Stage2";
  }
  if(bob.isTouching(wallR)){
    bob.x=1245;
  }
  if(bob.isTouching(wallL1)){
    bob.x=120;
  }
  if(bob.isTouching(wallL3)){
    bob.x=320;
  }
  if(bob.isTouching(wallL5)){
    bob.x=685;
  }
  if(bob.isTouching(wallF3)){
    bob.x=750;
  }
  if(gameState !== "finish"){
    if((keyDown(RIGHT_ARROW)||keyDown("D")) && bob.x>0 && bob.x<1320){
      bob.changeAnimation("bobRight",bob_right);
      bob.velocityX=3;
      
    }
    else{
      bob.changeImage("bobStandingRight",bobStandingRight);
      bob.velocityX=0;
    }
    if((keyDown(LEFT_ARROW)||keyDown("A")) && bob.x>0 && bob.x<1320){
      bob.changeAnimation("bobLeft",bob_left);
      bob.velocityX=-3;
      
    }
  }

  /*else{
    bob.changeImage("bobStandingLeft",bobStandingLeft);
    bob.velocityX=0;
  }*/
  if(bob.isTouching(stair1)&&keyDown(UP_ARROW)){
    bob.x=390;
    bob.y=470;
  }
  if(bob.isTouching(stair1B)&&keyDown(DOWN_ARROW)){
    bob.x=390;
    bob.y=600;
  }
  if(bob.isTouching(stair2A)&&keyDown(UP_ARROW)){
    bob.x=975;
    bob.y=75;
  }
  if(bob.isTouching(stair2B)&&keyDown(DOWN_ARROW)){
    bob.x=975;
    bob.y=210;
  }
  if(bob.isTouching(door1) && keyDown(UP_ARROW)){
    bob.x=1200;
    bob.y=330;
  }
  if(bob.isTouching(door1B) && keyDown(DOWN_ARROW)){
    bob.x=1200;
    bob.y=465;
  }
  if(bob.isTouching(vault) && keyDown("SPACE")){
      hasMoney=true;
  }
  if(bob.isTouching(lift_button1)&&keyDown(UP_ARROW)&&gameState==="Stage3"){
    bob.x=1160;
    bob.y=210;
  }
  if(bob.isTouching(lift_button2)&&keyDown(DOWN_ARROW)){
    bob.x=1150;
    bob.y=590;
  }
  if(bob.isTouching(note)&&keyDown("SPACE")){
    noteTaken=true;
    note.visible=false;
  }


  
  console.log(hasMoney);
  drawSprites();
  textSize(25);
  if(gameState !== "finish"){
    text(score-World.seconds,300,70);
    points = score-World.seconds;

  }
  
  if(score-World.seconds<=0 && gameState !== "finish"){
    //image(loserImage,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    background(loserImage);
    console.log("yes");
  }
}
function keyPressed(){
    if((bob.x>915&&bob.x<1020)&&(bob.y<520&&bob.y>410)&& gameState==="Stage2"&&keyCode===32){
      gameState="Stage3";
      hasMoney=false;
    }
}