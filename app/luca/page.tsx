import React from 'react'
import ApiResponse from '../libs/PapiResponse'

export default async function Luca() {
  const res = await ApiResponse()
  return (
    <div>{JSON.stringify(res)}</div>
  )
}
