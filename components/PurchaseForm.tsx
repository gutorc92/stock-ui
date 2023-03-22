import React, { Dispatch } from 'react'
import { FormEvent } from 'react'

type Props = {
  setShow: Dispatch<boolean>
  ticketID: number
  update: boolean
  show: boolean
}

const PurchaseForm = ({ setShow, ticketID, update, show }: Props) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const data = {
      ticket: form.ticket.value as string,
      stock_id: ticketID
    }
    const url = update ? `http://localhost:5000/stock/${ticketID}/ticket` : `http://localhost:5000/stock/${ticketID}/ticket`
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
  const showHideClassName = `${show ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`
  return (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={showHideClassName}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Add Ticket
                  </h3>
                  <button onClick={() => setShow(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                  </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="ticket" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" id="ticket" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{update ? 'Change' : 'Submit' }</button>
              </form>
          </div>
      </div>
    </div>
    
  )
}
export default PurchaseForm