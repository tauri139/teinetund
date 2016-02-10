(function(){
  "use strict";


  var Moosipurk = function(){
    //Singleton pattern - 4 rida allpool
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; //this viitab moosipurgile

    console.log(this);

    //Kõik muutujad, mis on üldised ja muudetavad
    this.click_count = 0;


    this.init();
  };

  //kõik Moosipurgi funktsioonid tulevad siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('Rakendus käivitus');
      //siia tuleb esialgne loogika
      //hakka kuulama hiireklõpse
      this.bindMouseEvents();
    },

    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.AddNewClick.bind(this));
    },

    AddNewClick: function(event){
      console.log(event);
      this.click_count++;
      console.log(this.click_count);
    }

  };

  window.onload = function(){
    var app = new Moosipurk();
  };
})();
