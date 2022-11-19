import { moveLift } from "./main.js";
import {
  createElement,
  clearLocalStorage,
  floors,
  lifts,
  container,
  resetLifts,
} from "./utils.js";

// if number of floors' entry is present in localStorage then show lift simulation
if (floors) {
  // wrapper div for reset and exit button
  const btnWrapper = createElement("div", "btn__resetExit");

  // reset button - resets the lifts to Floor 1
  const resetBtn = createElement("button", "btn resetBtn");
  resetBtn.innerText = "Reset";
  resetBtn.addEventListener("click", () => {
    resetLifts();
  });
  btnWrapper.appendChild(resetBtn);

  // exit button - clears the localStorage and takes the user to entry form
  const exitBtn = createElement("button", "btn exitBtn");
  exitBtn.innerText = "Exit";
  exitBtn.addEventListener("click", () => {
    clearLocalStorage();
  });
  btnWrapper.appendChild(exitBtn);

  // append the button wrapper div to main container
  container.appendChild(btnWrapper);

  // floor container div - contains floors and lifts
  const floorContainer = createElement("div", "floor__container");

  // event delegation - attaching listener on parent instead of all lift buttons
  floorContainer.addEventListener("click", (e) => {
    if (e.target.id) {
      // buttons' id will be in this format: `direction-floorNumber`
      // eg: down-4, up-2
      // split will create an array: ["down", "4"], ["up", "2"]
      const directionFloor = e.target.id.split("-");

      // call moveLift function to move the lift to the destination
      moveLift(directionFloor[0], parseInt(directionFloor[1]));
    }
  });

  // append the floor container div to main container
  container.appendChild(floorContainer);

  // create multiple floors based on the number of floors value
  for (let i = floors; i > 0; i--) {
    // floor section div
    let floorSection = createElement("div", "floor__section");

    // floor buttons div
    const floorBtnWrapper = createElement("div", "floor__btns");

    // up button with id: `up-[floorNumber]`
    const upBtn = createElement("button", "btn btn__up", `up-${i}`);
    upBtn.innerText = "Up";
    if (i === floors) upBtn.style.visibility = "hidden";
    floorBtnWrapper.appendChild(upBtn);

    // floor label
    const p = createElement("p");
    p.innerText = `Floor ${i}`;
    floorBtnWrapper.appendChild(p);

    // down button with id: `down-[floorNumber]`
    const downBtn = createElement("button", "btn btn__down", `down-${i}`);
    downBtn.innerText = "Down";
    if (i === 1) downBtn.style.visibility = "hidden";
    floorBtnWrapper.appendChild(downBtn);

    floorSection.appendChild(floorBtnWrapper);

    // horizontal line to create separation between different floors
    const hr = createElement("hr");
    floorSection.appendChild(hr);

    floorContainer.appendChild(floorSection);
  }

  // add lifts to the floor container if number of lifts exist in localStorage
  if (lifts) {
    // lifts container div
    const liftsContainer = createElement("div", "lifts__container");

    // create multiple lifts based on the number of lifts value
    for (let i = 1; i <= lifts; i++) {
      // lift div with id: `lift[floorNumber]
      const lift = createElement("div", "lift", `lift${i}`);
      lift.style.marginTop = `${(floors - 1) * 100}px`;

      // door div with id: `door[floorNumber]
      const door = createElement("div", "door", `door${i}`);

      // append door to lift
      lift.appendChild(door);

      // append lift to lift container
      liftsContainer.appendChild(lift);
    }

    // scroll to bottom on page load
    // done with setTimeout to scroll after the call stack is empty
    floorContainer.appendChild(liftsContainer);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }
}
