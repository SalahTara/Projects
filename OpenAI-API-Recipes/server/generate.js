import openaiClient from './api.js'

const generate = async (recipeDescription) => {
  	const messages = [
    {
		role: "user",
		content: `
	I have the following ingredients: ${recipeDescription}.

	Please create a recipe using only these ingredients (assume I have common pantry items like oil, sugar, salt, baking powder, and spices).

	Return the result with the following sections:

	1. Title (Don't include the word title just have the title itself)
	2. Estimated Prep Time and Cook Time  
	3. Ingredients List  
	4. Step-by-Step Instructions

	Make sure the instructions are complete and easy to follow.
		`
	}
];
	const response = await openaiClient.chat.completions.create({
		model: "gpt-4o-mini-2024-07-18", 
		messages: messages,
		max_tokens: 1500,
		temperature: 0.7,

	});
	return response.choices[0].message.content
}

export default generate;