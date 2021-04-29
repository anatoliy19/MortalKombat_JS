class Player{
    constructor(props){
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.weapon = props.weapon;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }
    attack = () =>{
        console.log(name+ ' Fight...');
    }
    changeHP = (randomNumber) =>{
        this.hp -= randomNbmer;
        if (this.hp <= 0){
            this.hp = 0;
        }
    }
    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }
    elHP = () => {
        return document.querySelector(`.${this.selector}.life`);
    }

    createPlayer = () => {
        const $div = createElement('div', this.selector);
        const $div_progressbar = createElement('div','progressbar');
        const $div_life = createElement('div','life');
        const $div_name = createElement('div','name');
        const $div_character = createElement('div','character');
        const $img = createElement('img');

        $div.classList.add('player'+player.player);

        $div_life.style.width = this.hp + '%';
        $div_name.innerText = this.name;
        $img.src = this.img;

        $div_progressbar.appendChild($div_life);
        $div_progressbar.appendChild($div_name);

        $div_character.appendChild($img);

        $div.appendChild($div_character);
        $div.appendChild($div_progressbar);

        const $root = document.querySelector(`.${this.rootSelector}`);wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        $root.appendChild($player);

        return $div;
    }
}

export default  Player;

// export const player1 = new Player(1,'Scorpio',100,'knife','http://reactmarathon-api.herokuapp.com/assets/scorpion.gif');
// export const player2 = new Player(2,'Kitana',80,'gun','http://reactmarathon-api.herokuapp.com/assets/kitana.gif')


