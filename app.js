//get images Array
const startArray = [
    { name: 'blue', img: 'img/blue.png' },
    { name: 'fire', img: 'img/fire.png' },
    { name: 'green', img: 'img/green.png' },
    { name: 'honey', img: 'img/honey.png' },
    { name: 'iron', img: 'img/iron.png' },
    { name: 'mug', img: 'img/mug.png' },
    { name: 'mushroom', img: 'img/mushroom.png' },
    { name: 'onion', img: 'img/onion.png' },
    { name: 'potion', img: 'img/potion.png' },
    { name: 'red', img: 'img/red.png' },
];

const generateCardArray = (length, imagesCount) => {
    const result = [];
    const images = [];

    while (images.length < imagesCount) {
        images.push(...startArray);
    }

    for (let i = 0; i < length; i++) {
        const imageIndex = i % imagesCount;

        result.push({ name: images[imageIndex].name, img: images[imageIndex].img });
    }

    return result;
};

const startArrayLength = 30;
const imagesCount = 10;

const cardArray = generateCardArray(startArrayLength, imagesCount);

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const timer = document.querySelector('#timer');
const gameOver = document.querySelector('#game-over');
const timeLeft=document.querySelector('#time-left');

const foundMatch=document.querySelector('#found-match');
const tryAgain=document.querySelector('#try-again');
const clickedSameImg=document.querySelector('#clicked-same-image');

const foundMatchBtn=document.querySelector('#foundMatch');
const tryAgainBtn=document.querySelector('#tryAgain');
const clickedSameImgBtn=document.querySelector('#clickedSameImg');
let currentTime = 60;

foundMatchBtn.addEventListener('click', function() {
    foundMatch.style.display = 'none';
  });
  tryAgainBtn .addEventListener('click', function() {
    tryAgain.style.display = 'none';
  });
  clickedSameImgBtn.addEventListener('click', function() {
    clickedSameImg.style.display = 'none';
  });

let cardsFlipped = [];
let cardsChosenIds = [];
let cardsWon = [] 

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');

        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', i);

        card.addEventListener('click', flipCard)
        grid.append(card);
    }
}
createBoard()

function checkForMatch() {
    const cards = document.querySelectorAll('#grid img');

    if (cardsChosenIds[0] == cardsChosenIds[1]) {
        cards[cardsChosenIds[0]].setAttribute('src', 'img/blank.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'img/blank.png');
        
        clickedSameImg.style.display = 'flex';
       
    }

    else if (cardsFlipped[0] == cardsFlipped[1]) {
        
        foundMatch.style.display = 'flex'

        cards[cardsChosenIds[0]].setAttribute('src', 'img/white.png'); //if there is a match-put white and remove listeners
        cards[cardsChosenIds[1]].setAttribute('src', 'img/white.png');
        cards[cardsChosenIds[0]].removeEventListener('click', flipCard);
        cards[cardsChosenIds[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardsFlipped)
    } else {
        cards[cardsChosenIds[0]].setAttribute('src', 'img/blank.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'img/blank.png');
        
        tryAgain.style.display = 'flex';
    }
    resultDisplay.innerHTML = cardsWon.length;
    cardsFlipped = []; //cleanup
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length / 2) {
        resultDisplay.innerHTML = 'Congratulations! You won!'
    }

}

function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsFlipped.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log(cardsFlipped);
    console.log(cardsChosenIds);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsFlipped.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

function countDown() {
    currentTime--;
    timer.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
       timeLeft.innerHTML='Game Over!'

        const cards = document.querySelectorAll('#grid img');

        if (currentTime == 0) {
            cards.forEach((card) => {
                card.removeEventListener('click', flipCard);
            });
        }

    }
}

let countDownTimerId = setInterval(countDown, 1000)


