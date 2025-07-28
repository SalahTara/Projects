import openaiClient from "./api.js";

const generate = async (queryDescription) => {
  const response = await openaiClient.chat.completions.create({
    model: "gpt-4o-mini", // or "gpt-4"
    messages: [
      {
        role: "system",
        content: "You are an assistant that only outputs SQL queries. Do not include explanations, comments, or formatting — just the SQL.",
      },
      {
        role: "user",
        content: `Generate a SQL query for: ${queryDescription}`,
      },
    ],
  });

  return response.choices[0].message.content.trim(); 
};

export default generate;
