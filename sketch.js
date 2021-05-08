var dogImg, dogImg2;
var db;
var foodS;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  db = firebase.database();
  dbref = db.ref("food");
  dbref.on("value", readStock);

  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.4;
}

function draw() {  
  background(46, 139, 87);

  if(keyWentUp("up")){
    writeStocks(foodS);
    dog.addImage(dogImg2);
    dog.scale = 0.4;
  }

  drawSprites();

  textSize(20);
  fill("white");
  text("Press up arrow to feed the dog!", 95, 20);
}

function readStock(data){
  foodS = data.val();
}

function writeStocks(x){
  if(x < 0){
    x = 0;
  }else{
    x =- 1;
  }

  db.ref("/").update({
    food : x
  });
}


