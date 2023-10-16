import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function GET() {
	const response = await openai.createChatCompletion({
		messages: [{ role: 'system', content: 'My name is Eduardo' }],
		model: 'gpt-3.5-turbo',
		temperature: 0.9,
		max_tokens: 150,
	})

	const data = await response.json()

	console.log(data)
	return NextResponse.json(data)
}
