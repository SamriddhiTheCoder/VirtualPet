var dogImg, dogImg2;
var db;
var foodS;
var feed, add;
var fedTime, lastFed;
var foodObj;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 500);
  db = firebase.database();
  dbref = db.ref("food");
  dbref.on("value", readStock);

  dog = createSprite(650, 250);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodObj = new Food(250, 250);

  feed = createButton("Feed The Dog");
  feed.position(550, 70);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650, 70);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46, 139, 87);

  fedTime = db.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  push();
  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed % 12 + "PM", 600, 30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM", 600, 30);
  }
  else{
    text("Last Feed: "+ lastFed + "AM", 600, 30);
  }

  foodObj.display();

  drawSprites();

  textSize(15);
  fill("white");
  //text("Food Left: "+foodS, 10, 30);
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref("/").update({
    food : foodObj.getFoodStock(),
    feedTime : hour()
  });
}

function addFoods(){
  foodS++;
  db.ref("/").update({
    food : foodS
  });
}


