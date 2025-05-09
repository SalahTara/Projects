import styles from "./index.module.css";
import CookingLogo from "./assets/cooking.png";

import { useState } from "react";

function App() {
  const [recipeDescription, setRecipeDescription] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", recipeDescription);
  };
  return (
    <main className={styles.main}>
      <img src={CookingLogo} alt="" className={styles.icon} />
      <h3>Generate A Recipe With whatever's in your fridge</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-descrption"
          placeholder="Describe What's inside your fridge"
          onChange={(e) => setRecipeDescription(e.target.value)}
        ></input>
        <input type="submit" value="Generate Recipe" />
      </form>
    </main>
  );
}

export default App;
