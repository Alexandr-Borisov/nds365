const slider = document.getElementById('myRange');

const output = document.getElementById('demo');
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
  console.log(output);
};


const sliderForm = document.forms.slider;

// sliderForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   console.log(event.target.group[]);
// });
