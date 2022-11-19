import { createElement, floors, container } from "./utils.js";

// if number of floors' entry is not present in localStorage then show entry form
// otherwise it will follow the logic in `floors.js`
if (!floors) {
  // wrapper div
  const entryInputDiv = createElement("div", "input__floorAndLifts");

  // number of floors input field
  const floorsInput = createElement("input");
  floorsInput.type = "number";
  floorsInput.placeholder = "number of floors";

  // number of floors label
  const floorsLabel = createElement("p");
  floorsLabel.innerText = "Enter between 1 - 10 floors";

  // number of lifts input field
  const liftsInput = createElement("input");
  liftsInput.type = "number";
  liftsInput.placeholder = "number of lifts";

  // number of lifts label
  const liftsLabel = createElement("p");
  liftsLabel.innerText = "Enter between 1 - 4 lifts";

  // submit button
  const entrySubmitBtn = createElement("button", "btn", "entrySubmit");
  entrySubmitBtn.innerText = "Submit";

  // append all elements to the wrapper div
  entryInputDiv.appendChild(floorsInput);
  entryInputDiv.appendChild(floorsLabel);
  entryInputDiv.appendChild(liftsInput);
  entryInputDiv.appendChild(liftsLabel);
  entryInputDiv.appendChild(entrySubmitBtn);

  // append the wrapper div to main container
  container.appendChild(entryInputDiv);

  // on submit, add number of floors & lifts in localStorage and reload
  entrySubmitBtn.addEventListener("click", () => {
    const noOfFloors = parseInt(floorsInput.value);
    const noOfLifts = parseInt(liftsInput.value);

    // validate if the entered value is a number and in the specified range
    if (isNaN(noOfFloors) || isNaN(noOfLifts)) {
      alert("Please enter a number as input");
      return;
    }
    if (noOfFloors < 1 || noOfFloors > 10) {
      alert("Floors should be in the range of 1 - 10");
      return;
    }
    if (noOfLifts < 1 || noOfLifts > 4) {
      alert("Lifts should be in the range of 1 - 4");
      return;
    }

    // set the value in localStorage
    localStorage.setItem("floors", noOfFloors);
    localStorage.setItem("lifts", noOfLifts);

    // clear the input fields
    floorsInput.value = "";
    liftsInput.value = "";

    // reload
    location.reload();
  });
}
