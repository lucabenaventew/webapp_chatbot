import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

type Chatbot = {
	model: string
	message_content: string
	temperature: number | null
	max_tokens: number | null
}

export default async function ApiResponse(chatbot: Chatbot) {
	const { model, message_content, temperature, max_tokens } = chatbot

	const response = await openai.createChatCompletion({
		messages: [{ role: 'system', content: message_content }],
		model: model,
		temperature: temperature ?? 0.9,
		max_tokens: max_tokens ?? 150,
	})

	const data = await response.json()

	return data
}
