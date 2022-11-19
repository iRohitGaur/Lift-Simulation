import { floors, lifts as NoOfLifts, Lift, state } from "./utils.js";

export const lifts = [];
export const queue = [];

// lift reached, set to as from and mark it idle
const liftReached = (lift) => {
  // lift.to will be null in case when the lift is
  lift.from = lift.to !== null ? lift.to : lift.from;
  lift.to = null;
  lift.state = state.idle;
  return lift;
};

// returns the index of available lift in lifts[]
const getAvailableLiftIndex = (direction, to) => {
  for (let i = 0; i < lifts.length; i++) {
    // check if a lift is already on the destination or going to the destination
    const filteredLift = lifts.filter((l) => l.to === to);
    // if yes then do not return any available lift and return -1
    if (filteredLift.length !== 0) {
      return -1;
    }

    // as the array is sorted in ascending order of nearest lift to destination
    // if the lift state shows `idle` then return its index
    if (lifts[i].state === state.idle) {
      return i;
      break;
    }
  }
  // return `-1` if no lift is available
  return -1;
};

// get all the lifts from DOM and push them in "lifts" array
// timeout is set to 0 so that that the DOM is set first and we don't run into null
setTimeout(() => {
  for (let i = 1; i <= NoOfLifts; i++) {
    const l = new Lift(
      document.getElementById(`lift${i}`),
      1,
      null,
      state.idle
    );
    lifts.push(l);
  }
}, 0);

export const moveLift = (direction, to, fromQueue) => {
  // sort the lifts in ascending order for nearest position of "to"
  lifts.sort((a, b) => Math.abs(a.from - to) - Math.abs(b.from - to));

  // get the idle lift index
  const index = getAvailableLiftIndex(direction, to);

  // index will be -1 in case no lift is available, in which case we will queue the call
  if (index >= 0) {
    // set the "state" as the direction and "to" as the floor number
    const availableLift = lifts[index];
    availableLift.to = to;
    availableLift.state = direction === "up" ? state.up : state.down;

    // calculate the difference to perform time calculations
    // lift takes 2s/floor
    // door open and close take 2.5 each
    const difference = Math.abs(availableLift.from - to);

    // total ms => ((difference * 2) + 5) * 1000
    // set timeout to the total time needed for lift to reach the floor and perform door open & close
    setTimeout(() => {
      const index = lifts.findIndex((l) => l.lift.id === availableLift.lift.id);
      lifts[index] = liftReached(lifts[index]);

      // Lift idle - call from queue if there is any waiting floor
      if (queue.length !== 0) {
        // remove the first waiting floor from the queue and make the call
        const queuedCall = queue.splice(0, 1)[0];
        moveLift(queuedCall.direction, queuedCall.to, true);
      }
    }, (difference * 2 + 5) * 1000);

    // set timeout for lift open & close animation
    setTimeout(() => {
      availableLift.lift.children[0].style.transform = "translateX(-50px)";

      setTimeout(() => {
        availableLift.lift.children[0].style.transform = "translateX(0)";
      }, 2500);
    }, difference * 2 * 1000);

    // move the lift using transition on margin-top
    lifts[index].lift.style.transition = `margin-top ${difference * 2}s ease`;
    lifts[index].lift.style.marginTop = `${(floors - to) * 100}px`;
  } else {
    // No lift idle. Add to queue if it is already not in the queue
    const filteredQueue = queue.filter((q) => q.to === to);
    if (filteredQueue.length === 0) {
      queue.push({ direction, to });
    }
  }
};
