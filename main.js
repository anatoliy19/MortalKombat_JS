import {getRandom, createElement, getTime} from './utils';
import {HIT, LOGS, ATTACK} from './constants';
import Player from './Player';

const $div_arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $ReloadButton = document.createElement('button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const player1 = new Player({
        player: 1,
        name: 'Scorpio',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        rootSelector: 'arenas',
      })

const player2 = new Player({
    player: 2,
    name: 'Kitana',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    rootSelector: 'arenas',
})

const date = new Date()
const gameDate = `${date.getHours() +":"+date.getMinutes()+":"+date.getSeconds()}`;
const hit = ATTACK[getRandom(3) - 1];
const defence = ATTACK[getRandom(3) - 1];


function getTextLog (type,playerName1,playerName1){
    switch(type):
        case 'start':
            return LOGS[type]
                .replace('[player1]',playerName1)
                .replace('[player2]',playerName2)
                .replace('[time]',getTime());
            break;
        case 'hit':
            return LOGS[type][getRandom(LOGS[type].length-1) - 1]
                .replace('[playerKick]',playerName1)
                .replace('[playerDefence]',playerName2);
            break;
        case 'defence':
            return LOGS[type][getRandom(LOGS[type].length-1) - 1]
                .replace('[playerKick]',playerName1)
                .replace('[playerDefence]',playerName2);
            break;
        case 'end':
            return LOGS[type][getRandom(LOGS[type].length-1) - 1]
                .replace('[playerWins]',playerName1)
                .replace('[playerLose]',playerName2);
            break;
        case 'draw':
            return LOGS[type];
            break;

}

function generateLogs(type,name = {}, {name: playerName2, hp} = {}, valueAttack){
    let text = getTextLog(type,name,playerName2);
    switch (type){
        case 'hit':
            text = `${getTime()} ${text} -${valueAttack}[${hp}/100]`;
            break;
        case 'defence':
            break;
        case 'end':
            break;
        case 'draw':
            text = `${getTime()} ${text};
            break;
    }
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin',el);
    console.log(text);
}


function startLogs(type,gameDate,player1,player2){
    const  text = logs[type]
        .replace('[time]',gameDate)
        .replace('[player1]',player1.name)
        .replace('[player2]',player2.name);
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin',el);
    console.log(text);
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


function playerAttack(){
    const attack = {};

    for (let item of $formFight){
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit   = item.value;
        }

        if (item.checked && item.name === 'defence'){
            attack.defence   = item.value;
        }

        item.checked = false;
    }
    return attack;
}

function showResult(){

    if(player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp ===0 && player1.hp < player2.hp){
        $div_arenas.appendChild(playerWon(player2.name));
        generateLogs('end',player2,player1);
    }else if(player2.hp ===0 && player1.hp > player2.hp){
        $div_arenas.appendChild(playerWon(player1.name));
        generateLogs('end',player1,player2);
    }else if(player1.hp ===0 && player2.hp === 0){
        $div_arenas.appendChild(playerWon());
        generateLogs('draw');
    }
}

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} =  enemyAttack();
    const {hit,defence,value} = playerAttack();

    if (defence !== hitEnemy){
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs('hit',player2,player1, valueEnemy);
    }else{
        generateLogs('defence',player2,player1);
    }
    if (defenceEnemy !== hit){
        player2.changeHP(value);
        player2.renderHP();
        generateLogs('hit',player1,player2, value);
    }else{
        generateLogs('defence',player1,player2);
    }
    showResult();
});



function enemyAttack(){

const hit = ATTACK[getRandom(3) - 1];
const defence = ATTACK[getRandom(3) - 1];

return{
    value: getRandom(HIT[hit]),
    hit,
    defence
}
}

function changeHP(hit){
    this.hp = Math.max(0,this.hp - hit);
}

function elHP(){
    return document.querySelector(`.player${player}.life`);
}

function renderHP(){
    this.elHP().style.width = this.hp+'%';
}

function createReloadButton(){
    const $ReloadButtonDiv = document.createElement('div','reloadWrap');
    $ReloadButtonDiv.classList.add('reloadWrap');

    const $ReloadButton    = document.createElement('button','button');
    $ReloadButton.classList.add('button');
    $ReloadButton.innerText = 'Reload';

    $ReloadButton.addEventListener('click',function(){
        window.location.reload();
        startLogs('start',gameDate,player1,player2);
    })
    $ReloadButtonDiv.appendChild($ReloadButton);
    $div_arenas.appendChild($ReloadButtonDiv);
}

$ReloadButton.addEventListener('click',function (){
    window.location.reload();
});

function init(){
    player1.createPlayer();
    player2.createPlayer();
    generateLogs('start',player1,player2);
}

init();


