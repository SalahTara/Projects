import "../index.css";
import sqlServer from "../assets/sql-server.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { Copy } from "lucide-react";

export default function Home() {
  const token = localStorage.getItem("accessToken");
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [listOfQueries, setListOfQueries] = useState([]);
  const [isCopying, setIsCopying] = useState(false);

  const getQueries = async () => {
    try {
      const response = await axios.get("http://localhost:3005/queries", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setListOfQueries(response.data.listOfQueries);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const postQueries = async (promptText, queryText) => {
    try {
      await axios.post(
        "http://localhost:3005/queries",
        {
          prompt: promptText,
          query: queryText,
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
    } catch (error) {
      console.error("Error posting query:", error);
    }
  };

  const deleteQueries = async (id) => {
    await axios
      .delete(`http://localhost:3005/queries/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then(() => {
        setListOfQueries(
          listOfQueries.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const sqlQuery = await generateQuery();
    setSqlQuery(sqlQuery);
    console.log("Returned From Server: ", sqlQuery);

    await postQueries(userPrompt, sqlQuery);
    await getQueries();
  };

  const copyToClipboard = async () => {
    const textElement = document.getElementById("textToCopy");
    const textToCopy = textElement.textContent; // Or .value if it's an input/textarea

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
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
    <main className="flex flex-col min-h-screen bg-blue-100 bg-[url('../images/Login-BG.png')] bg-center">
      {/* MAIN CONTENT CONTAINER - Now uses flex-col for vertical layout */}
      <div className="flex flex-1">
        {/* Left Container - Query History */}
        <div className="h-[calc(100vh-4rem)] w-1/4 p-6 border-r border-gray-200 overflow-y-auto ">
          {/* Changed h-screen to h-[calc(100vh-4rem)] to account for navbar height */}
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {token ? "Query History" : "Sign In to get Query History"}
          </h2>
          {}
          <div className="space-y-4">
            {listOfQueries.map((query, key) => (
              <div
                key={key}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              >
                <div
                  htmlFor="prompt-delete-container "
                  className="flex justify-between items-center mb-2"
                >
                  <p className="font-sans text-sm font-medium text-gray-700 mb-2">
                    {query.prompt}
                  </p>
                  <button
                    className="hover:text-red-400"
                    onClick={() => {
                      deleteQueries(query.id);
                    }}
                  >
                    <Delete />
                  </button>
                </div>
                <pre className="font-sans text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {query.query}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Center Container - Main Content */}
        <div className="flex-1 flex flex-col items-center justify-start p-50">
          {/* Changed justify-center to justify-start to prevent vertical centering */}
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
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <div className="generatedQueryContainer flex flex-row justify-between items-center bg-white border-black rounded-lg">
                <pre
                  id="textToCopy"
                  className=" text-black p-4 rounded-md overflow-x-auto text-sm"
                >
                  {sqlQuery}
                </pre>
                {isCopying ? (
                  <div className="mr-5">✓ Copied</div>
                ) : (
                  <Copy
                    onClick={copyToClipboard}
                    className="hover:cursor-pointer mr-5 hover:scale hover:scale-110 active:scale-100"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
