const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const result = document.querySelector('#score');
const resultTable = document.querySelector('.result');
let lastHole;
let timeUp = false;
let score = 0;

const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomHole = (holes) => {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

const peep = () => {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() =>{
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time)
}

const startGame = () => {
    resultTable.classList.add('hide');
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    moles.forEach(mole => mole.style.pointerEvents = "auto");
    peep();
    setTimeout(() => {
        timeUp = true;
        moles.forEach(mole => mole.style.pointerEvents = "none");
        result.innerHTML = `Congratulations, you recruited ${score} candidates!`;
        resultTable.classList.remove('hide');
    }, 10000)
}

const bonk = (e) => {
    if(!e.isTrusted) return; //cheater, faking click
    score++;
    e.target.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk))