const holes = document.querySelectorAll('.box');
console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const highScoreBoard = document.querySelector('.highscore');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highscore = localStorage.getItem('gameHighScore') || 0;
highScoreBoard.textContent = 'Maior Pontuação: ' + highscore;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time)
}

popOut();

function startGame() {
    countdown = timeLimit / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if(countdown < 0){
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore()
            countdownBoard.textContent = 'O tempo acabou! Parabéns por capturar as estrelas!'
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function startwhack(e) {
    const hole = this.parentElement;
    if (!hole.classList.contains('up')) return;

    score++;
    scoreBoard.textContent = score;

    this.style.backgroundImage = 'url("./img/startount-removebg-preview.png")';
    this.style.pointerEvents = 'none';

    setTimeout(() => {
        this.style.backgroundImage = 'url("./img/starlove-removebg-preview.png")';
        this.style.pointerEvents = 'all';
    }, 800);

    hole.classList.remove('up');
}


moles.forEach(mole => mole.addEventListener('click', startwhack));

function checkHighScore() {
    if(score > localStorage.getItem('gameHighScore')) {
        localStorage.setItem('gameHighScore', score);
        highscore = score;
        highScoreBoard.textContent = 'Maior Pontuação: ' + highscore;
    }
}
