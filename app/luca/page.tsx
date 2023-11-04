'use client'
import React, { useState } from 'react'
import ApiResponse from '../libs/PapiResponse'

export default function Luca() {
	const [formValues, setFormValues] = useState({
		model: '',
		temperature: null as number | null,
		max_tokens: null as number | null,
		message_content: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]:
				value === ''
					? null
					: name === 'temperature' || name === 'max_tokens'
					? Number(value)
					: value,
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const res = await ApiResponse(formValues)
		console.log(res)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Model:
					<input
						type="text"
						name="model"
						value={formValues.model}
						onChange={handleInputChange}
					/>
				</label>
				<br />
				<label>
					Temperature:
					<input
						type="number"
						name="temperature"
						value={
							formValues.temperature === null ? '' : formValues.temperature
						}
						onChange={handleInputChange}
					/>
				</label>
				<br />
				<label>
					Max Tokens:
					<input
						type="number"
						name="max_tokens"
						value={formValues.max_tokens === null ? '' : formValues.max_tokens}
						onChange={handleInputChange}
					/>
				</label>
				<br />
				<label>
					Message Content:
					<input
						type="text"
						name="message_content"
						value={formValues.message_content}
						onChange={handleInputChange}
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
