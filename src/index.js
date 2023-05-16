import './index.css';

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitButton = document.getElementById('submit');
const scoresList = document.getElementById('scores');
const errorMessage = document.createElement('p');
errorMessage.textContent = 'Please enter a valid number';
errorMessage.classList.add('error-message');

// ADD AN EVENT LISTENER TO THE SUBMIT BUTTON
submitButton.addEventListener('click', () => {
  const name = nameInput.value;
  const score = parseFloat(scoreInput.value);
  if (Number.isNaN(score)) {
    const addError = document.querySelector('.add');
    addError.appendChild(errorMessage);
  }
  // Create a new li element
  const listItem = document.createElement('li');
  listItem.textContent = `${name}: ${score}`;
  if (!Number.isNaN(score)) {
    const scores = Array.from(scoresList.children);
    const insertIndex = scores.findIndex((item) => parseFloat(item.textContent.split(': ')[1]) < score);
    if (insertIndex === -1) {
      scoresList.appendChild(listItem);
    } else {
      scoresList.insertBefore(listItem, scores[insertIndex]);
    }
  }
  // Reset the input fields
  nameInput.value = '';
  scoreInput.value = '';
});
