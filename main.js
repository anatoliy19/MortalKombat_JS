const $div_arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $ReloadButton = document.createElement('button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
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

const player2 = {
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

function generateLogs(type,player1,player2){
    const text = logs[type][Math.floor(Math.random()*type.length)]
        .replace('[playerKick]',player1.name)
        .replace('[playerdefence]',player2.name);
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin',el);
    console.log(text);
}

const date = new Date()
const gameDate = `${date.getHours() +":"+date.getMinutes()+":"+date.getSeconds()}`;

function startLogs(type,gameDate,player1,player2){
    const  text = logs[type]
        .replace('[time]',gameDate)
        .replace('[player1]',player1.name)
        .replace('[player2]',player2.name);
    const el = `<p>${text}</p>`
    $chat.insertAdjacentHTML('afterbegin',el);
    console.log(text);
}

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
    }else if(player2.hp ===0 && player1.hp > player2.hp){
        $div_arenas.appendChild(playerWon(player1.name));
    }else if(player1.hp ===0 && player2.hp === 0){
        $div_arenas.appendChild(playerWon());
    }
}

$formFight.addEventListener('submit', function(event){

    event.preventDefault();
    const enemy =  enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit',player2,player1);
    }

    if (enemy.defence !== player.hit){
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit',player1,player2);
    }

    showResult();
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

$div_arenas.appendChild(createPlayer(player1));
$div_arenas.appendChild(createPlayer(player2));

