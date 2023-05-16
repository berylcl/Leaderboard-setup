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

let gameId = null;
let scoresData = [];

// ADD AN EVENT LISTENER TO THE SUBMIT BUTTON
submitButton.addEventListener('click', () => {
  const name = nameInput.value;
  const score = parseFloat(scoreInput.value);
  if (Number.isNaN(score)) {
    const addError = document.querySelector('.add');
    addError.appendChild(errorMessage);
    return;
  }

  // Save the score to local storage
  const scoreObj = { name, score };
  scoresData.push(scoreObj);
  scoresData.sort((a, b) => b.score - a.score); // Sort scores from highest to lowest
  localStorage.setItem('scores', JSON.stringify(scoresData));

  // Reset the input fields
  nameInput.value = '';
  scoreInput.value = '';
});
clearButton.addEventListener('click', () => {
  scoresList.innerHTML = '';
  scoresData = []; // Clear the scores data
  localStorage.removeItem('scores'); // Remove scores from local storage
});
refreshButton.addEventListener('click', () => {
  scoresList.innerHTML = '';

  // Retrieve scores from local storage
  const storedScores = localStorage.getItem('scores');
  if (storedScores) {
    scoresData = JSON.parse(storedScores);

    scoresData.forEach((score, index) => {
      const listItem = document.createElement('li');
      const icon = document.createElement('i');
      icon.classList.add('fas');
      icon.style.color = '#a41688'; // Set color to gold
      if (index === 0) {
        // Add trophy icon for the winner
        icon.classList.add('fa-trophy');
      } else if (index === 1) {
        // Add medal icon for second place
        icon.classList.add('fa-medal');
      } else if (index === 2) {
        // Add award icon for third place
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

async function getScores(gameId) {
  const response = await fetch(`${apiUrl}games/${gameId}/scores`);
  const data = await response.json();
  return data.result;
}

async function createGame() {
  gameId = 'your-game-id';

  refreshButton.click();
}

createGame();