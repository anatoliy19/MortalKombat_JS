/*
player1 = {
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'knife',
    attack: function (){
        console.log(this.name+ ' Fight...');
    }
};

player2 = {
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: 'gun',
    attack: function (){
        console.log(this.name+ ' Fight...');
    }
};

 function createPlayer(player,name){
 const $div = document.createElement('div');
 $div.classList.add(name);
 document.body.appendChild($div);

 const $div_progressbar = document.createElement('div');
 $div.appendChild($div_progressbar);

 const $div_life = document.createElement('div');
 $div_life.style.width = player.hp + '%';
 $div_progressbar.appendChild($div_life);

 const $div_name = document.createElement('div');
 $div_name.innerText = player.name;
 $div_progressbar.appendChild($div_name);


 const $div_character = document.createElement('div');
 const $img = document.createElement('img');
 $img.src = player.img;
//$img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
 $div_character.appendChild($img);

 $div.appendChild($div_character);

   $div_arenas = document.querySelector('.arenas');
   $div_arenas.appendChild($div);
}

createPlayer(player1,'player1');
createPlayer(player2,'player2');*/
