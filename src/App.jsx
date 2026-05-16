import { useState } from "react";

const states = [
  "Mentally done",
  "Slack still open",
  "Nothing thawed",
  "Bare minimum night",
  "Brain offline",
  "Dinner feels too loud tonight",
  "Nobody has energy",
  "Quiet comfort night",
];

const capacities = [
  "Zero. Absolutely nothing.",
  "A little. Like, barely.",
  "Some. If it's fast.",
];

const meals = {
  zero: [
    {
      title: "Frozen waffles and scrambled eggs",
      steps: [
        "Toast the waffles.",
        "Scramble two eggs.",
        "Done.",
      ],
      reassurance:
        "Breakfast for dinner is still dinner.",
      product: "Heavy-duty paper plates",
      helper: "No dishes tonight.",
    },

    {
      title: "Cereal night",
      steps: [
        "Pick a cereal.",
        "Pour milk.",
        "That counts.",
      ],
      reassurance:
        "Easy food is still food.",
      product: "Reusable cereal bowls",
      helper: "One less tiny annoyance.",
    },
  ],

  little: [
    {
      title: "Snack plate night",
      steps: [
        "Crackers.",
        "Turkey slices.",
        "Whatever fruit exists.",
      ],
      reassurance:
        "Everyone got fed. That's enough.",
      product: "Reusable divided trays",
      helper: "Makes random food feel easier.",
    },

    {
      title: "Toast and eggs",
      steps: [
        "Toast bread.",
        "Cook eggs.",
        "Sit down.",
      ],
      reassurance:
        "Warm and simple still matters.",
      product: "Nonstick pan",
      helper: "Less cleanup later.",
    },
  ],

  some: [
    {
      title:
        "Microwave rice and chicken strips",
      steps: [
        "Heat the rice.",
        "Cook chicken strips.",
        "Put it together.",
      ],
      reassurance:
        "Warm food counts tonight.",
      product: "Parchment paper sheets",
      helper: "Less cleanup later.",
    },

    {
      title: "Sheet pan quesadillas",
      steps: [
        "Fill tortillas.",
        "Bake briefly.",
        "Cut and eat.",
      ],
      reassurance:
        "That was more than enough tonight.",
      product: "Sheet pan liners",
      helper: "No scrubbing afterward.",
    },
  ],
};

export default function App() {
  const [screen, setScreen] =
    useState("landing");

  const [meal, setMeal] = useState(null);

  const getRandomMeal = (mealsArray) => {
    return mealsArray[
      Math.floor(
        Math.random() * mealsArray.length
      )
    ];
  };

  const handleCapacityClick = (capacity) => {
    let selectedMeals = [];

    if (capacity.includes("Zero")) {
      selectedMeals = meals.zero;
    }

    if (capacity.includes("little")) {
      selectedMeals = meals.little;
    }

    if (capacity.includes("Some")) {
      selectedMeals = meals.some;
    }

    const randomMeal =
      getRandomMeal(selectedMeals);

    setMeal(randomMeal);

    setScreen("meal");
  };

  const renderMealScreen = () => {
    if (!meal) return null;

    return (
      <div className="card fade">
        <p className="logo">ZAGLO MAMA</p>

        <p className="meal-tag">TONIGHT</p>

        <h2 className="meal-title">
          {meal.title}
        </h2>

        <ul className="meal-steps">
          {meal.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <p className="reassurance">
          {meal.reassurance}
        </p>

        <div className="product-box">
          <p className="product-label">
            One less thing tonight
          </p>

          <p className="product-name">
            {meal.product}
          </p>

          <p className="product-helper">
            {meal.helper}
          </p>
        </div>

        <button
          className="reset-btn"
          onClick={() =>
            setScreen("states")
          }
        >
          Tonight feels different
        </button>
      </div>
    );
  };

  return (
    <div className="app">
      {screen === "landing" && (
        <div className="card fade">
          <p className="logo">ZAGLO MAMA</p>

          <h1>
            Dinner doesn't have to be a whole
            thing.
          </h1>

          <p className="sub">
            Something realistic for tonight.
          </p>

          <button
            className="main-btn"
            onClick={() =>
              setScreen("states")
            }
          >
            Dinner feels heavy tonight
          </button>
        </div>
      )}

      {screen === "states" && (
        <div className="states-wrap fade">
          <p className="logo">ZAGLO MAMA</p>

          <h2>
            What kind of night is it?
          </h2>

          <p className="sub small">
            Pick the one that's closest.
          </p>

          <div className="states">
            {states.map((state) => (
              <button
                key={state}
                className="state-btn"
                onClick={() =>
                  setScreen("capacity")
                }
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "capacity" && (
        <div className="states-wrap fade">
          <p className="logo">ZAGLO MAMA</p>

          <h2>
            How much do you have tonight?
          </h2>

          <p className="sub small">
            Honestly.
          </p>

          <div className="states">
            {capacities.map((capacity) => (
              <button
                key={capacity}
                className="state-btn"
                onClick={() =>
                  handleCapacityClick(
                    capacity
                  )
                }
              >
                {capacity}
              </button>
            ))}
          </div>
        </div>
      )}

      {screen === "meal" &&
        renderMealScreen()}
    </div>
  );
}