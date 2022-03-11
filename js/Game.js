class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      diver1 = createSprite(100,200);
      diver1.addImage("diver1",diver1_img);
      diver1.scale = 0.5;
      diver2 = createSprite(300,200);
      diver2.addImage("diver2",diver2_img);
      diver3 = createSprite(500,200);
      diver3.addImage("diver3",diver3_img);
      diver4 = createSprite(700,200);
      diver4.addImage("diver4",diver4_img);
      diver = [diver1, diver2, diver3, diver4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getDiverAtEnd();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track, 0,-displayHeight*50,displayWidth, displayHeight*60);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the Diver
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the diver a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the diver in y direction
          y = displayHeight - allPlayers[plr].distance;
          diver[index-1].x = x;
          diver[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            diver[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = diver[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 4000){
        gameState = 2;
        player.rank+=1;
        Player.updateDiverAtEnd(player.rank);

    }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log("Posiciòn del jugador",player.rank);
    }
  }
  