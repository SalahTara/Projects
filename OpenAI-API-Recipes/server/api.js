import OpenAI  from "openai";
import dotenv from "dotenv";

dotenv.config()

const openaiApiKey = process.env.OpenAI_API_KEY


if (!openaiApiKey) {
	console.error("OPENِAI_API_KEY is not set")
	process.exit(1)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export default openai