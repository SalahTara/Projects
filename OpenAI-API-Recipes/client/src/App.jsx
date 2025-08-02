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
    <main className="flex min-h-screen bg-gray-50">
      {/* Left Container - Query History */}
      <div className="w-1/4 p-6 bg-white border-r border-gray-200 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Query History
        </h2>
        <div className="space-y-4">
          {listOfPosts.map((value, key) => (
            <div
              key={key}
              className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-sm font-medium text-gray-700 mb-2">
                {value.prompt}
              </p>
              <pre className="text-xs bg-gray-100 p-2 rounded font-mono overflow-x-auto">
                {value.query}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Center Container - Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <img src={sqlServer} className="w-24 h-24 mb-6" alt="SQL server" />
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Generate SQL Queries
        </h1>

        <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label
              htmlFor="query-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Describe your query
            </label>
            <input
              type="text"
              id="query-description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Get all customers from New York"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Generate Query
          </button>
        </form>

        {sqlQuery && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Generated SQL
            </h2>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {sqlQuery}
            </pre>
          </div>
        )}
      </div>

      {/* Right Container - Empty for now */}
      <div className="w-1/4 p-6 bg-white border-l border-gray-200">
        {/* Additional content can go here */}
      </div>
    </main>
  );
}
