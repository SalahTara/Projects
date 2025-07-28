import styles from "./styles.module.css";
import sqlServer from "./assets/sql-server.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  const postQueries = async (promptText, queryText) => {
    try {
      await axios.post("http://localhost:3005/queries", {
        prompt: promptText,
        query: queryText,
      });
    } catch (error) {
      console.error("Error posting query:", error);
    }
  };

  const getQueries = async () => {
    try {
      const response = await axios.get("http://localhost:3005/queries");
      console.log(response);
      setListOfPosts(response.data.listOfPosts);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };
  useEffect(() => {
    getQueries();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const sqlQuery = await generateQuery();
    setSqlQuery(sqlQuery);
    console.log("Returned From Server: ", sqlQuery);

    await postQueries(userPrompt, sqlQuery);
    await getQueries();
  };

  const generateQuery = async () => {
    try {
      const response = await axios.post("http://localhost:3005/generate", {
        queryDescription: userPrompt,
      });

      return response.data.response.trim();
    } catch (error) {
      console.error("Error generating query:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className="leftContainer ">
        <div className="test">
          {listOfPosts.map((value, key) => {
            return (
              <div className="queryContainer">
                <div>{value.prompt}</div>
                <div>{value.query}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="centerContainer">
        <img src={sqlServer} className={styles.icon} alt="SQL server" />
        <h3>Generate SQL</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="query-description"
            placeholder="Describe your query"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            required
          />
          <input type="submit" value="Generate query" />
        </form>
        <pre>{sqlQuery}</pre>
      </div>
      <div className="rightContainer"></div>
    </main>
  );
}
