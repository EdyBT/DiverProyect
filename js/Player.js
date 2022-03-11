class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank = null;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
  
  //aqui declaramos nuestra funcion estatica que almacenara el buzo que llegue primero al naufragio
  getDiverAtEnd(){
    database.ref('DiverAtEnd').on("value",(data)=>{
      this.rank = data.val();
    }); 
  }
  
  //aqui programaos nuestra funcion que actuliza el ranking del juego y es estatica
    static updateDiverAtEnd(rank){
      database.ref('/').update({
        DiverAtEnd:rank
      })
   }
  }