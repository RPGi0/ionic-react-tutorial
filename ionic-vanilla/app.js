const calculateBtn = document.getElementById("calc-btn");
const resetBtn = document.getElementById("reset-btn");
const heightInput = document.getElementById("height-input");
const weightInput = document.getElementById("weight-input");

const resultArea = document.getElementById("result");

const resetInputs = () => {
  heightInput.value = "";
  weightInput.value = "";
};

const calculateBmi = () => {
  // +input.value castes value to number
  const enteredHeight = +heightInput.value;
  const enteredWeight = +weightInput.value;

  const bmi = enteredWeight / (enteredHeight * enteredHeight);

  if (isNaN(bmi)) {
    alert("Not a number, please check inputs");
    return;
  }
  // Creates new ion card dynamically
  const resultElement = document.createElement("ion-card");
  resultElement.innerHTML = `
    <ion-card-content>
      <h2>${bmi}</h2>
    </ion-card-content>
  `;
  // set resultArea as empty each time
  resultArea.innerHTML = "";
  // add resultElement to resultArea
  resultArea.appendChild(resultElement);
};

calculateBtn.addEventListener("click", calculateBmi);
resetBtn.addEventListener("click", resetInputs);
