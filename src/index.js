import './index.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitButton = document.getElementById('submit');
const refreshButton = document.getElementById('refresh');
const scoresList = document.getElementById('scores');
const errorMessage = document.createElement('p');
const clearButton = document.getElementById('clear');
errorMessage.textContent = 'Please enter a valid number';
errorMessage.classList.add('error-message');

let scoresData = [];
let gameId = null;

submitButton.addEventListener('click', () => {
  const name = nameInput.value;
  const score = parseFloat(scoreInput.value);
  if (Number.isNaN(score)) {
    const addError = document.querySelector('.add');
    addError.appendChild(errorMessage);
    return;
  }

  const scoreObj = { name, score };
  scoresData.push(scoreObj);
  scoresData.sort((a, b) => b.score - a.score);
  localStorage.setItem('scores', JSON.stringify(scoresData));

  nameInput.value = '';
  scoreInput.value = '';
});

clearButton.addEventListener('click', () => {
  scoresList.innerHTML = '';
  scoresData = [];
  localStorage.removeItem('scores');
});

refreshButton.addEventListener('click', () => {
  scoresList.innerHTML = '';

  const storedScores = localStorage.getItem('scores');
  if (storedScores) {
    scoresData = JSON.parse(storedScores);

    scoresData.forEach((score, index) => {
      const listItem = document.createElement('li');
      const icon = document.createElement('i');
      icon.classList.add('fas');
      icon.style.color = '#a41688';

      if (index === 0) {
        icon.classList.add('fa-trophy');
      } else if (index === 1) {
        icon.classList.add('fa-medal');
      } else if (index === 2) {
        icon.classList.add('fa-award');
      } else {
        listItem.textContent = `${index + 1}. `;
      }

      listItem.appendChild(icon);
      listItem.innerHTML += `${score.name}: ${score.score}`;
      scoresList.appendChild(listItem);
    });
  }
});

const createGame = async () => {
  const storedGameId = localStorage.getItem('gameId');
  if (storedGameId) {
    gameId = storedGameId;
  } else {
    try {
      const response = await fetch(`${apiUrl}games/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'My Game' }),
      });
      const data = await response.json();
      gameId = data.result;
      localStorage.setItem('gameId', gameId);
      // console.log('Game ID:', gameId);
    } catch (error) {
      // console.error('Failed to create a new game:', error);
      // Add error handling logic here (e.g., show an error message to the user)
    }
  }
};

document.addEventListener('DOMContentLoaded', createGame);
