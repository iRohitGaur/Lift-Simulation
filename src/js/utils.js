export const floors = localStorage.getItem("floors");
export const lifts = localStorage.getItem("lifts");
export const container = document.getElementById("container");

export class Lift {
  constructor(lift, from, to, state) {
    this.lift = lift;
    this.from = from;
    this.to = to;
    this.state = state;
  }
}

export const state = {
  up: "up",
  down: "down",
  idle: "idle",
};

export const createElement = (type, className, id) => {
  const el = document.createElement(type);
  if (className) el.setAttribute("class", className);
  if (id) el.setAttribute("id", id);
  return el;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("floors");
  localStorage.removeItem("lifts");
  location.reload();
};

export const resetLifts = () => {
  location.reload();
};
