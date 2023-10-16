import { Configuration, OpenAIApi } from 'openai-edge'

// Configure OpenAI Auth
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// Fetch OpenAI API and get completion
export default async function ApiResponse() {
	const response = await openai.createChatCompletion({
		messages: [{ role: 'system', content: 'My name is Luca' }],
		model: 'gpt-3.5-turbo',
		temperature: 0.9,
		max_tokens: 150,
	})

	const data = await response.json()

	console.log(data)
	// return data.choices[0].message
	return data
}
