const $div_arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'knife',
    attack: function (name){
        console.log(name+ ' Fight...');
    }
};

player2 = {
    player: 2,
    name: 'Kitana',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: 'gun',
    attack: function (name){
        console.log(name+ ' Fight...');
    }
};

function createElement(tag, className){
   const $tag = document.createElement(tag);
   if (className){
       $tag.classList.add(className);
   }
    return $tag;
}

function createPlayer(player){

    const $div = createElement('div','player'+player.player);
    const $div_progressbar = createElement('div','progressbar');
    const $div_life = createElement('div','life');
    const $div_name = createElement('div','name');
    const $div_character = createElement('div','character');
    const $img = createElement('img');

    $div.classList.add('player'+player.player);

    $div_life.style.width = player.hp + '%';

    $div_name.innerText = player.name;

    $img.src = player.img;

    $div_progressbar.appendChild($div_life);
    $div_progressbar.appendChild($div_name);

    $div_character.appendChild($img);

    $div.appendChild($div_character);
    $div.appendChild($div_progressbar);

    return $div;
}

function playerLose(name){
    const $loseTitle = createElement('div','loseTitle');

    if (name = player1.name){
        WinnerName = player2.name;
    }
    else{
        WinnerName = player1.name;
    }

    $loseTitle.innerText = WinnerName + ' won';

    return $loseTitle;
}

function changeHP(player) {

    const $playerLife = document.querySelector('.player'+ player.player+' .life');

    hit = Math.ceil(Math.random() * 20) ;
    if (hit == 0){
        hit = 1;
    }

    player.hp -= hit;

    if (player.hp < 0){
        $playerLife.style.width = 0 + '%';
    } else {
        $playerLife.style.width = player.hp + '%';
    }

    if (player.hp < 0){
        $div_arenas.appendChild(playerLose(player.name));
        $randomButton.disabled = true;
    }
}

$randomButton.addEventListener('click',function(){

    changeHP(player1);
    changeHP(player2);
});

$div_arenas.appendChild(createPlayer(player1));
$div_arenas.appendChild(createPlayer(player2));

