import styles from "./index.module.css";
import CookingLogo from "./assets/cooking.png";

import { useState } from "react";

function App() {
  const [recipeDescription, setRecipeDescription] = useState("");

  const [recipeQuery, setRecipeQuery] = useState("");

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeDescription: recipeDescription }),
    });
    const data = await response.json();
    return data.response.trim();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const generatedRecipe = await generateQuery();
    setRecipeQuery(generatedRecipe);
  };
  const cleanMarkdown = (text) => {
    return text
      .replace(/^#+\s?/gm, "") // Remove Markdown headings like #, ##, etc.
      .replace(/\*\*(.*?)\*\*/g, "$1"); // Remove bold **text**
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
      <p>{cleanMarkdown(recipeQuery)}</p>
      {/* <div className={styles.queryWrapper}>
        <form className={styles.queryHistory}>test</form>
      </div> */}
    </main>
  );
}

export default App;
