import React from 'react'
import { FormEvent } from 'react'
import { Stock } from '../interfaces'

type Props = {
  item: Stock
  update: boolean
}

const StockForm = ({ item, update }: Props) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = {
      name: form.name.value as string,
      base_ticket: form.base_ticket.value as string,
    }
    const url = update ? `http://localhost:5000/stock/${item.id}` : 'http://localhost:5000/stock'
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: update ? 'PATCH' : 'POST',
    })
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" defaultValue={item.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="mb-6">
        <label htmlFor="base_ticket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Base</label>
        <input type="text" id="base_ticket" defaultValue={item.ticket} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{update ? 'Change' : 'Submit' }</button>
    </form>
  )
}
export default StockForm