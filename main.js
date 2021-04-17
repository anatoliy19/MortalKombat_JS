const $div_arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');

const $ReloadButton = document.createElement('button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

player1 = {
    player: 1,
    name: 'Scorpio',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'knife',
    changeHP,
    renderHP,
    elHP,
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
    changeHP,
    renderHP,
    elHP,
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

function playerWon(name){
    const $loseTitle = createElement('div','loseTitle');

    if(name){
        $loseTitle.innerText = name + ' won';
    }else {
        $loseTitle.innerText = ' draw';
    }
    return $loseTitle;
}

function getRandom(num){
    kick = Math.ceil(Math.random() * num);
    if (kick == 0){
        kick = 1;
    }
    return kick;
}


$formFight.addEventListener('submit', function(event){

    event.preventDefault();
    const enemy =  enemyAttack();
    const attack = {};

    for (let item of $formFight){
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit   = item.value;
        }

        if (item.checked && item.name === 'defence'){
            attack.defense   = item.value;
        }

        item.checked = false;
    }

    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));

    player1.renderHP();
    player2.renderHP();

    player1.elHP();
    player2.elHP();

    if(player1.hp === 0 || player2.hp === 0){

        createReloadButton();
    }

    if(player1.hp ===0 && player1.hp < player2.hp){
        $div_arenas.appendChild(playerWon(player2.name));
    }else if(player2.hp ===0 && player1.hp > player2.hp){
        $div_arenas.appendChild(playerWon(player1.name));
    }else if(player1.hp ===0 && player2.hp === 0){
        $div_arenas.appendChild(playerWon());
    }

});

function enemyAttack(){

const hit = ATTACK[getRandom(3) - 1];
const defense = ATTACK[getRandom(3) - 1];

return{
    value: getRandom(HIT[hit]),
    hit,
    defense
}
}

function changeHP(hit){
    this.hp = Math.max(0,this.hp - hit);
}

function elHP(){
    return document.querySelector('.player'+ this.player+' .life');
}

function renderHP(){
    this.elHP().style.width = this.hp+'%';
}

function createReloadButton(){
    const $ReloadButtonDiv = document.createElement('div','reloadWrap');
    const $ReloadButton    = document.createElement('button','button');
    $ReloadButton.innerText = 'Reload';

    $ReloadButton.addEventListener('click',function(){
        window.location.reload();
    })
    $ReloadButtonDiv.appendChild($ReloadButton);
    $div_arenas.appendChild($ReloadButtonDiv);
}

$ReloadButton.addEventListener('click',function (){
    window.location.reload();
});

/*$randomButton.addEventListener('click',function(){

    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));

    player1.renderHP();
    player2.renderHP();

    player1.elHP();
    player2.elHP();

    if(player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp ===0 && player1.hp < player2.hp){
        $div_arenas.appendChild(playerWon(player2.name));
    }else if(player2.hp ===0 && player1.hp > player2.hp){
        $div_arenas.appendChild(playerWon(player1.name));
    }else if(player1.hp ===0 && player2.hp === 0){
        $div_arenas.appendChild(playerWon());
    }
});*/

$div_arenas.appendChild(createPlayer(player1));
$div_arenas.appendChild(createPlayer(player2));

