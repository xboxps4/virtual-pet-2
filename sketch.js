var happyDog;
var dog,database,foodS;
var foodStock;
var milk;
var fedTime,lastFed;
var foodObj

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  milk = loadImage("Milk.png");
}

function setup() {
	createCanvas(500,500);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  
  background(46,139,87)
  drawSprites();
  
  text("Press up arrow to feed the dog"),450,450;

  fill(255,255,254)
  textSize(15);
  if(lastFed = 12)
  {
    text("Last Feed : " + lastFed % 12 + " PM",350,30)
  }
  else if(lastFed === 0)
  {
    text("Last feed : 12 AM",350,30);
  }
  else
  {
    text("Last feed : " + lastFed + "AM",350,30)
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  food.display();
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  database.ref('/').update({
    Food : x
  })
}

function addFoods()
{
  foodS++;
  database.ref('/').update({
    food : foodS
  })
}

function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}