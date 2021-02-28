const Engine = Matter.Engine;

const World = Matter.World;

const Bodies = Matter.Bodies;

const Constraint = Matter.Constraint;

//Create variables here

var dog;

var happyDog;

var database;

var foodS;

var foodStock;

function preload()
{
  //load images here
  
  dogimg=loadImage("images/dogImg.png");

  happyDogimg=loadImage("images/dogImg1.png");

}

function setup() 
{
  database=firebase.database();

  foodobj=new Food();

  feed=createButton("Feed the dog");

  feed.position(700,95);

  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");

  addFood.position(800,95);

  addFood.mousePressed(addFoods);

  createCanvas(900,750);

  dog = createSprite(700,200,50,50);

  dog.addImage(dogimg);

  dog.scale=0.2;

  foodStock=database.ref('food');

  foodStock.on("value",readStock);

}


function draw() 
{  

  background(46,139,87);

  foodobj.display();

  fedTime=database.ref('FeedTime');

  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  });

  drawSprites();

  //add styles here

    stroke(4);
    textSize(35);
    fill("black");
    text("Note:Press UP_ARROW KEY to Feed Drago Milk!",100,50);
}
//Function to read values from DB

function readStock(data)
{
  foodS=data.val();
  foodobj.updateFoodStock(foodS)
}

// function to update food stock and last fed time

function feedDog()
{
  dog.addImage(happyDogimg);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);

  database.ref('/').update({
    food:foodobj.getFoodStock(),
    FeedTime:hour()
  })
}

// function to add food in stock

function addFoods()
{
  foodS++;

  database.ref('/').update({
    food:foodS
  })
}