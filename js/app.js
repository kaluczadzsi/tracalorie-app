class CalorieTracker {
  #calorieLimit = 2000;
  #totalCalories = 0;
  #meals = [];
  #workouts = [];

  constructor() {
    this.#displayCaloriesLimit();
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCaloriesProgress();
  }

  // Public Methods
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    this.#render();
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    this.#render();
  }

  // Private Methods
  #displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this.#totalCalories;
  }

  #displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this.#calorieLimit;
  }

  #displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    // prettier-ignore
    const consumed = this.#meals.reduce((total, meal) => total + meal.calories,0);

    caloriesConsumedEl.innerHTML = consumed;
  }

  #displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    // prettier-ignore
    const burned = this.#workouts.reduce((total, workout) => total + workout.calories,0);

    caloriesBurnedEl.innerHTML = burned;
  }

  #displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const progressEl = document.getElementById('calorie-progress');

    const remaining = this.#calorieLimit - this.#totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      // prettier-ignore
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      // prettier-ignore
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');

      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      // prettier-ignore
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      // prettier-ignore
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');

      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  #displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this.#totalCalories / this.#calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  #render() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemaining();
    this.#displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('Lunch', 350);
const lunch2 = new Meal('Lunch', 1850);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);
tracker.addMeal(lunch2);

const run = new Workout('Run', 300);
const run2 = new Workout('Run', 300);
const run3 = new Workout('Run', 300);
tracker.addWorkout(run);
tracker.addWorkout(run2);
tracker.addWorkout(run3);

console.log(tracker);
