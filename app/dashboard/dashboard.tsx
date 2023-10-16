import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

async function OpenaiFunction() {
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

export default async function Dashboard() {
	const response = await OpenaiFunction() // raw response object
	const responseMessage = response.choices[0].message
	const responseUsage = response.usage
	const isGPT = responseMessage.role !== 'user'

	return (
		<>
			<div key={responseMessage.id} className="text-center">
				<p className="flex items-center">
					{isGPT ? '🤖' : '👨'}
					<span
						className={`pl-2 md:pl-4 ${
							isGPT ? ' text-purple-800' : 'text-white'
						}`}
					>
						{responseMessage.content}
					</span>
				</p>
			</div>
			<div className="text-center">
				<h1>Usage:</h1>
				<p>Prompt Tokens: {responseUsage.prompt_tokens}</p>
				<p>Completion Tokens: {responseUsage.completion_tokens}</p>
				<p>Total Tokens: {responseUsage.total_tokens}</p>
			</div>
		</>
	)
}
