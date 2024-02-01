let count = document.querySelector('#count');
let cardContainer = document.querySelector('.card-container');
let modalTitle = document.querySelector('#modal-title');
let modal = document.querySelector('#modal');

let allCards = [
  {
    id: 1,
    img: 'images/1.png'
  },

  {
    id: 2,
    img: 'images/2.png'
  },

  {
    id: 3,
    img: 'images/3.png'
  },

  {
    id: 4,
    img: 'images/4.png'
  },

  {
    id: 5,
    img: 'images/5.png'
  },

  {
    id: 6,
    img: 'images/6.png'
  },

  {
    id: 7,
    img: 'images/7.png'
  },

  {
    id: 8,
    img: 'images/8.png'
  },

  {
    id: 9,
    img: 'images/9.png'
  },

  {
    id: 10,
    img: 'images/10.png'
  },

  {
    id: 11,
    img: 'images/11.png'
  },

  {
    id: 12,
    img: 'images/12.png'
  }
];

let currentCards = [...allCards, ...allCards];
let counter = allCards.length + 11;
let isPaused = false;
let isLose = false;

function shuffle(array) {
  let counter = array.length,temp,index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function win() {
  isPaused = true;
  modalTitle.innerHTML = 'You win!';
  modal.classList.add('modal-open');
}

function lose() {
  isLose = true;
  modalTitle.innerHTML = 'You lose!';
  modal.classList.add('modal-open');
}

function handleClick(e) {
  let { target } = e;

  if (
    !isPaused &&
    !isLose &&
    !target.classList.contains('card-guessed') &&
    !target.classList.contains('card-picked')
  ) {
    isPaused = true;
    let picked = cardContainer.querySelector('.card-picked');
    if (picked) {
      if (picked.dataset.id === target.dataset.id) {
        target.classList.remove('card-picked');
        picked.classList.remove('card-picked');
        target.classList.add('card-guessed');
        picked.classList.add('card-guessed');
        isPaused = false;
      } else {
        target.classList.add('card-picked');
        setTimeout(() => {
          target.classList.remove('card-picked');
          picked.classList.remove('card-picked');
          isPaused = false;
        }, 1500);
      }

      console.log('counter', counter);
      counter -= 1;
      count.innerHTML = counter;
      
      if (counter === 0) {
        lose();
      }
    } else {
      target.classList.add('card-picked');
      isPaused = false;
    }

    let isWin = cardContainer.querySelectorAll('card-guessed').length === currentCards.length;
    if (isWin) {
      win();
    }
  }
}

function drawCards() {
  cardContainer.innerHTML = '';
  count.innerHTML = counter;

  shuffle(currentCards).forEach((el) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', el.id);
    card.innerHTML = `
          <div class="card-front">
            <img
              class="front-img"
              src="${el.img}"
              alt="emoji"
            />
          </div>
          <div class="card-back">
            <img
              class="back-img"
              src="images/cover.jpg"
              alt="Thought"
            />
          </div>
        `;
    card.addEventListener('click', handleClick);
    cardContainer.appendChild(card);
  });
}

document.querySelector('#play-again').addEventListener('click', function () {
  modal.classList.remove('modal-open');
  isPaused = false;
  isLose = false;
  counter = allCards.length + 10;
  drawCards();
});

drawCards();
