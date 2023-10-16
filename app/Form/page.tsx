'use client'
import { FormEvent, FormEventHandler, useState } from 'react'
import React from 'react'
export default function Form() {
	const [details, setDetails] = useState({
		name: '',
		email: '',
		phone: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
    setDetails((prev) => {
      return { ...prev, [name]: value}
    })
	}
	console.log(details)

	return (
		<form action="">
			<h3>Name:</h3>
			<input type="text" name="name" onChange={handleChange} />
			<h3>e-mail:</h3>{' '}
			<input type="email" name="email" onChange={handleChange} />
			<h3>Phone:</h3>{' '}
			<input type="number" name="number" onChange={handleChange} />
			<button type="submit">Submit Form</button>
		</form>
	)
}
