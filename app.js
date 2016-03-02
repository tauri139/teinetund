(function(){
  "use strict";


  var Moosipurk = function(){

    // SINGLETON PATTERN (4 rida)
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }
    Moosipurk.instance = this; // this viitab moosipurgile

    this.routes = Moosipurk.routes;

    console.log(this);
    //console.log('moosipurgi sees');

    // KÃ•IK MUUTUJAD, mis on Ã¼ldised ja muudetavad
    this.currentRoute = null; // hoian meeles mis lehel olen (home-view, ...)
    this.interval = null;



    //panen rakenduse tÃ¶Ã¶le
    this.init();
  };

  // kirjeldatud kÃµik lehed
  Moosipurk.routes = {
    "home-view": {
      render: function(){
        // kÃ¤ivitan siis kui jÃµuan lehele
        console.log('JS avalehel');

        // kui olemas, teen nulliks
        if(this.interval){ clearInterval(this.interval); }

        // kui jÃµuan avalehele siis kÃ¤ivitub timer, mis hakkab trÃ¼kkima kulunud sekundeid
        // divi sisse #counter
        // hakkab 0st
        var seconds = 0;
        this.interval = window.setInterval(function(){
          seconds++;
          document.querySelector('#counter').innerHTML = seconds;
        }, 1000); //iga 1000ms tagant kÃ¤ivitub

      }
    },
    "list-view": {
      render: function(){
        console.log('JS loendi lehel');

      }
    },
    "manage-view": {
      render: function(){
        console.log('JS halduse lehel');

      }
    }
  };

  //kÃµik moosipurgi funktsioonid tulevad siia sisse
  Moosipurk.prototype = {
    init: function(){
      console.log('rakendus kÃ¤ivitus');
      // Siia tuleb esialgne loogika

      window.addEventListener('hashchange', this.routeChange.bind(this));

      //vaatan mis lehel olen, kui ei ole hashi lisan avalehe
      console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "home-view";
      }else{
        //hash oli olemas, kÃ¤ivitan routeChange fn
        this.routeChange();

      }


      // hakka kuulama hiireklÃµpse
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      // lisa uus purk
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      console.log(title + ' ' + ingredients);
      if(title && ingredients){
        document.querySelector('#error-message').innerHTML = 'Moosipurk lisatud!';
        var new_jar = new Jar(title, ingredients);
        var li = new_jar.createHtmlElement();
        document.querySelector('.list-of-jars').appendChild(li);
      }else{
        if(!title && !ingredients){
          document.querySelector('#error-message').innerHTML = 'Pealkiri ja koostis peavad olema täidetud!';
        }
        else if(!ingredients){
          document.querySelector('#error-message').innerHTML = 'Koostis peab olema täidetud!';
        }
        else if(!title){
          document.querySelector('#error-message').innerHTML = 'Pealkiri peab olema täidetud!';
        }


      }


    },
    routeChange: function(event){

      // slice vÃµtab vÃµtab # Ã¤ra #home-view >> home-view
      this.currentRoute = window.location.hash.slice(1);

      // kas leht on olemas
      if(this.routes[this.currentRoute]){
        //jah

        this.updateMenu();

        console.log('>>> ' + this.currentRoute);
        //kÃ¤ivitan selle lehe jaoks ettenÃ¤htud js
        this.routes[this.currentRoute].render();
      }else{
        // 404?
        console.log('404');
        window.location.hash = 'home-view';
      }

    },

    updateMenu: function(){

      //kui on mingil menÃ¼Ã¼l klass active-menu siis vÃµtame Ã¤ra
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace(' active-menu', '');

      //kÃ¤esolevale lehele lisan juurde
      document.querySelector('.' + this.currentRoute).className += ' active-menu';

    }

  };


  var Jar = function(new_title, new_ingredients){
    this.title = new_title;
    this.ingredients = new_ingredients;
  };

  Jar.prototype = {
    createHtmlElement: function(){
      // anda tagasi ilus html

      // li
      //   span.letter
      //     M
      //   span.content
      //     Maasikamoos | maasikas, Ãµun

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.ingredients);
      content_span.appendChild(content);

      li.appendChild(content_span);

      console.log(li);

      return li;
    }
  };


  window.onload = function(){
    var app = new Moosipurk();
  };

})();
