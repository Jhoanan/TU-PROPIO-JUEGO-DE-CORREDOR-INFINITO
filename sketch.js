var ground,mario;
var player1,player2,player3;
var groundImg,marioImg;
var hogngreen,hognred;
var gameOverImg;
var mnd,moneda,monedaImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  //ground = loadImage("gameover.png");
  //marioImg = loadAnimation("marioder.png","marioder2.png");
  //hogngreen = loadImage("hongo_green.png");
  //hognred = loadImage("hongo_red.png");
  //monedaImg = loadImage("moneda.png");
  //gameOverImg = loadImage("gameover.png");
}

function setup(){
  
createCanvas(1200,300);

ground=createSprite(100,150);
//ground.addImage("ground",groundImg);
ground.velocityX = -5;

mario = createSprite(70,150);
//mario.addAnimation("marioder","marioder2",marioImg);
mario.scale=0.07;


mario.setCollider("rectangle",0,0,40,40);

mario.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
//gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

hongreen = new Group();
hongred = new Group();
mnd = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   ground.velocityX = -(6 + 2*distance/150);
  
   mario.y = World.mouseY;
  
   edges= createEdgeSprites();
   mario .collide(edges);

  if(ground.x < 0 ){
    ground.x = width/2;
  }

  var select_hogngreen = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_hogngreen == 1) {
        hongogreen();
    } else if (select_hogngreen == 2) {
        hongored();
    } else {
      mnd();
    }
  }
    
}

else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Presiona la tecla Arriba para reiniciar el juego", 500,200);
  
    ground.velocityX = 0;
    mario.velocityY = 0;
    mario.addAnimation("marioder","marioder2",marioImg);


   if(keyDown("UP_ARROW")) {
     reset();
   }
}
}

function hongogreen(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("hogngreenPlayer1",hogngreen);
        player1.setLifetime=170;
        hongreen.add(player1);
}

function hongored(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("hongoredPlayer2",hognred);
        player2.setLifetime=170;
        hongred.add(player2);
}

function moneda() {
  if (World.frameCount % 200 == 0) {
    player3 =createSprite(1100,Math.round(random(50, 250)));
    player3.scale =0.06;
    player3.velocityX = -(6 + 2*distance/150);
    player3.addAnimation("monedaPlayer3",mnd);
    player3.setLifetime=170;
    mnd.add(player3);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mario.addAnimation("marioder","marioder2",marioImg);
  
  hongreen.destroyEach();
  hongred.destroyEach();

  
  distance = 0;
 }
