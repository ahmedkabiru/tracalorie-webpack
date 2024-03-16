import Storage  from "./Storage";

class CalorieTracker {
    constructor() {
      this._calorieLimit = Storage.getCalorieLimit();
      this._totalCalories = Storage.getTotalCalories();
      this._meals = Storage.getMeals();
      this._workout = Storage.getWorkouts();
  
      this._displayCaloriesLimit();
      this._displayCaloriesTotal();
      this._displayCaloriesConsumed();
      this._displayCaloriesBurned();
      this._displayCaloriesRemaining();
      this._displayCaloriesProgress();
  
      document.getElementById("limit").value = this._calorieLimit;
    }
  
    // Public Methods
    addMeal(meal) {
      this._meals.push(meal);
      this._totalCalories += meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveMeal(meal);
      this._displayNewMeal(meal);
      this._render();
    }
  
    addWorkOut(workout) {
      this._workout.push(workout);
      this._totalCalories -= workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      Storage.saveWorkout(workout);
      this._displayNewWorkOut(workout);
      this._render();
    }
  
    removeMeal(id) {
      const index = this._meals.findIndex((meal) => {
        return meal.id === id;
      });
      if (index !== -1) {
        const meal = this._meals[index];
        this._totalCalories -= meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._meals.splice(index, 1);
        Storage.removeMeal(id);
        this._render();
      }
    }
  
    removeWorkOut(id) {
      const index = this._workout.findIndex((workout) => {
        return workout.id === id;
      });
      if (index !== -1) {
        const workout = this._workout[index];
        this._totalCalories += workout.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._workout.splice(index, 1);
        Storage.removeWorkOut(id);
        this._render();
      }
    }
  
    reset() {
      this._totalCalories = 0;
      this._meals = [];
      this._workout = [];
      this._render();
    }
  
    setLimit(caloriesLimit) {
      this._calorieLimit = caloriesLimit;
      Storage.setCalorieLimit(caloriesLimit);
      this._displayCaloriesLimit();
      this._render();
    }
  
    loadItems() {
      this._meals.forEach((meal) => this._displayNewMeal(meal));
      this._workout.forEach((workout) => this._displayNewWorkOut(workout));
    }
    // Private Methods
    _displayCaloriesTotal() {
      const totalCaloriesElement = document.getElementById("calories-total");
      totalCaloriesElement.innerHTML = this._totalCalories;
    }
  
    _displayCaloriesLimit() {
      const caloriesLimitElement = document.getElementById("calories-limit");
      caloriesLimitElement.innerHTML = this._calorieLimit;
    }
    _displayCaloriesConsumed() {
      const caloriesConsumedElement =
        document.getElementById("calories-consumed");
      const consumed = this._meals.reduce(
        (total, meal) => total + meal.calories,
        0,
      );
      caloriesConsumedElement.innerHTML = consumed;
    }
  
    _displayCaloriesBurned() {
      const caloriesBurnedElement = document.getElementById("calories-burned");
      const burned = this._workout.reduce(
        (total, workout) => total + workout.calories,
        0,
      );
      caloriesBurnedElement.innerHTML = burned;
    }
  
    _displayCaloriesRemaining() {
      const caloriesReminaingElement =
        document.getElementById("calories-remaining");
      const progressElement = document.getElementById("calorie-progress");
      const remaining = this._calorieLimit - this._totalCalories;
      caloriesReminaingElement.innerHTML = remaining;
      if (remaining <= 0) {
        caloriesReminaingElement.parentElement.parentElement.classList.remove(
          "bg-light",
        );
        caloriesReminaingElement.parentElement.parentElement.classList.add(
          "bg-danger",
        );
        progressElement.classList.remove("bg-success");
        progressElement.classList.add("bg-danger");
      } else {
        caloriesReminaingElement.parentElement.parentElement.classList.add(
          "bg-light",
        );
        caloriesReminaingElement.parentElement.parentElement.classList.remove(
          "bg-danger",
        );
        progressElement.classList.add("bg-success");
        progressElement.classList.remove("bg-danger");
      }
    }
  
    _displayCaloriesProgress() {
      const progressElement = document.getElementById("calorie-progress");
      const percentage = (this._totalCalories / this._calorieLimit) * 100;
      const width = Math.min(percentage, 100);
      progressElement.style.width = `${width}%`;
    }
  
    _displayNewMeal(meal) {
      const mealsElement = document.getElementById("meal-items");
      const mealEl = document.createElement("div");
      mealEl.classList.add("card", "my-2");
      mealEl.setAttribute("data-id", meal.id);
      mealEl.innerHTML = ` <div class="card-body">
       <div class="d-flex align-items-center justify-content-between">
         <h4 class="mx-1">${meal.name}</h4>
         <div
           class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
         >
           ${meal.calories}
         </div>
         <button class="delete btn btn-danger btn-sm mx-2">
           <i class="fa-solid fa-xmark"></i>
         </button>
       </div>
     </div>`;
  
      mealsElement.appendChild(mealEl);
    }
  
    _displayNewWorkOut(workout) {
      const workoutsElement = document.getElementById("workout-items");
      const workoutEl = document.createElement("div");
      workoutEl.classList.add("card", "my-2");
      workoutEl.setAttribute("data-id", workout.id);
      workoutEl.innerHTML = ` <div class="card-body">
       <div class="d-flex align-items-center justify-content-between">
         <h4 class="mx-1">${workout.name}</h4>
         <div
           class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
         >
           ${workout.calories}
         </div>
         <button class="delete btn btn-danger btn-sm mx-2">
           <i class="fa-solid fa-xmark"></i>
         </button>
       </div>
     </div>`;
  
      workoutsElement.appendChild(workoutEl);
    }
    _render() {
      this._displayCaloriesTotal();
      this._displayCaloriesConsumed();
      this._displayCaloriesBurned();
      this._displayCaloriesRemaining();
      this._displayCaloriesProgress();
    }
  }

  export default CalorieTracker;