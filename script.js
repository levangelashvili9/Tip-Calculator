const billInput = document.getElementById("bill-input");
const cells = document.querySelectorAll(".cell");
const customInput = document.getElementById("custom");
const peopleInput = document.getElementById("people-input");
const tip = document.getElementById("tip-value");
const totalValue = document.getElementById("total-value");
const reset = document.querySelector(`.reset-button`);

// DEFAULT VALUES
let billValue = 0.0;
let tipValue = 1; // no tip, because x divided by 1 is still x.
let peopleValue = 1;

/* 1) MAKE CLICKED ELEMENT AN ACTIVE, WHILE REMOVE ACTIVE CLASS
FROM SIBLING ELEMENT
   2) CHANGE TIP VALUE
*/
cells.forEach((element) => {
  element.addEventListener("click", function () {
    cells.forEach((el) => el.classList.remove("active-cell")); // remove active cell from sibling
    this.classList.add("active-cell"); // this = element

    tipValue = parseFloat(this.innerHTML) / 100; // change tip value of element when clicked
    calculateTip();

    //clear custom if its typed
    customInput.value = "";
  });
});

// FUNCTIONS
const changeBillValue = () => {
  billValue = parseFloat(billInput.value);
  calculateTip();
};

const changeCustomValue = () => {
  tipValue = parseFloat(customInput.value / 100);

  if (customInput.value !== "") {
    // check if it has value
    calculateTip();
  }

  // remove active-cell from element, when custom is typed
  cells.forEach((el) => {
    el.classList.remove("active-cell");
  });
};

const changePeopleValue = () => {
  if (peopleInput.value >= 1) {
    peopleValue = parseFloat(peopleInput.value);
  } else {
    // if 0 is typed
    document.querySelector(".error-msg").classList.add("error-msg-displayed");
    setTimeout(() => {
      document
        .querySelector(".error-msg")
        .classList.remove("error-msg-displayed");
    }, 2000);
  }

  calculateTip();
};

// CALLING

billInput.addEventListener("input", changeBillValue);
customInput.addEventListener("input", changeCustomValue);
peopleInput.addEventListener("input", changePeopleValue);

// CALCULATE

const calculateTip = () => {
  if (peopleValue >= 1) {
    let sum = (billValue * tipValue) / peopleValue;
    let total = (billValue * tipValue + billValue) / peopleValue;
    tip.innerHTML = `$${sum.toFixed(2)}`;
    totalValue.innerHTML = `$${total.toFixed(2)}`;

    reset.classList.add("active-reset-btn");
  }
};

// RESET
reset.addEventListener("click", function () {
  // remove bill input
  billInput.value = "";
  billValue = 0;

  // remove tip inputs (cells and custom)
  tipValue = 1;
  customInput.value = "";
  cells.forEach((el) => {
    el.classList.remove("active-cell");
  });

  // remove people value
  peopleInput.value = "";
  peopleValue = 1;

  // remove results
  tip.innerHTML = 0.0;
  totalValue.innerHTML = 0.0;

  // remove button color (i.e no more active)
  reset.classList.remove("active-reset-btn");
});
