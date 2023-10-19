'use client'
import { useRouter } from 'next/navigation'
import { Configuration, OpenAIApi } from 'openai-edge'
import { ChangeEvent, FormEvent, useState } from 'react'
import React from 'react'

// Configure OpenAI Auth
const config = new Configuration({
	apiKey: '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',
})
const openai = new OpenAIApi(config)

export default function CreateForm() {
	const router = useRouter()

	const [model, setModel] = useState('')
	const [temperature, setTemperature] = useState(1)
	const [max_tokens, setMax_tokens] = useState(100)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		const response = await openai.createChatCompletion({
			messages: [{ role: 'system', content: 'My name is Luca' }],
			model: model,
			temperature: temperature,
			max_tokens: max_tokens,
		})

		const data = await response.json()
		console.log(data)
		console.log(temperature)

		if (response.status === 200) {
			router.refresh()
			router.push('/')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-1/2">
			<label>
				<span>Model:</span>
				<input
					required
					type="text"
					onChange={(e) => setModel(e.target.value)}
					value={model}
				/>
			</label>
			<label>
				<span>Temperature:</span>
				<input
					required
					type='number'
					onChange={(e) => setTemperature(e.target.value)}
					value={temperature}
				/>
			</label>
			<label>
				<span>Max Tokens:</span>
				<input
					required
					onChange={(e) => setMax_tokens(e.target.valueAsNumber)}
					value={max_tokens}
				/>
			</label>
			<button className="btn-primary" disabled={isLoading}>
				{isLoading && <span>Adding...</span>}
				{!isLoading && <span>Add Model</span>}
			</button>
		</form>
	)
}
