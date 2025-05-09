import {OpenAIApi, Configuraiton} from "openai";
import dotenv from "dotenv";

dotenv.config()

const openaiApiKey = process.env.OpenAI_API_KEY


if (!openaiApiKey) {
	console.error("OPENِAI_API_KEY is not set")
	process.exit(1)
}

const configuraiton = new Configuraiton({
	apiKey: openaiApiKey

})
const openai = new OpenAIApi(configuraiton)

export default openai